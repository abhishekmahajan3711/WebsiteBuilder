import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { updateFeatureAccess } from '../redux/authSlice';

const FEATURE_LABELS = {
  publish_limit: 'Publish Credits',
  watermark_removal: 'Watermark Removal',
  title: 'SEO Title Changes',
  logoUrl: 'Logo Changes',
  store_images: 'Image Credits',
  export_website: 'Export Credits',
};
const EXCLUDE_FEATURES = ['template_access', 'download_code'];

const UserPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const featureAccess = useSelector(state => state.auth.featureAccess);
  const features = featureAccess?.features || {};
  const [prices, setPrices] = useState({});
  const token = localStorage.getItem('token');
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  useEffect(() => {
    if (!token) return;
    axios.get('http://localhost:5000/api/websites/feature-prices', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setPrices(res.data);
      })
      .catch(err => {
        setPrices({});
      });
  }, [token]);

  // Handle payment success/cancellation from URL params
  useEffect(() => {
    const success = searchParams.get('success');
    const failed = searchParams.get('failed');
    const cancelled = searchParams.get('cancelled');

    if (success) {
      alert('Payment completed successfully! Your credits have been added.');
      loadPaymentHistory();
    } else if (failed) {
      alert('Payment failed. Please try again.');
    } else if (cancelled) {
      alert('Payment was cancelled.');
    }
  }, [searchParams]);

  // Load payment history
  useEffect(() => {
    if (token) {
      loadPaymentHistory();
    }
  }, [token]);

  useEffect(() => {
    const q = {};
    Object.keys(features).forEach(key => {
      if (!EXCLUDE_FEATURES.includes(key)) q[key] = 0;
    });
    setQuantities(q);
  }, [features]);

  const handleQtyChange = (key, delta) => {
    setQuantities(prev => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + delta),
    }));
  };

  const totalCost = Object.entries(quantities).reduce(
    (sum, [key, qty]) => sum + (prices[key] || 0) * qty,
    0
  );

  // Load payment history
  const loadPaymentHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payments/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPaymentHistory(response.data);
    } catch (error) {
      console.error('Failed to load payment history:', error);
    }
  };



  // Handle PayU checkout
  const handlePayUCheckout = async () => {
    if (totalCost === 0) return;

    try {
      setLoading(true);
      
      // Prepare items for payment
      const items = Object.entries(quantities)
        .filter(([key, qty]) => qty > 0)
        .map(([key, qty]) => ({
          featureKey: key,
          quantity: qty,
          price: prices[key] || 0
        }));

      const response = await axios.post('http://localhost:5000/api/payments/create-order', {
        items,
        totalAmount: totalCost
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Create PayU form and submit
      const payuData = response.data.payuData;
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = process.env.NODE_ENV === 'production' 
        ? 'https://securegw.paytm.in/oltp-web/processTransaction' 
        : 'https://test.payu.in/_payment';

      // Add form fields
      Object.keys(payuData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payuData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      
    } catch (error) {
      console.error('Failed to create PayU order:', error);
      alert('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-white flex flex-col items-center">
      <div className="w-full max-w-2xl mt-10">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-t-xl p-6 shadow text-white flex items-center gap-3">
          <span className="text-3xl">🪪</span>
          <div>
            <h1 className="text-2xl font-bold mb-1">My Plan & Credits</h1>
            <div className="text-sm opacity-80">Manage your feature credits and upgrade your plan</div>
          </div>
        </div>
        <div className="bg-white rounded-b-xl shadow p-6 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-blue-500">🎫</span> Current Credits
            </h2>
            <div className="divide-y divide-gray-100">
              {Object.entries(features).map(([key, val]) =>
                !EXCLUDE_FEATURES.includes(key) ? (
                  <div key={key} className="flex items-center justify-between py-2">
                    <span className="text-gray-700 font-medium flex items-center gap-2">
                      {FEATURE_LABELS[key] || key}
                    </span>
                    <span className={val.value > 0 ? 'text-green-700 font-bold' : 'text-red-600 font-bold'}>
                      {val.value}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </div>
          <div className="my-8">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-green-600">🛒</span> Purchase More Credits
            </h2>
            {Object.keys(prices).length === 0 ? (
              <div className="flex items-center justify-center py-8 text-gray-400">
                <svg className="animate-spin h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Loading prices...
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                {Object.entries(features).map(([key, val]) =>
                  !EXCLUDE_FEATURES.includes(key) ? (
                    <div key={key} className="flex items-center mb-3">
                      <span className="text-gray-700 flex items-center gap-2 min-w-[140px]">{FEATURE_LABELS[key] || key}</span>
                      <div className="flex-1 flex items-center justify-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                          onClick={() => handleQtyChange(key, -1)}
                          disabled={quantities[key] === 0}
                        >-</button>
                        <span className="w-8 text-center font-semibold">{quantities[key]}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                          onClick={() => handleQtyChange(key, 1)}
                        >+</button>
                      </div>
                      <span className="text-gray-600 text-sm ml-2 min-w-[120px] text-right">₹{prices[key] || 0} x {quantities[key]} = <span className="font-semibold">₹{(prices[key] || 0) * quantities[key]}</span></span>
                    </div>
                  ) : null
                )}
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">Total: <span className="text-blue-600">₹{totalCost}</span></span>
                    {totalCost > 0 && (
                      <span className="text-sm text-gray-600">
                        Pay securely with PayU (Cards, UPI, Net Banking)
                      </span>
                    )}
                  </div>
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow transition text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={totalCost === 0 || loading}
                    onClick={handlePayUCheckout}
                  >
                    {loading ? 'Processing...' : 'Pay with PayU'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Payment History Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-purple-600">📊</span> Payment History
              </h2>
              <button
                onClick={() => setShowPaymentHistory(!showPaymentHistory)}
                className="text-sm text-blue-600 hover:text-blue-800 transition"
              >
                {showPaymentHistory ? 'Hide' : 'Show'} History
              </button>
            </div>
            
            {showPaymentHistory && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                {paymentHistory.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No payment history found.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {paymentHistory.map((payment) => (
                      <div key={payment._id} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">
                            ₹{payment.amount} ({payment.currency}) - {payment.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {payment.items.map((item, index) => (
                            <span key={index}>
                              {FEATURE_LABELS[item.featureKey] || item.featureKey}: {item.quantity}
                              {index < payment.items.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Order ID: {payment.payuOrderId}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlan; 