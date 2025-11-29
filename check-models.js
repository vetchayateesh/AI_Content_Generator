const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

async function listModels() {
    if (!process.env.GEMINI_API_KEY) {
        console.error('API Key is missing');
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        // For v1beta, we might need to access the model list differently or just try to generate with a known model.
        // But the SDK doesn't have a direct listModels method exposed easily in the high-level helper sometimes.
        // Let's try to use the model directly or just print that we are trying to find valid models.

        // Actually, the SDK does not have a simple listModels() on the genAI instance in all versions.
        // Let's try to just run a simple generation with 'gemini-pro' to see if it works.

        console.log("Testing 'gemini-pro'...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        await modelPro.generateContent("test");
        console.log("✅ 'gemini-pro' is available.");

    } catch (error) {
        console.log("❌ 'gemini-pro' failed: " + error.message);
    }

    try {
        console.log("Testing 'gemini-1.5-flash'...");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        await modelFlash.generateContent("test");
        console.log("✅ 'gemini-1.5-flash' is available.");
    } catch (error) {
        console.log("❌ 'gemini-1.5-flash' failed: " + error.message);
    }
}

listModels();
