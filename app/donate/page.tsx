"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  CreditCard,
  Shield,
  Gift,
  Users,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const DonatePage = () => {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(2000);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLoaded, setPaymentLoaded] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // Payment gateway initialization
  useEffect(() => {
    setPaymentLoaded(true); // Payment gateway is ready
  }, []);

  const predefinedAmounts = [
    { amount: 500, label: "₹500", impact: "Feeds 1 child for a week" },
    { amount: 1000, label: "₹1,000", impact: "Supports 1 heritage workshop" },
    { amount: 2000, label: "₹2,000", impact: "Preserves 1 artifact" },
    { amount: 5000, label: "₹5,000", impact: "Funds 1 restoration project" },
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive numbers and empty string
    if (value === "" || (!isNaN(Number(value)) && Number(value) >= 0)) {
      setCustomAmount(value);
      if (value) {
        setSelectedAmount(0);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Payment gateway retry functionality
  const retryPaymentLoad = () => {
    setPaymentError(false);
    setPaymentLoaded(true);
  };



  const validateForm = () => {
    const errors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const amount = customAmount ? parseInt(customAmount) : selectedAmount;

      if (!amount || amount < 1) {
        alert("Please enter a valid amount");
        setIsLoading(false);
        return;
      }

      if (process.env.NODE_ENV === 'development') {
        console.log("🚀 Initiating PayU payment for amount:", amount);
      }

      // Call payment initiation API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (process.env.NODE_ENV === 'development') {
        console.log('Payment API response status:', response.status);
      }

      const data = await response.json();
      if (process.env.NODE_ENV === 'development') {
        console.log('Payment API response data:', data);
      }

      if (!response.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Payment initiation failed:', data);
        }
        throw new Error(data.error || 'Payment initiation failed');
      }

      if (data.success && data.paymentData) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Payment data received, creating form for PayU submission');
          console.log('Payment data:', data.paymentData);
        }
        
        // Create form and submit to PayU - Following PayU documentation
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.payuUrl;
        form.target = '_blank'; // Open in new window/tab
        form.style.display = 'none'; // Hide the form

        // Add all PayU parameters as hidden inputs
        Object.entries(data.paymentData).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = String(value);
            form.appendChild(input);
            if (process.env.NODE_ENV === 'development') {
              console.log(`Added parameter: ${key} = ${value}`);
            }
          }
        });

        if (process.env.NODE_ENV === 'development') {
          console.log('Submitting form to PayU:', data.payuUrl);
          console.log('Form data being submitted:', new FormData(form));
        }
        
        document.body.appendChild(form);
        
        // Submit form - will open PayU in new window/tab
        form.submit();
        
        // Show success message since PayU opened successfully
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ PayU payment page opened successfully!');
        }
        
        // Stop loading state since PayU opened
        setIsLoading(false);
        
        // Show success message to user
        alert('Payment page opened! Please complete your payment in the new window.');
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('Invalid payment data received:', data);
        }
        throw new Error('Invalid payment data received');
      }
      
    } catch (error) {
      setIsLoading(false);
      if (process.env.NODE_ENV === 'development') {
        console.error('Payment error:', error);
      }
      
      let errorMessage = "Payment failed";
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Payment request timed out. Please try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      router.push(
        `/donate/failure?error_description=${encodeURIComponent(errorMessage)}`
      );
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
          font-family: system-ui, -apple-system, sans-serif;
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
      <div className="text-brand-black pt-28 relative">
        {/* Dark Underlay Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: "#160000",
          }}
        />

        {/* Fabric Texture Background - Reduced Opacity */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.18,
          }}
        />

        {/* Peacock Flat Overlay with Multiply Blend */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/digilabs/image/upload/v1759174358/prod/about/background/peacock_flat_ol19op.png)",
            backgroundSize: "70%",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            mixBlendMode: "multiply",
            opacity: 0.9,
          }}
        />

        {/* Top Fade Overlay - Like Home Screen */}
        <div
          className="absolute top-0 left-0 right-0 z-1"
          style={{
            height: "200px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />

        {/* Bottom Fade Overlay - Like Home Screen */}
        <div
          className="absolute bottom-0 left-0 right-0 z-1"
          style={{
            height: "200px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />
        {/* Hero Section */}
        <section className="py-8 px-6 container mx-auto text-center relative z-10">
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
              <h1
                className="text-4xl md:text-5xl font-serif text-amber-700 mb-3 bg-gradient-to-r from-amber-700 to-yellow-500 bg-clip-text text-transparent"
                style={{ lineHeight: "1.2", paddingBottom: "8px" }}
              >
                Support Our Cause
              </h1>
              <div className="max-w-4xl mx-auto pb-1 mb-1">
                <p
                  className="text-lg font-sans text-brand-earthen leading-relaxed break-words"
                  style={{ lineHeight: "1.6", paddingBottom: "8px" }}
                >
                  Your contribution helps preserve India&apos;s priceless
                  heritage for future generations.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Donation Form */}
        <section className="pt-2 pb-4 px-6 container mx-auto max-w-4xl relative z-10">
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
                <h2 className="text-2xl font-serif text-brand-black mb-2">
                  Choose Your Impact
                </h2>
                <p className="text-brand-earthen">
                  Select an amount that resonates with your heart
                </p>
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
                          ? "bg-gradient-to-r from-yellow-400 to-amber-600 text-white shadow-xl border-yellow-400"
                          : "bg-white text-brand-black border-brand-earthen hover:border-yellow-400 hover:shadow-lg"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold mb-1">
                            {item.label}
                          </div>
                          <div
                            className={`text-sm ${
                              selectedAmount === item.amount
                                ? "text-white/80"
                                : "text-brand-earthen"
                            }`}
                          >
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
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-amber-600">
                      ₹
                    </span>
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
                <h2 className="text-2xl font-serif text-brand-black mb-2">
                  Your Details
                </h2>
                <p className="text-brand-earthen">
                  Help us keep you updated on our impact
                </p>
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
                      className={`w-full p-3 text-lg border-2 rounded-2xl focus:outline-none transition-all duration-300 bg-white/50 ${
                        formErrors.name
                          ? "border-red-500"
                          : "border-brand-earthen focus:border-yellow-400"
                      }`}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={
                        formErrors.name ? "name-error" : undefined
                      }
                    />
                    {formErrors.name && (
                      <p
                        id="name-error"
                        className="text-red-500 text-sm mt-1"
                        role="alert"
                      >
                        {formErrors.name}
                      </p>
                    )}
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
                      className={`w-full p-3 text-lg border-2 rounded-2xl focus:outline-none transition-all duration-300 bg-white/50 ${
                        formErrors.email
                          ? "border-red-500"
                          : "border-brand-earthen focus:border-yellow-400"
                      }`}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={
                        formErrors.email ? "email-error" : undefined
                      }
                    />
                    {formErrors.email && (
                      <p
                        id="email-error"
                        className="text-red-500 text-sm mt-1"
                        role="alert"
                      >
                        {formErrors.email}
                      </p>
                    )}
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
                      className={`w-full p-3 text-lg border-2 rounded-2xl focus:outline-none transition-all duration-300 bg-white/50 ${
                        formErrors.phone
                          ? "border-red-500"
                          : "border-brand-earthen focus:border-yellow-400"
                      }`}
                      aria-invalid={!!formErrors.phone}
                      aria-describedby={
                        formErrors.phone ? "phone-error" : undefined
                      }
                    />
                    {formErrors.phone && (
                      <p
                        id="phone-error"
                        className="text-red-500 text-sm mt-1"
                        role="alert"
                      >
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Donate Button */}
                <div className="pt-2 flex flex-col items-center gap-3">
                  <button
                    type="submit"
                    disabled={isLoading || !paymentLoaded}
                    className="pay-btn"
                    aria-label="Process donation payment"
                    aria-describedby="payment-status"
                  >
                    <span className="btn-text">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </div>
                      ) : !paymentLoaded && !paymentError ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Loading Payment Gateway...
                        </div>
                      ) : paymentError ? (
                        "Payment Gateway Error"
                      ) : (
                        "Donate Now"
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
                      <svg
                        viewBox="0 0 24 24"
                        className="icon wallet-icon default-icon"
                      >
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
                  {paymentError && (
                    <div
                      className="text-center"
                      role="alert"
                      aria-live="polite"
                    >
                      <p className="text-red-600 text-sm mb-2">
                        Unable to connect to payment gateway. This might be due
                        to network issues or firewall restrictions.
                      </p>
                      <button
                        onClick={retryPaymentLoad}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
                        aria-label="Retry loading payment gateway"
                      >
                        Retry Loading Payment Gateway
                      </button>
                    </div>
                  )}

                  {/* Debug Info */}
                  {!paymentLoaded && !paymentError && (
                    <p
                      id="payment-status"
                      className="text-gray-500 text-xs text-center"
                    >
                      Loading payment gateway... This may take a few seconds.
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 px-6 container mx-auto relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-serif text-amber-700 mb-3">
              Why Trust Us?
            </h2>
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
              <h3 className="text-xl font-semibold text-brand-black mb-3">
                Secure & Safe
              </h3>
              <p className="text-brand-earthen leading-relaxed">
                Your donation is processed securely with bank-level encryption
                and PCI DSS compliance.
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
              <h3 className="text-xl font-semibold text-brand-black mb-3">
                Tax Deductible
              </h3>
              <p className="text-brand-earthen leading-relaxed">
                All donations are eligible for tax deduction under Section 80G
                of the Income Tax Act.
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
              <h3 className="text-xl font-semibold text-brand-black mb-3">
                Direct Impact
              </h3>
              <p className="text-brand-earthen leading-relaxed">
                100% of your donation goes directly to heritage preservation
                projects with full transparency.
              </p>
            </motion.div>
          </div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-gradient-to-r from-yellow-200 to-amber-300 rounded-2xl p-4 text-gray-800 text-center max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-serif mb-4">Our Impact So Far</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <div>
                <div className="text-lg md:text-2xl font-bold mb-1">₹2.5M+</div>
                <div className="text-xs md:text-sm text-gray-600">Raised</div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold mb-1">500+</div>
                <div className="text-xs md:text-sm text-gray-600">
                  Artifacts Preserved
                </div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold mb-1">50+</div>
                <div className="text-xs md:text-sm text-gray-600">
                  Projects Funded
                </div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold mb-1">1000+</div>
                <div className="text-xs md:text-sm text-gray-600">
                  Lives Impacted
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default DonatePage;
