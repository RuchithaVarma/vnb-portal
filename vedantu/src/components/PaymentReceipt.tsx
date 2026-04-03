"use client";

import { useState } from "react";
import {
  Download,
  Printer,
  Mail,
  Share2,
  CheckCircle,
  Calendar,
  User,
  Phone,
  FileText,
  DollarSign,
  Building,
  Receipt,
} from "lucide-react";

interface PaymentReceiptProps {
  payment: {
    id: string;
    razorpayPaymentId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    courseName: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: any;
    transactionId?: string;
  };
  onClose?: () => void;
}

export default function PaymentReceipt({ payment, onClose }: PaymentReceiptProps) {
  const [sendingEmail, setSendingEmail] = useState(false);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownload = () => {
    window.print();
  };

  const handleEmailReceipt = async () => {
    setSendingEmail(true);
    try {
      // TODO: Implement email functionality
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Receipt sent to " + payment.userEmail);
    } catch (error) {
      alert("Failed to send receipt. Please try again.");
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Receipt</h1>
              <p className="text-gray-500">Official receipt for your payment</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
              payment.status === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              <CheckCircle className="w-4 h-4" />
              {payment.status === 'success' ? 'Paid' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Company and Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Building className="w-5 h-5" />
            Brilliant Roots Academy
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>123 Education Street, Hyderabad</p>
            <p>Telangana, India - 500001</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: info@brilliantroots.com</p>
            <p>GSTIN: 36AAHCB1234C1ZV</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Receipt Details
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Receipt Number:</span>
              <span className="font-medium">BR-{payment.id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-medium font-mono">{payment.razorpayPaymentId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{formatDate(payment.createdAt)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{formatTime(payment.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Billed To
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{payment.userName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{payment.userEmail}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{payment.userPhone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Payment Details
        </h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Quantity</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium">{payment.courseName}</p>
                    <p className="text-sm text-gray-500">Course Enrollment Fee</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">1</td>
                <td className="py-4 px-4 text-right font-medium">
                  ₹{payment.amount.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
            <tfoot className="bg-gray-50">
              <tr className="border-t-2 border-gray-200">
                <td colSpan={2} className="py-4 px-4 font-semibold text-gray-900">
                  Total Paid
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-900">
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Payment Method</p>
              <p className="text-sm text-blue-700">Online Payment via Razorpay</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-700">Secured by 256-bit SSL</p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-3">Terms & Conditions</h3>
        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
          <li>This receipt confirms the payment received for the course enrollment.</li>
          <li>Course access will be granted within 24 hours of successful payment.</li>
          <li>Refund policy: 7-day money-back guarantee applies from the date of enrollment.</li>
          <li>For any queries, please contact our support team at info@brilliantroots.com</li>
          <li>This is a computer-generated receipt and does not require a signature.</li>
        </ol>
      </div>

      {/* Action Buttons - Hidden in print */}
      <div className="flex flex-wrap gap-3 no-print">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        <button
          onClick={handleEmailReceipt}
          disabled={sendingEmail}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Mail className="w-4 h-4" />
          {sendingEmail ? 'Sending...' : 'Email Receipt'}
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
        <p>Thank you for choosing Brilliant Roots Academy!</p>
        <p className="mt-1">This receipt was generated on {new Date().toLocaleDateString('en-IN', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
