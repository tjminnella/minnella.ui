import React, { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import type { ShippingInfo, PaymentInfo, CustomerInfo } from '../../types/order.types';

export interface CheckoutFormData {
  customer: CustomerInfo;
  shipping: ShippingInfo;
  payment: PaymentInfo;
}

interface FormErrors {
  [key: string]: string;
}

interface CheckoutFormProps {
  initialData?: Partial<CheckoutFormData>;
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting?: boolean;
  promoCode?: string | null;
  onPromoCodeChange?: (code: string | null) => void;
}

const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit Card', icon: '💳' },
  { value: 'paypal', label: 'PayPal', icon: '🅿️' },
  { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
] as const;

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
  promoCode: externalPromoCode,
  onPromoCodeChange,
}) => {
  const { cart } = useCartStore();

  const [formData, setFormData] = useState<CheckoutFormData>({
    customer: {
      email: '',
      phone: '',
    },
    shipping: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
      phone: '',
    },
    payment: {
      method: 'card',
      last4: '',
      brand: '',
    },
    ...initialData,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(externalPromoCode || null);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'customer.email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      case 'customer.phone':
      case 'shipping.phone':
        if (value && !/^\d{10,}$/.test(value.replace(/\D/g, ''))) return 'Invalid phone number';
        return '';
      case 'shipping.firstName':
      case 'shipping.lastName':
        if (!value.trim()) return 'Required';
        return '';
      case 'shipping.address1':
        if (!value.trim()) return 'Address is required';
        return '';
      case 'shipping.city':
        if (!value.trim()) return 'City is required';
        return '';
      case 'shipping.postalCode':
        if (!value.trim()) return 'Postal code is required';
        return '';
      case 'shipping.state':
        if (!value.trim()) return 'State is required';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const customerEmailError = validateField('customer.email', formData.customer.email);
    if (customerEmailError) newErrors['customer.email'] = customerEmailError;

    const shippingFields = ['firstName', 'lastName', 'address1', 'city', 'postalCode', 'state'];
    shippingFields.forEach((field) => {
      const error = validateField(
        `shipping.${field}`,
        formData.shipping[field as keyof typeof formData.shipping] as string
      );
      if (error) newErrors[`shipping.${field}`] = error;
    });

    if (formData.payment.method === 'card') {
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section: 'customer' | 'shipping', field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    const error = validateField(`${section}.${field}`, value);
    setErrors((prev) => ({
      ...prev,
      [`${section}.${field}`]: error,
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      payment: {
        method: method as PaymentInfo['method'],
        last4: '',
        brand: '',
      },
    }));
  };

  const handleApplyPromoCode = () => {
    if (promoCode.trim()) {
      const code = promoCode.toUpperCase().trim();
      setAppliedPromo(code);
      onPromoCodeChange?.(code);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.customer.email}
              onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors['customer.email'] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors['customer.email'] && (
              <p className="mt-1 text-sm text-red-600">{errors['customer.email']}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.customer.phone}
              onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors['customer.phone'] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="(123) 456-7890"
            />
            {errors['customer.phone'] && (
              <p className="mt-1 text-sm text-red-600">{errors['customer.phone']}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.shipping.firstName}
                onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors['shipping.firstName'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John"
              />
              {errors['shipping.firstName'] && (
                <p className="mt-1 text-sm text-red-600">{errors['shipping.firstName']}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.shipping.lastName}
                onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors['shipping.lastName'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Doe"
              />
              {errors['shipping.lastName'] && (
                <p className="mt-1 text-sm text-red-600">{errors['shipping.lastName']}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1 *
            </label>
            <input
              type="text"
              id="address1"
              value={formData.shipping.address1}
              onChange={(e) => handleInputChange('shipping', 'address1', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors['shipping.address1'] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123 Main Street"
            />
            {errors['shipping.address1'] && (
              <p className="mt-1 text-sm text-red-600">{errors['shipping.address1']}</p>
            )}
          </div>

          <div>
            <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              id="address2"
              value={formData.shipping.address2}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shipping: { ...prev.shipping, address2: e.target.value },
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Apt, Suite, Unit, etc. (optional)"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="city"
                value={formData.shipping.city}
                onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors['shipping.city'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="New York"
              />
              {errors['shipping.city'] && (
                <p className="mt-1 text-sm text-red-600">{errors['shipping.city']}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                id="state"
                value={formData.shipping.state}
                onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors['shipping.state'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="NY"
              />
              {errors['shipping.state'] && (
                <p className="mt-1 text-sm text-red-600">{errors['shipping.state']}</p>
              )}
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code *
              </label>
              <input
                type="text"
                id="postalCode"
                value={formData.shipping.postalCode}
                onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors['shipping.postalCode'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10001"
              />
              {errors['shipping.postalCode'] && (
                <p className="mt-1 text-sm text-red-600">{errors['shipping.postalCode']}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="shippingPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="shippingPhone"
              value={formData.shipping.phone}
              onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors['shipping.phone'] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="(123) 456-7890"
            />
            {errors['shipping.phone'] && (
              <p className="mt-1 text-sm text-red-600">{errors['shipping.phone']}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.payment.method === method.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={formData.payment.method === method.value}
                onChange={() => handlePaymentMethodChange(method.value)}
                className="w-4 h-4 text-primary-600"
              />
              <span className="ml-3 text-2xl">{method.icon}</span>
              <span className="ml-3 text-gray-700 font-medium">{method.label}</span>
            </label>
          ))}
        </div>

        {formData.payment.method === 'card' && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">
              💳 Credit card details would be collected securely via a payment processor (Stripe,
              PayPal, etc.) in a production environment.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                  placeholder="•••• •••• •••• ••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                  placeholder="MM/YY"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {cart && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Promo Code</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter promo code"
            />
            <button
              type="button"
              onClick={handleApplyPromoCode}
              disabled={!promoCode.trim() || appliedPromo !== null}
              className="px-6 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {appliedPromo ? 'Applied' : 'Apply'}
            </button>
          </div>
          {appliedPromo && (
            <p className="mt-2 text-sm text-green-600">✓ Promo code "{appliedPromo}" applied!</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Try: WELCOME10 (10% off), SAVE20 (20% off), SUMMER25 (25% off)
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || hasErrors}
        className="w-full py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>

      {hasErrors && (
        <p className="text-sm text-red-600 text-center">
          Please fix the errors above before submitting
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
