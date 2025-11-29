import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Initialize Flask app
# We set static_folder to '../public' to serve the frontend files
app = Flask(__name__, static_folder='../public', static_url_path='')
CORS(app)

# Configure Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    print("❌ Error: GEMINI_API_KEY is missing in .env file")
else:
    genai.configure(api_key=API_KEY)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/generate', methods=['POST'])
def generate_content():
    try:
        data = request.json
        prompt = data.get('prompt')
        content_type = data.get('type')

        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400

        if not API_KEY:
            return jsonify({'error': 'API Key is missing in server configuration'}), 500

        # Construct the specific prompt based on type
        final_prompt = ""
        if content_type == 'social':
            final_prompt = f"Write a catchy and engaging social media caption for: {prompt}. Include hashtags."
        elif content_type == 'blog':
            final_prompt = f"Generate 5 creative blog post ideas based on the topic: {prompt}. Provide a brief outline for each."
        elif content_type == 'product':
            final_prompt = f"Write a persuasive and SEO-friendly product description for: {prompt}. Highlight key features and benefits."
        elif content_type == 'email':
            final_prompt = f"Write a professional email template for: {prompt}. Keep it clear and concise."
        else:
            final_prompt = prompt

        print(f"Generating content for type: {content_type}")
        
        # List of models to try in order
        models_to_try = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro']
        
        response = None
        last_error = None

        for model_name in models_to_try:
            try:
                print(f"Trying model: {model_name}")
                model = genai.GenerativeModel(model_name)
                response = model.generate_content(final_prompt)
                if response.text:
                    print(f"✅ Success with {model_name}")
                    break
            except Exception as e:
                print(f"❌ Failed with {model_name}: {str(e)}")
                last_error = e
                continue
        
        if response and response.text:
            return jsonify({'success': True, 'data': response.text})
        else:
            # If all failed, construct a helpful error message
            error_msg = str(last_error) if last_error else "Unknown error"
            if "404" in error_msg or "not found" in error_msg.lower():
                return jsonify({
                    'success': False, 
                    'error': 'API Error: Model not found. Please enable "Generative Language API" in Google Cloud Console.'
                }), 500
            else:
                return jsonify({'success': False, 'error': f"All models failed. Last error: {error_msg}"}), 500

if __name__ == '__main__':
    print("Server is running on http://localhost:5000")
    app.run(port=5000, debug=True)
