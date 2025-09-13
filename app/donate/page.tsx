'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Shield, Gift, Star, Users, Award, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DonatePage = () => {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(2000);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [razorpayError, setRazorpayError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Preload Razorpay script on component mount
  useEffect(() => {
    const preloadRazorpay = () => {
      // Check if already loaded
      if (typeof (window as any).Razorpay !== 'undefined') {
        console.log('Razorpay already loaded');
        setRazorpayLoaded(true);
        return;
      }

      // Log environment info for debugging
      console.log('Environment check:', {
        isProduction: process.env.NODE_ENV === 'production',
        appUrl: process.env.NEXT_PUBLIC_APP_URL,
        razorpayKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'Set' : 'Not set'
      });

      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        console.log('Razorpay script already exists, waiting for load...');
        // Wait for existing script to load
        const checkInterval = setInterval(() => {
          if (typeof (window as any).Razorpay !== 'undefined') {
            clearInterval(checkInterval);
            console.log('Razorpay loaded from existing script');
            setRazorpayLoaded(true);
          }
        }, 100);

        // Clear interval after 15 seconds and mark as failed
        setTimeout(() => {
          clearInterval(checkInterval);
          if (typeof (window as any).Razorpay === 'undefined') {
            console.error('Existing Razorpay script failed to load within timeout');
            setRazorpayLoaded(false);
            setRazorpayError(true);
          }
        }, 15000);
        return;
      }

      console.log('Loading Razorpay script...');
      // Load the script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        // Double check that Razorpay is actually available
        setTimeout(() => {
          if (typeof (window as any).Razorpay !== 'undefined') {
            setRazorpayLoaded(true);
          } else {
            console.error('Razorpay script loaded but Razorpay object not available');
            setRazorpayLoaded(false);
          }
        }, 100);
      };
      
      script.onerror = (error) => {
        console.error('Failed to preload Razorpay script:', error);
        console.error('This might be due to CSP blocking or network issues');
        setRazorpayLoaded(false);
        setRazorpayError(true);
      };
      
      // Add timeout for script loading
      setTimeout(() => {
        if (typeof (window as any).Razorpay === 'undefined') {
          console.error('Razorpay script loading timeout');
          setRazorpayLoaded(false);
          setRazorpayError(true);
        }
      }, 10000);
      
      document.head.appendChild(script);
    };

    preloadRazorpay();
  }, []);

  const predefinedAmounts = [
    { amount: 500, label: '₹500', impact: 'Feeds 1 child for a week' },
    { amount: 1000, label: '₹1,000', impact: 'Supports 1 heritage workshop' },
    { amount: 2000, label: '₹2,000', impact: 'Preserves 1 artifact' },
    { amount: 5000, label: '₹5,000', impact: 'Funds 1 restoration project' }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive numbers and empty string
    if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
      setCustomAmount(value);
      if (value) {
        setSelectedAmount(0);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to manually retry loading Razorpay
  const retryRazorpayLoad = () => {
    console.log('Manually retrying Razorpay load...');
    setRazorpayError(false);
    setRazorpayLoaded(false);
    
    // Remove existing script if any
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Load script again
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      console.log('Razorpay script loaded on retry');
      setTimeout(() => {
        if (typeof (window as any).Razorpay !== 'undefined') {
          setRazorpayLoaded(true);
          setRazorpayError(false);
        } else {
          setRazorpayError(true);
        }
      }, 100);
    };
    
    script.onerror = () => {
      console.error('Razorpay script failed on retry');
      setRazorpayError(true);
    };
    
    document.head.appendChild(script);
  };

  // Function to test network connectivity to Razorpay CDN
  const testRazorpayConnectivity = async (): Promise<boolean> => {
    try {
      const response = await fetch('https://checkout.razorpay.com/v1/checkout.js', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      return true;
    } catch (error) {
      console.error('Razorpay CDN connectivity test failed:', error);
      return false;
    }
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const amount = customAmount ? parseInt(customAmount) : selectedAmount;
      
      if (!amount || amount < 1) {
        alert('Please enter a valid amount');
        setIsLoading(false);
        return;
      }

      // Test network connectivity first
      const isConnected = await testRazorpayConnectivity();
      if (!isConnected) {
        alert('Unable to connect to payment gateway. Please check your internet connection and try again.');
        setIsLoading(false);
        return;
      }

      // Create order
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `donation_${Date.now()}`,
          notes: {
            donor_name: formData.name,
            donor_email: formData.email,
            donor_phone: formData.phone,
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Check if Razorpay key is available
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error('Razorpay key not configured. Please check your environment variables.');
      }

      // Function to initialize Razorpay payment
      const initializeRazorpay = () => {
        try {
          // Check if Razorpay is available
          if (typeof (window as any).Razorpay === 'undefined') {
            throw new Error('Razorpay script not loaded');
          }

          const options = {
            key: razorpayKey,
            amount: orderData.order.amount,
            currency: orderData.order.currency,
            name: 'Virasat - Cultural Heritage Foundation',
            description: 'Donation for Heritage Preservation',
            order_id: orderData.order.id,
            prefill: {
              name: formData.name,
              email: formData.email,
              contact: formData.phone,
            },
            theme: {
              color: '#F59E0B',
            },
            // Ensure Indian payment methods are prioritized
            method: {
              netbanking: true,
              wallet: true,
              card: true,
              upi: true,
              emi: false,
              paylater: false
            },
            handler: async function (response: any) {
              try {
                // Verify payment
                const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                });

                const verifyData = await verifyResponse.json();

                if (verifyData.success) {
                  // Redirect to success page
                  router.push(`/donate/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&amount=${amount}`);
                } else {
                  throw new Error('Payment verification failed');
                }
              } catch (error) {
                console.error('Payment verification error:', error);
                router.push(`/donate/failure?error_description=Payment verification failed&order_id=${response.razorpay_order_id}`);
              }
            },
            modal: {
              ondismiss: function() {
                setIsLoading(false);
              }
            }
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Razorpay initialization error:', error);
          setIsLoading(false);
          alert('Failed to initialize payment gateway. Please try again.');
        }
      };

      // Check if Razorpay is already loaded
      if (typeof (window as any).Razorpay !== 'undefined') {
        initializeRazorpay();
        return;
      }

      // Check if script is already being loaded
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        // Script is already being loaded, wait for it
        const checkRazorpay = setInterval(() => {
          if (typeof (window as any).Razorpay !== 'undefined') {
            clearInterval(checkRazorpay);
            initializeRazorpay();
          }
        }, 100);

        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkRazorpay);
          if (typeof (window as any).Razorpay === 'undefined') {
            setIsLoading(false);
            alert('Payment gateway is taking too long to load. Please refresh the page and try again.');
          }
        }, 10000);
        return;
      }

      // Load Razorpay script with retry mechanism
      const loadRazorpayScript = (retryCount = 0) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          // Small delay to ensure Razorpay is fully initialized
          setTimeout(() => {
            initializeRazorpay();
          }, 100);
        };
        
        script.onerror = () => {
          console.error(`Failed to load Razorpay script (attempt ${retryCount + 1})`);
          
          if (retryCount < 2) {
            // Retry loading the script
            setTimeout(() => {
              loadRazorpayScript(retryCount + 1);
            }, 1000 * (retryCount + 1)); // Exponential backoff
          } else {
            setIsLoading(false);
            alert('Unable to load payment gateway. Please check your internet connection and try again. If the problem persists, please contact support.');
          }
        };
        
        document.head.appendChild(script);
      };

      loadRazorpayScript();

    } catch (error) {
      console.error('Donation error:', error);
      setIsLoading(false);
      router.push(`/donate/failure?error_description=${encodeURIComponent(error instanceof Error ? error.message : 'Payment failed')}`);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <>
      <style jsx>{`
        /* From Uiverse.io by fthisilak */ 
        .pay-btn {
          position: relative;
          padding: 12px 24px;
          font-size: 16px;
          background: #1a1a1a;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .pay-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
        }

        .icon-container {
          position: relative;
          width: 24px;
          height: 24px;
        }

        .icon {
          position: absolute;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          color: #22c55e;
          opacity: 0;
          visibility: hidden;
        }

        .default-icon {
          opacity: 1;
          visibility: visible;
        }

        /* Hover animations */
        .pay-btn:hover .icon {
          animation: none;
        }

        .pay-btn:hover .wallet-icon {
          opacity: 0;
          visibility: hidden;
        }

        .pay-btn:hover .card-icon {
          animation: iconRotate 2.5s infinite;
          animation-delay: 0s;
        }

        .pay-btn:hover .payment-icon {
          animation: iconRotate 2.5s infinite;
          animation-delay: 0.5s;
        }

        .pay-btn:hover .rupee-icon {
          animation: iconRotate 2.5s infinite;
          animation-delay: 1s;
        }

        .pay-btn:hover .check-icon {
          animation: iconRotate 2.5s infinite;
          animation-delay: 1.5s;
        }

        /* Active state - show only checkmark */
        .pay-btn:active .icon {
          animation: none;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .pay-btn:active .check-icon {
          animation: checkmarkAppear 0.6s ease forwards;
          visibility: visible;
        }

        .btn-text {
          font-weight: 600;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
        }

        @keyframes iconRotate {
          0% {
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px) scale(0.5);
          }
          5% {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
          }
          15% {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
          }
          20% {
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px) scale(0.5);
          }
          100% {
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px) scale(0.5);
          }
        }

        @keyframes checkmarkAppear {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-45deg);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
      <div className="text-brand-black pt-20 min-h-screen" style={{ backgroundColor: '#FFF6F4' }}>
      {/* Hero Section */}
      <section className="py-8 px-6 container mx-auto text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-600/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full mb-3"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-serif text-amber-700 mb-3 bg-gradient-to-r from-amber-700 to-yellow-500 bg-clip-text text-transparent" style={{ lineHeight: '1.2', paddingBottom: '8px' }}>
              Support Our Cause
            </h1>
            <div className="max-w-4xl mx-auto pb-1 mb-1">
              <p className="text-lg font-sans text-brand-earthen leading-relaxed break-words" style={{ lineHeight: '1.6', paddingBottom: '8px' }}>
                Your contribution helps preserve India&apos;s priceless heritage for future generations.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Donation Form */}
      <section className="pt-2 pb-4 px-6 container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Amount Selection */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="bg-white rounded-3xl p-4 shadow-2xl border border-brand-earthen/20"
          >
            <div className="text-center mb-4">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-2xl mb-3"
              >
                <CreditCard className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-serif text-brand-black mb-2">Choose Your Impact</h2>
              <p className="text-brand-earthen">Select an amount that resonates with your heart</p>
            </div>

            {/* Amount Selection */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {predefinedAmounts.map((item, index) => (
                  <motion.button
                    key={item.amount}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAmountSelect(item.amount)}
                    className={`p-3 rounded-2xl font-semibold transition-all duration-300 text-left border-2 ${
                      selectedAmount === item.amount
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-white shadow-xl border-yellow-400'
                        : 'bg-white text-brand-black border-brand-earthen hover:border-yellow-400 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold mb-1">{item.label}</div>
                        <div className={`text-sm ${selectedAmount === item.amount ? 'text-white/80' : 'text-brand-earthen'}`}>
                          {item.impact}
                        </div>
                      </div>
                      {selectedAmount === item.amount && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              
              <div className="relative">
                <label className="block text-lg font-semibold text-brand-black mb-2">
                  Or Enter a Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-amber-600">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount"
                    className="w-full pl-12 pr-4 py-3 text-xl border-2 border-brand-earthen rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-300 bg-white/50"
                  />
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Side - Personal Information */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="bg-white rounded-3xl p-4 shadow-2xl border border-brand-earthen/20"
          >
            <div className="text-center mb-4">
              <motion.div
                initial={{ rotate: 10 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-400 rounded-2xl mb-3"
              >
                <Users className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-serif text-brand-black mb-2">Your Details</h2>
              <p className="text-brand-earthen">Help us keep you updated on our impact</p>
            </div>

            <form onSubmit={handleDonate} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-semibold text-brand-black mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full p-3 text-lg border-2 border-brand-earthen rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-300 bg-white/50"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-brand-black mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full p-3 text-lg border-2 border-brand-earthen rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-300 bg-white/50"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-brand-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 text-lg border-2 border-brand-earthen rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-300 bg-white/50"
                  />
                </div>
              </div>

              {/* Donate Button */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <button
                  type="submit"
                  disabled={isLoading || !razorpayLoaded}
                  className="pay-btn"
                >
                  <span className="btn-text">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </div>
                    ) : !razorpayLoaded && !razorpayError ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading Payment Gateway...
                      </div>
                    ) : razorpayError ? (
                      'Payment Gateway Error'
                    ) : (
                      'Donate Now'
                    )}
                  </span>
                  <div className="icon-container">
                    <svg viewBox="0 0 24 24" className="icon card-icon">
                      <path
                        d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon payment-icon">
                      <path
                        d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon rupee-icon">
                      <path
                        d="M13.66 7C13.1 5.82 11.9 5 10.5 5H6V3H18V5H16.5C15.1 5 13.9 5.82 13.34 7H18V9H13.66C13.1 10.18 11.9 11 10.5 11H6V13H10.5C11.9 13 13.1 13.82 13.66 15H18V17H13.66C13.1 18.18 11.9 19 10.5 19H6V21H18V19H16.5C15.1 19 13.9 18.18 13.34 17H18V15H13.66C13.1 13.82 11.9 13 10.5 13H6V11H10.5C11.9 11 13.1 10.18 13.66 9H18V7H13.66Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon wallet-icon default-icon">
                      <path
                        d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon check-icon">
                      <path
                        d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
                
                {/* Retry Button and Error Message */}
                {razorpayError && (
                  <div className="text-center">
                    <p className="text-red-600 text-sm mb-2">
                      Unable to load payment gateway. This might be due to network issues or firewall restrictions.
                    </p>
                    <button
                      onClick={retryRazorpayLoad}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
                    >
                      Retry Loading Payment Gateway
                    </button>
                  </div>
                )}
                
                {/* Debug Info */}
                {!razorpayLoaded && !razorpayError && (
                  <p className="text-gray-500 text-xs text-center">
                    Loading payment gateway... This may take a few seconds.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 px-6 container mx-auto">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-serif text-amber-700 mb-3">Why Trust Us?</h2>
          <p className="text-lg text-brand-earthen max-w-2xl mx-auto">
            We&apos;re committed to transparency and making every rupee count
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-xl border border-brand-earthen/10 text-center hover:shadow-2xl transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-brand-black mb-3">Secure & Safe</h3>
            <p className="text-brand-earthen leading-relaxed">
              Your donation is processed securely with bank-level encryption and PCI DSS compliance.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-xl border border-brand-earthen/10 text-center hover:shadow-2xl transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4"
            >
              <Gift className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-brand-black mb-3">Tax Deductible</h3>
            <p className="text-brand-earthen leading-relaxed">
              All donations are eligible for tax deduction under Section 80G of the Income Tax Act.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-xl border border-brand-earthen/10 text-center hover:shadow-2xl transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-2xl mb-4"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-brand-black mb-3">Direct Impact</h3>
            <p className="text-brand-earthen leading-relaxed">
              100% of your donation goes directly to heritage preservation projects with full transparency.
            </p>
          </motion.div>
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-r from-yellow-200 to-amber-300 rounded-2xl p-4 text-gray-800 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-serif mb-4">Our Impact So Far</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold mb-1">₹2.5M+</div>
              <div className="text-gray-600">Raised</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">500+</div>
              <div className="text-gray-600">Artifacts Preserved</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">50+</div>
              <div className="text-gray-600">Projects Funded</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">1000+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </div>
          </div>
        </motion.div>
      </section>
      </div>
    </>
  );
};

export default DonatePage;
