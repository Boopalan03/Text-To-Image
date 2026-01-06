// frontend/src/pages/Pricing.jsx - Complete with Perfect Footer Layout
import React, { useState } from "react";
import Footer from "../components/Footer";

const Pricing = () => {
  const [upiId] = useState("your-upi-id@paytm"); // Replace with your actual UPI ID

  const plans = [
    {
      id: 1,
      name: "Basic",
      credits: "10",
      price: "₹5",
      popular: false,
      features: ["Standard Resolution", "Commercial Use"]
    },
    {
      id: 2,
      name: "Pro",
      credits: "50",
      price: "₹15",
      popular: false,
      features: ["HD Resolution", "Priority Support", "No Watermark"]
    },
    {
      id: 3,
      name: "Advanced",
      credits: "250",
      price: "₹49",
      popular: false,
      features: ["4K Resolution", "API Access", "Dedicated Manager"]
    }
  ];

  const handleBuy = (plan) => {
    // Copy UPI ID to clipboard
    navigator.clipboard.writeText(upiId);
    
    // Show instruction alert
    alert(
      `🛒 Buying ${plan.name} Plan (${plan.price})\n\n` +
      `1️⃣ UPI ID Copied: ${upiId}\n` +
      `2️⃣ Send payment via any UPI app\n` +
      `3️⃣ Email screenshot to support@imagify.com\n\n` +
      `⚡ Credits will be added instantly!`
    );
  };

  return (
    <div className="pricing-page">
      {/* Content Wrapper ensures footer stays at bottom */}
      <div className="pricing-content">
        
        {/* Hero Section */}
        <div className="pricing-hero">
          <h1>Choose plan</h1>
          <p>Flexible pricing for every creator</p>
        </div>

        {/* Plans Grid */}
        <div className="plans-grid">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`plan-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <span className="popular-badge">Most Popular</span>}
              
              <div className="plan-icon">
                {plan.name === "Basic" && "🚀"}
                {plan.name === "Pro" && "⭐"}
                {plan.name === "Advanced" && "💎"}
              </div>
              
              <h3>{plan.name} Plan</h3>
              <div className="plan-credits">{plan.credits} Credits</div>
              <div className="plan-price">{plan.price}</div>
              
              <button 
                className="plan-cta" 
                onClick={() => handleBuy(plan)}
              >
                Get Started
              </button>

              {/* Optional features list */}
              {/* <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>✓ {feature}</li>
                ))}
              </ul> */}
            </div>
          ))}
        </div><br/><br/>

        {/* Support Section */}
        <div className="pricing-support">
          <h3>Questions? Contact us</h3>
          <p>Email: support@imagify.com | UPI payments processed instantly</p>
        </div>

      </div>

    </div>
  );
};

export default Pricing;
