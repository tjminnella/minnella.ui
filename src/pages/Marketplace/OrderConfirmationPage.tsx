import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import { OrderConfirmation } from '../../components/checkout';

const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentOrder } = useOrderStore();

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">No Order Found</h1>
        <p className="text-gray-600 mb-8">It looks like you haven't placed an order yet.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <OrderConfirmation order={currentOrder} onPrintReceipt={handlePrintReceipt} />

      <div className="mt-8 text-center print:hidden">
        <button
          onClick={handleContinueShopping}
          className="px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
