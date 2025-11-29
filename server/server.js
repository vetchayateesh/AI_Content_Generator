const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');


dotenv.config({ path: __dirname + '/../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../public')); // Serve static files from public directory

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API Endpoint to generate content
app.post('/generate', async (req, res) => {
    try {
        const { prompt, type } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('API Key is missing');
            return res.status(500).json({ error: 'API Key is missing in server configuration' });
        }

        let finalPrompt = "";
        switch (type) {
            case 'social':
                finalPrompt = `Write a catchy and engaging social media caption for: ${prompt}. Include hashtags.`;
                break;
            case 'blog':
                finalPrompt = `Generate 5 creative blog post ideas based on the topic: ${prompt}. Provide a brief outline for each.`;
                break;
            case 'product':
                finalPrompt = `Write a persuasive and SEO-friendly product description for: ${prompt}. Highlight key features and benefits.`;
                break;
            case 'email':
                finalPrompt = `Write a professional email template for: ${prompt}. Keep it clear and concise.`;
                break;
            default:
                finalPrompt = prompt;
        }

        const modelsToTry = ["gemini-pro-latest", "gemini-1.5-pro-latest", "gemini-1.0-pro-001"];
        let text = null;
        let lastError = null;

        console.log(`Generating content for type: ${type}`);

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(finalPrompt);
                const response = await result.response;

                //ans = response;

                const { marked } = await import('marked');
                text = marked(response.text());

                if (text) {
                    console.log(`✅ Success with model: ${modelName}`);
                    break;
                }
            } catch (e) {
                console.warn(`⚠️ Failed with model ${modelName}: ${e.message.split('\n')[0]}`);
                lastError = e;
            }
        }

        if (!text) {
            throw lastError || new Error("All models failed to generate content.");
        }

        console.log('Content generated successfully');
        res.json({ success: true, data: text });

    } catch (error) {
        console.error('Error generating content:', error);

        let errorMessage = 'Failed to generate content. Please try again.';

        if (error.message) {
            if (error.message.includes('API key') || error.message.includes('403')) {
                errorMessage = 'Invalid API Key. Please check your .env file.';
            } else if (error.message.includes('404')) {
                errorMessage = 'Model not found. Ensure the API is enabled in Google Cloud.';
            } else {
                errorMessage = error.message;
            }
        }

        res.status(500).json({ success: false, error: errorMessage });
    }
});

// Serve the frontend at the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
