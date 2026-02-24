import { GoogleGenAI, Modality } from "@google/genai";
import { cleanBase64ForApi } from "../utils/fileHelpers";
import { UploadedFile, MODEL_NAME } from "../types";

// Initialize the client
// Note: In a real production app, this should be proxied through a backend to hide the key.
// For this demo/hackathon context, we use process.env directly as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GenerateAdParams {
  referenceAd: UploadedFile;
  productImage: UploadedFile;
  logoImage?: UploadedFile;
  prompt: string;
}

export const generateAdCreative = async ({
  referenceAd,
  productImage,
  logoImage,
  prompt,
}: GenerateAdParams): Promise<string> => {
  try {
    const parts = [];

    // 1. Add Product Image
    parts.push({
      inlineData: {
        mimeType: productImage.file.type,
        data: cleanBase64ForApi(productImage.base64),
      },
    });

    // 2. Add Logo (if exists)
    if (logoImage) {
      parts.push({
        inlineData: {
          mimeType: logoImage.file.type,
          data: cleanBase64ForApi(logoImage.base64),
        },
      });
    }

    // 3. Add Reference Ad - CRITICAL: Must be LAST image to act as canvas/layout base
    parts.push({
      inlineData: {
        mimeType: referenceAd.file.type,
        data: cleanBase64ForApi(referenceAd.base64),
      },
    });

    // 4. Add Text Prompt
    const finalPrompt = `
      You are an expert creative director and image editor.
      Task: Create a new high-fidelity ad creative based on the provided images.
      
      Inputs provided in order:
      1. Product Image: The new item to feature.
      ${logoImage ? '2. Logo: The brand logo to overlay.' : ''}
      ${logoImage ? '3' : '2'}. Reference Ad: The template layout and style source.

      Instructions:
      - Analyze the Reference Ad's composition, lighting, shadows, and perspective.
      - Replace the main object in the Reference Ad with the provided Product Image.
      - Ensure the Product Image matches the lighting and perspective of the Reference Ad perfectly.
      - ${logoImage ? 'Place the Logo in a natural position, similar to branding in the Reference Ad, or where appropriate.' : 'No logo provided.'}
      - Maintain the background, text style (if any text is preserved), and overall vibe of the Reference Ad.
      - User Instruction: ${prompt}
      
      Output: A single, high-quality image.
    `;

    parts.push({ text: finalPrompt });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: parts,
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Extract image from response
    const generatedPart = response.candidates?.[0]?.content?.parts?.[0];
    
    if (!generatedPart || !generatedPart.inlineData) {
      throw new Error("No image generated from Gemini.");
    }

    const base64Image = generatedPart.inlineData.data;
    // Determine mimeType (defaulting to png if not specified, though typically comes as jpeg or png)
    const mimeType = generatedPart.inlineData.mimeType || 'image/png';

    return `data:${mimeType};base64,${base64Image}`;

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    throw new Error(error.message || "Failed to generate ad creative.");
  }
};