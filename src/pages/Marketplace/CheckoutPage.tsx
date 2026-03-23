import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { useToast } from '../../components/common/Toast/Toast';
import { CheckoutForm, OrderSummary } from '../../components/checkout';
import type { CheckoutFormData } from '../../components/checkout/CheckoutForm';
import type { CreateOrderInput } from '../../types/order.types';
import type { CartItem } from '../../types/cart.types';

type CheckoutStep = 'shipping' | 'payment' | 'review';

const STEPS: { key: CheckoutStep; label: string; number: number }[] = [
  { key: 'shipping', label: 'Shipping', number: 1 },
  { key: 'payment', label: 'Payment', number: 2 },
  { key: 'review', label: 'Review', number: 3 },
];

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { cart } = useCartStore();
  const { placeOrder } = useOrderStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [formData, setFormData] = useState<Partial<CheckoutFormData>>({});
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStepIndex = STEPS.findIndex((s) => s.key === currentStep);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleFormSubmit = async (data: CheckoutFormData) => {
    if (currentStep !== 'review') {
      setFormData(data);
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < STEPS.length) {
        setCurrentStep(STEPS[nextIndex].key);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const orderInput: CreateOrderInput = {
        items: cart.items.map((item: CartItem) => ({
          productId: item.productId,
          quantity: item.quantity,
          variant: item.variant,
        })),
        customer: data.customer,
        shipping: data.shipping,
        payment: {
          method: data.payment.method,
          last4: data.payment.last4,
          brand: data.payment.brand,
        },
        shippingMethod: 'standard',
      };

      await placeOrder(orderInput, promoCode || undefined);
      navigate('/order-confirmation');
      toast.showToast({
        type: 'success',
        title: 'Order Placed!',
        message: 'Your order has been successfully placed.',
      });
    } catch (error) {
      toast.showToast({
        type: 'error',
        title: 'Order Failed',
        message: error instanceof Error ? error.message : 'Failed to place order',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1].key);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'shipping':
        return (
          <div className="space-y-6">
            <CheckoutForm
              initialData={formData}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
            />
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-6">
            <CheckoutForm
              initialData={formData}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
            />
          </div>
        );
      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                  <div className="text-gray-600 text-sm">
                    <p>{formData.customer?.email}</p>
                    {formData.customer?.phone && <p>Phone: {formData.customer.phone}</p>}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                  <address className="not-italic text-gray-600 text-sm">
                    <p>
                      {formData.shipping?.firstName} {formData.shipping?.lastName}
                    </p>
                    <p>{formData.shipping?.address1}</p>
                    {formData.shipping?.address2 && <p>{formData.shipping.address2}</p>}
                    <p>
                      {formData.shipping?.city}, {formData.shipping?.state}{' '}
                      {formData.shipping?.postalCode}
                    </p>
                    {formData.shipping?.phone && <p>Phone: {formData.shipping.phone}</p>}
                  </address>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                  <p className="text-gray-600 text-sm">
                    {formData.payment?.method === 'card' && 'Credit Card'}
                    {formData.payment?.method === 'paypal' && 'PayPal'}
                    {formData.payment?.method === 'cod' && 'Cash on Delivery'}
                    {formData.payment?.method === 'bank_transfer' && 'Bank Transfer'}
                  </p>
                </div>

                {promoCode && (
                  <div className="border-t pt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Promo Code</h3>
                    <p className="text-green-600 text-sm">✓ {promoCode} applied</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => handleFormSubmit(formData as CheckoutFormData)}
              disabled={isSubmitting}
              className="w-full py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Placing Order...' : `Pay ${formatPrice(cart.total)}`}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.key}>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index <= currentStepIndex
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentStepIndex ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`ml-2 font-medium ${
                    index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    index < currentStepIndex ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">{renderStepContent()}</div>
        <div className="lg:col-span-1">
          <OrderSummary promoCode={promoCode} />
        </div>
      </div>

      {currentStep !== 'shipping' && (
        <div className="mt-6">
          <button
            onClick={handleBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);
}

export default CheckoutPage;
