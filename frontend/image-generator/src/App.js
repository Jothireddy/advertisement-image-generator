import React, { useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import './App.css';

function ImageGenerator() {
  const [product, setProduct] = useState("");
  const [tagline, setTagline] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandPalette, setBrandPalette] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  // Scoring logic based on the provided criteria
  const calculateScore = async (imageSrc) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; 
    img.src = imageSrc;
    await new Promise((resolve) => (img.onload = resolve));

    const tensor = tf.browser.fromPixels(img);

    // 1. Background and Foreground Separation
    const gray = tensor.mean(2); 
    const edges = tf.image.sobelEdges(gray.expandDims(-1)).mean();
    const edgeDensity = edges.mean().dataSync()[0];
    const separationScore = Math.min(edgeDensity * 100, 100); 

    // 2. Adherence to Brand Guidelines
    const paletteColors = ["#ff0000", "#00ff00", "#0000ff"]; 
    const imageColors = tensor.mean([0, 1]).dataSync();
    const colorDistance = Math.sqrt(
      paletteColors.reduce(
        (acc, color) =>
          acc +
          Math.pow(parseInt(color.slice(1, 3), 16) - imageColors[0], 2) +
          Math.pow(parseInt(color.slice(3, 5), 16) - imageColors[1], 2) +
          Math.pow(parseInt(color.slice(5, 7), 16) - imageColors[2], 2),
        0
      )
    );
    const adherenceScore = Math.max(100 - colorDistance, 0); 

    // 3. Creativity and Visual Appeal
    const contrast = gray.std().dataSync()[0];
    const creativityScore = Math.min(contrast * 100, 100);

    // 4. Product Focus
    const centerRegion = tensor.slice(
      [tensor.shape[0] / 4, tensor.shape[1] / 4, 0],
      [tensor.shape[0] / 2, tensor.shape[1] / 2, 3]
    );
    const focusScore = centerRegion.mean().dataSync()[0] * 10;

    // 5. Call-to-Action
    const brightness = tensor.mean(2).max().dataSync()[0];
    const callToActionScore = Math.min(brightness * 10, 100);

    // Final weighted score
    const finalScore = Math.round(
      (separationScore * 0.25 +
        adherenceScore * 0.2 +
        creativityScore * 0.2 +
        focusScore * 0.2 +
        callToActionScore * 0.15) / 1
    );

    setScore(finalScore);
    tf.dispose([tensor, gray, edges, centerRegion]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        product,
        tagline,
        target_audience: targetAudience,
        brand_palette: brandPalette,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/generate-image/",
        requestData
      );
      const generatedImageUrl = response.data.image_url;
      setImageUrl(generatedImageUrl);

      // Calculate the score for the generated image
      await calculateScore(generatedImageUrl);
    } catch (error) {
      console.error("Error generating image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Generate Advertisement Image</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product:</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tagline:</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Target Audience:</label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Brand Palette:</label>
          <input
            type="text"
            value={brandPalette}
            onChange={(e) => setBrandPalette(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {imageUrl && (
        <div>
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Generated Advertisement" style={{ maxWidth: "100%" }} />
          {score !== null && (
            <div>
              <h3>Score: {score}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageGenerator;
