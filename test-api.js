const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

async function testGemini() {
    console.log('Testing Gemini API...');

    if (!process.env.GEMINI_API_KEY) {
        console.error('❌ Error: GEMINI_API_KEY is missing in .env file');
        return;
    }

    console.log('API Key found (length: ' + process.env.GEMINI_API_KEY.length + ')');

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Say hello to the world in 5 different languages.";
        console.log(`Sending prompt: "${prompt}"`);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('\n✅ Success! Generated Text:\n');
        console.log(text);

    } catch (error) {
        console.error('\n❌ Error generating content:');
        console.error(error);
    }
}

testGemini();
