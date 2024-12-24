# Advertisement Image Generator

## Project Overview

The **Advertisement Image Generator** is a powerful tool that leverages **Stable Diffusion** to generate high-quality advertisement images based on textual descriptions. The model takes in a product description and other key parameters like target audience and brand guidelines, then outputs a visually appealing advertisement image. This project aims to assist businesses in creating professional-grade images without the need for extensive graphic design experience, all powered by AI.

## Features

- **Text-to-Image Generation**: Generates images based on product descriptions, brand guidelines, and target audience data.
- **Customizable Prompts**: Adapt the generated images to align with specific product requirements and audience preferences.
- **Brand Consistency**: Ensures that images adhere to predefined color palettes and visual styles.
- **Call-to-Action (CTA) Integration**: Incorporates effective and visually appealing CTAs in the generated images.
- **Performance Optimization**: Utilizes a low-end version of Stable Diffusion to run efficiently even without high-end GPU resources.

## Technologies Used

- **Stable Diffusion**: A state-of-the-art text-to-image model used for generating advertisement images.
- **Python**: Programming language used to interface with the Stable Diffusion model and run the image generation logic.
- **Flask/FastAPI**: Framework for creating the backend API to handle requests and generate images.
- **Git**: For version control and collaboration.
- **GitHub**: For project hosting and management.

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- Python 3.8 or higher
- Git
- Docker (optional for containerization)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/advertisement-image-generator.git
   cd advertisement-image-generator

API Endpoints
POST /generate_image: Generates an advertisement image based on input data.

Request Body (JSON):

json
Copy code
{
  "product_name": "GlowWell Skin Serum",
  "tagline": "Radiance Redefined.",
  "target_audience": "Urban women aged 30-45, seeking premium skincare solutions.",
  "brand_palette": {
    "primary": "#FFC107",
    "secondary": "#212121",
    "tertiary": "#FFFFFF"
  },
  "call_to_action": "Buy Now"
}
Response (JSON):

json
Copy code
{
  "status": "success",
  "image_url": "http://example.com/generated_image.png",
  "message": "Image generated successfully!"
}
Example Request
You can test the API by sending a POST request to /generate_image using tools like Postman or cURL.

bash
Copy code
curl -X POST http://localhost:5000/generate_image -H "Content-Type: application/json" -d '{
  "product_name": "GlowWell Skin Serum",
  "tagline": "Radiance Redefined.",
  "target_audience": "Urban women aged 30-45, seeking premium skincare solutions.",
  "brand_palette": {
    "primary": "#FFC107",
    "secondary": "#212121",
    "tertiary": "#FFFFFF"
  },
  "call_to_action": "Buy Now"
}'
Scoring and Feedback
The image generation is scored based on multiple criteria, including:

Background-Foreground Separation
Brand Guideline Adherence
Creativity and Visual Appeal
Product Focus
Call to Action (CTA) Integration
Audience Relevance
The scoring system helps evaluate the effectiveness of the generated image in terms of its overall design, message delivery, and alignment with the brand's objectives.

Creative Approach
Model Choice
While initially, we considered building our own custom image generation model, we found that the lack of a high-end GPU on our local machine made it impractical. Instead, we turned to Stable Diffusion, a powerful text-to-image model capable of generating high-quality images with limited computational resources.

Modifications Made
We customized the model by:

Adjusting Input Prompts: Tailored the model’s input to include specific product descriptions, target audience data, and brand guidelines to produce more relevant images.
Style and Composition: Tweaked the model's style to focus on product prominence, ensuring the final image conveyed the product's key features effectively.
CTA Integration: Designed the generated images to include a Call-to-Action that naturally fits within the composition.
Post-Processing
After generating the images, we applied image enhancement techniques like upscaling and noise reduction to ensure the final result met high visual standards, suitable for professional advertisements.

Contribution
Feel free to fork this repository and contribute to the project! Contributions are welcome for new features, bug fixes, and improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

This README provides an overview of the project, installation instructions, API details, creative approach, and the ability to contribute, offering a comprehensive guide to understanding and working with the Advertisement Image Generator project.
