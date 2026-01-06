import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext"; // ✅ Import Context Hook

const Home = ({ setShowLogin }) => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  // ✅ Get user, token, and update function from Context
  const { user, token, updateCredits } = useApp(); 

  const handleGenerate = async () => {
    setError("");

    // 1. Check Login using Context
    if (!token || !user) {
      setShowLogin(true);
      return;
    }

    // 2. Validate Input
    if (!prompt.trim()) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);
    setImage(null);

    try {
      // 3. Call API
      const response = await fetch("http://localhost:5000/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt,
          userId: user._id 
        }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        setImage(data.imageUrl);
        
        // 4. ✅ Update Context (Navbar updates instantly)
        updateCredits(data.creditBalance); 
        
      } else {
        // 5. Handle "No Credits" Case
        if (data.creditBalance === 0 || data.error === "No credits left") {
           
           updateCredits(0); // Sync context to 0
           alert("❌ You have 0 credits left! Redirecting to plans...");
           navigate("/pricing"); 
           
        } else {
           setError(data.error || "Failed to generate image.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* --- HERO SECTION --- */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Turn text into <span className="highlight">Images</span>
          </h1>
          <p className="hero-desc">
            Create stunning visuals from simple text descriptions using AI.
            Whether you need a logo, art, or a realistic photo.
          </p>
        </div>

        {/* Input & Button */}
        <div className="prompt-input-wrapper">
          <input 
            type="text" 
            className="prompt-input"
            placeholder="A futuristic city with flying cars..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button 
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {/* Error & Loading */}
        {error && <div className="error-banner">{error}</div>}
        {loading && <div className="loading-text">🎨 Painting your masterpiece...</div>}

        {/* Generated Image Result */}
        {image && (
          <div className="image-preview">
            <img src={image} alt="Generated" className="preview-img" />
            <br />
            <a href={image} download="generated-image.png">
              <button className="download-btn">Download Image</button>
            </a>
          </div>
        )}
      </div>

      {/* --- HOW IT WORKS SECTION --- */}
      <div className="how-it-works">
        <h2>How it works</h2>
        <p className="section-subtitle">Transform Words Into Stunning Images</p><br/>
        
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Describe Your Vision</h3>
            <p>Type a phrase, sentence, or paragraph that describes the image you want to create.</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Watch the Magic</h3>
            <p>Our AI-powered engine will transform your text into a high-quality, unique image in seconds.</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Download & Share</h3>
            <p>Instantly download your creation or share it with the world directly from our platform.</p>
          </div>
        </div>
      </div>

      {/* --- SAMPLES SECTION --- */}
      <div className="samples">
        <h2>Create AI Images</h2>
        <p className="section-subtitle">Turn Words Into Stunning Images — Instantly</p>

        <div className="sample-grid">
          <div className="sample-card">
            <img 
              src="data:image/jpeg;base64,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" 
              alt="Cyberpunk City" 
              loading="lazy"
            />
            <p>Cyberpunk City</p>
          </div>

          <div className="sample-card">
            <img 
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400&auto=format&fit=crop" 
              alt="Space Astronaut" 
              loading="lazy"
            />
            <p>Space Astronaut</p>
          </div>

          <div className="sample-card">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" 
              alt="Digital Art" 
              loading="lazy"
            />
            <p>Digital Portrait</p>
          </div>
        </div><br/><br/>
      </div>
    </div>
  );
};

export default Home;
