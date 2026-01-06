import User from "../models/User.js";
import axios from "axios";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const { prompt, userId } = req.body;

    // 1. Find User
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, error: "User not found" });
    }

    // 2. Check Credits
    if (user.credits <= 0) {
      return res.json({ 
        success: false, 
        error: "No credits left", 
        creditBalance: 0 
      });
    }

    // 3. Call AI API (ClipDrop)
    const form = new FormData();
    form.append('prompt', prompt);

    const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', form, {
      headers: {
        'x-api-key': process.env.AI_API_KEY,
        ...form.getHeaders(),
      },
      responseType: 'arraybuffer'
    });

    // 4. Convert Image
    const buffer = Buffer.from(response.data, 'binary');
    const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;

    // 5. Deduct Credit & Save
    user.credits -= 1;
    await user.save();

    res.json({ 
      success: true, 
      imageUrl: base64Image, 
      creditBalance: user.credits 
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, error: "Image generation failed" });
  }
};
