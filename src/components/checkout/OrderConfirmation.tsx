import React from 'react';
import type { Order } from '../../types/order.types';
import { formatPrice } from '../../utils/formatPrice';

interface OrderConfirmationProps {
  order: Order;
  onPrintReceipt: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onPrintReceipt }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPaymentMethodLabel = (method: string): string => {
    switch (method) {
      case 'card':
        return 'Credit Card';
      case 'paypal':
        return 'PayPal';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return method;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="border-t border-b py-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-lg font-semibold text-gray-900">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Date</p>
              <p className="text-lg font-semibold text-gray-900">{formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
            <address className="not-italic text-gray-600 text-sm space-y-1">
              <p>
                {order.shipping.firstName} {order.shipping.lastName}
              </p>
              <p>{order.shipping.address1}</p>
              {order.shipping.address2 && <p>{order.shipping.address2}</p>}
              <p>
                {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
              </p>
              <p>{order.shipping.country}</p>
              {order.shipping.phone && <p>Phone: {order.shipping.phone}</p>}
            </address>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
            <div className="text-gray-600 text-sm space-y-1">
              <p>
                <span className="font-medium">Method:</span>{' '}
                {getPaymentMethodLabel(order.payment.method)}
              </p>
              {order.payment.brand && order.payment.last4 && (
                <p>
                  <span className="font-medium">Card:</span> {order.payment.brand} ending in{' '}
                  {order.payment.last4}
                </p>
              )}
              <p>
                <span className="font-medium">Email:</span> {order.customer.email}
              </p>
              {order.customer.phone && (
                <p>
                  <span className="font-medium">Phone:</span> {order.customer.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Product</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-700">Qty</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">Price</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-gray-500">
                            {item.variant.color && item.variant.color}
                            {item.variant.size && ` • ${item.variant.size}`}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.quantity}</td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {formatPrice(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-primary-600">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onPrintReceipt}
            className="flex-1 py-3 px-6 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Receipt
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• You'll receive an order confirmation email at {order.customer.email}</li>
          <li>• We'll send you a tracking number once your order ships</li>
          <li>• Estimated delivery: 5-7 business days</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmation;
