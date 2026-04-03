import { NextRequest, NextResponse } from "next/server";
import {
  doc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  validateWebhookSignatureEnhanced,
  sanitizePaymentMetadata,
} from "@/lib/paymentSecurity";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const timestamp = request.headers.get("x-razorpay-timestamp");

    if (!signature) {
      console.error("Webhook missing signature");
      return NextResponse.json(
        { error: "Missing signature", verified: false },
        { status: 400 },
      );
    }

    if (!RAZORPAY_WEBHOOK_SECRET) {
      console.error("Webhook secret not configured");
      return NextResponse.json(
        { error: "Webhook not configured", verified: false },
        { status: 500 },
      );
    }

    // Enhanced signature validation
    const signatureValidation = validateWebhookSignatureEnhanced(
      body,
      signature,
      RAZORPAY_WEBHOOK_SECRET,
      timestamp || undefined,
    );

    if (!signatureValidation.valid) {
      console.error(
        "Webhook signature validation failed:",
        signatureValidation.error,
      );
      return NextResponse.json(
        {
          error: signatureValidation.error || "Invalid signature",
          verified: false,
        },
        { status: 401 },
      );
    }

    const event = JSON.parse(body);

    // Log webhook event for audit
    console.log(`Webhook received: ${event.event}`, {
      eventId: event.id,
      timestamp: new Date().toISOString(),
    });

    // Process different event types
    switch (event.event) {
      case "payment.captured": {
        const payment = event.payload.payment.entity;

        // Validate payment data
        if (!payment.id || !payment.order_id || !payment.amount) {
          console.error("Invalid payment data in webhook");
          return NextResponse.json(
            { error: "Invalid payment data", verified: false },
            { status: 400 },
          );
        }

        // Find payment record by Razorpay order ID
        const paymentsQuery = query(
          collection(db, "payments"),
          where("razorpayOrderId", "==", payment.order_id),
        );
        const querySnapshot = await getDocs(paymentsQuery);

        if (querySnapshot.empty) {
          console.error(
            "Payment record not found for order:",
            payment.order_id,
          );
          return NextResponse.json(
            { error: "Payment record not found", verified: false },
            { status: 404 },
          );
        }

        const paymentDoc = querySnapshot.docs[0];

        // Sanitize metadata
        const sanitizedMetadata = sanitizePaymentMetadata(payment.notes || {});

        // Update payment record
        await updateDoc(doc(db, "payments", paymentDoc.id), {
          status: "success",
          razorpayPaymentId: payment.id,
          razorpaySignature: signature,
          amount: payment.amount / 100, // Convert from paise to rupees
          currency: payment.currency,
          method: payment.method,
          bank: payment.bank,
          wallet: payment.wallet,
          vpa: payment.vpa,
          email: payment.email,
          contact: payment.contact,
          fee: payment.fee,
          tax: payment.tax,
          updatedAt: serverTimestamp(),
          metadata: sanitizedMetadata,
        });

        console.log("Payment updated successfully:", payment.id);
        break;
      }

      case "payment.failed": {
        const payment = event.payload.payment.entity;

        // Find and update failed payment
        const paymentsQuery = query(
          collection(db, "payments"),
          where("razorpayOrderId", "==", payment.order_id),
        );
        const querySnapshot = await getDocs(paymentsQuery);

        if (!querySnapshot.empty) {
          const paymentDoc = querySnapshot.docs[0];

          await updateDoc(doc(db, "payments", paymentDoc.id), {
            status: "failed",
            razorpayPaymentId: payment.id,
            errorCode: payment.error_code,
            errorDescription: payment.error_description,
            source: payment.source,
            updatedAt: serverTimestamp(),
            metadata: {
              failureReason: payment.error_description,
              retryCount: 1,
            },
          });

          console.log("Payment marked as failed:", payment.id);
        }
        break;
      }

      case "refund.processed": {
        const refund = event.payload.refund.entity;

        // Find payment by payment ID
        const paymentsQuery = query(
          collection(db, "payments"),
          where("razorpayPaymentId", "==", refund.payment_id),
        );
        const querySnapshot = await getDocs(paymentsQuery);

        if (!querySnapshot.empty) {
          const paymentDoc = querySnapshot.docs[0];

          await updateDoc(doc(db, "payments", paymentDoc.id), {
            status: "refunded",
            refundId: refund.id,
            refundAmount: refund.amount / 100,
            refundStatus: refund.status,
            refundCreatedAt: refund.created_at,
            updatedAt: serverTimestamp(),
            metadata: {
              refundReason: refund.notes?.reason || "Customer request",
              refundProcessedAt: serverTimestamp(),
            },
          });

          console.log("Refund processed:", refund.id);
        }
        break;
      }

      case "order.paid": {
        const order = event.payload.order.entity;

        // Update all payments associated with this order
        const paymentsQuery = query(
          collection(db, "payments"),
          where("razorpayOrderId", "==", order.id),
        );
        const querySnapshot = await getDocs(paymentsQuery);

        for (const doc of querySnapshot.docs) {
          await updateDoc(doc.ref, {
            orderStatus: "paid",
            orderPaidAt: order.created_at,
            updatedAt: serverTimestamp(),
          });
        }

        console.log("Order marked as paid:", order.id);
        break;
      }

      default:
        console.log("Unhandled webhook event:", event.event);
    }

    return NextResponse.json({
      verified: true,
      message: "Webhook processed successfully",
      eventId: event.id,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error", verified: false },
      { status: 500 },
    );
  }
}
