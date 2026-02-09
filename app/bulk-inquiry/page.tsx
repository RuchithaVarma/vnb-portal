"use client";

import { useState } from "react";
import { Building2, Mail, Phone, Package, MessageCircle } from "lucide-react";

export default function BulkInquiryPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct WhatsApp message
    const whatsappMessage =
      `🌱 *Bulk Order Inquiry* 🌱%0A%0A` +
      `*Company Name:* ${formData.companyName}%0A` +
      `*Contact Person:* ${formData.contactPerson}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Product Interest:* ${formData.product}%0A` +
      `*Estimated Quantity:* ${formData.quantity}%0A` +
      `*Additional Details:* ${formData.message || "N/A"}%0A%0A` +
      `*Sent from:* Blooms Energy Website`;

    // WhatsApp number (replace with your business WhatsApp number)
    const whatsappNumber = "919876543210"; // Replace with your actual WhatsApp number

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");

    // Reset form
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      product: "",
      quantity: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Bulk Orders & Wholesale</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Special pricing for businesses, retailers, and large volume orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-soft p-6">
              <Package className="w-10 h-10 text-forest mb-3" />
              <h3 className="font-semibold text-lg text-forest mb-2">
                Volume Discounts
              </h3>
              <p className="text-sm text-gray-600">
                Competitive pricing for bulk purchases and wholesale orders
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-soft p-6">
              <Building2 className="w-10 h-10 text-forest mb-3" />
              <h3 className="font-semibold text-lg text-forest mb-2">
                Business Solutions
              </h3>
              <p className="text-sm text-gray-600">
                Custom packaging and white-label options available
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-soft p-6">
              <Phone className="w-10 h-10 text-forest mb-3" />
              <h3 className="font-semibold text-lg text-forest mb-2">
                Dedicated Support
              </h3>
              <p className="text-sm text-gray-600">
                Personal account manager for all your bulk order needs
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-card p-8">
              <h2 className="font-sans text-2xl font-bold text-forest mb-6">
                Request a Quote
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Interest *
                    </label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
                    >
                      <option value="">Select Category</option>
                      <option value="fruit">Fruit Powders</option>
                      <option value="vegetable">Vegetable Powders</option>
                      <option value="leafy">Leafy Vegetable Powders</option>
                      <option value="mixed">Mixed Selection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Quantity *
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 50kg per month"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
