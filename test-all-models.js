const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-pro",
    "gemini-1.5-pro",
    "gemini-1.0-pro",
    "gemini-1.0-pro-latest",
    "gemini-1.5-flash-latest"
];

async function testAllModels() {
    console.log("🔍 Testing multiple Gemini models...\n");

    if (!process.env.GEMINI_API_KEY) {
        console.error('❌ API Key is missing in .env file');
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    for (const modelName of modelsToTest) {
        process.stdout.write(`Testing '${modelName}'... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello");
            const response = await result.response;
            const text = response.text();

            if (text) {
                console.log(`✅ SUCCESS!`);
                console.log(`   (This model works for your API key)`);
            }
        } catch (error) {
            console.log(`❌ FAILED`);
            // console.log(`   Error: ${error.message.split('\n')[0]}`); // Print just the first line of error
        }
    }

    console.log("\n📋 If all failed, please check:");
    console.log("1. Is the 'Google Generative Language API' enabled in your Google Cloud Console?");
    console.log("2. Is your API Key valid and active?");
    console.log("3. Are you in a supported region?");
}

testAllModels();
