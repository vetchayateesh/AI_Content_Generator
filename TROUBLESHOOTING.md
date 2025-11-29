# 🔧 Troubleshooting Gemini API Errors

If you are seeing **"Model not found"** or **"404 Not Found"** errors, it means your API Key is not correctly configured to access the Google Gemini models.

## 1. Enable the API
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Select your project.
3.  Search for **"Generative Language API"**.
4.  Click **Enable**.

## 2. Get a Valid API Key
The easiest way to get a working key is via Google AI Studio:
1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Click on **"Get API key"** (top left).
3.  Click **"Create API key"**.
4.  Copy this new key.
5.  Paste it into your `.env` file:
    ```env
    GEMINI_API_KEY=your_new_key_here
    ```

## 3. Verify Your Region
Some models are not available in all countries (e.g., parts of Europe).
-   If you are using a VPN, try turning it off (or on, to switch to US).

## 4. Test the Key
After updating the `.env` file, run the test script:
```bash
node test-rest-api.js
```
If it prints a JSON response with `"text": "Hello"`, your key is working!
