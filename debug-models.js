const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-pro",
    "gemini-1.5-pro",
    "gemini-1.0-pro"
];

async function testAllModels() {
    console.log("STARTING MODEL TEST");

    if (!process.env.GEMINI_API_KEY) {
        console.error('API Key is missing');
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    for (const modelName of modelsToTest) {
        console.log(`Testing model: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello");
            const response = await result.response;
            const text = response.text();
            console.log(`SUCCESS: ${modelName}`);
        } catch (error) {
            console.log(`FAILED: ${modelName}`);
            console.log(`ERROR MESSAGE: ${error.message}`);
        }
        console.log("---");
    }
    console.log("FINISHED MODEL TEST");
}

testAllModels();
