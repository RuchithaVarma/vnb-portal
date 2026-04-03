import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_SECRET) {
  console.error(
    "Razorpay key secret is not configured in environment variables",
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment parameters", verified: false },
        { status: 400 },
      );
    }

    if (!RAZORPAY_KEY_SECRET) {
      console.error(
        "Razorpay key secret is not configured in environment variables",
      );
      return NextResponse.json(
        {
          verified: false,
          error: "Payment verification service not configured",
        },
        { status: 500 },
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    if (isValid) {
      return NextResponse.json({
        verified: true,
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      });
    } else {
      console.error("Payment signature verification failed");
      return NextResponse.json(
        { verified: false, error: "Invalid payment signature" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      {
        verified: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
