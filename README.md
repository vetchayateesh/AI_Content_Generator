# AI-Powered Content Generator

A modern, beautiful, and responsive web application that uses Artificial Intelligence to generate various types of content. Built with Node.js, Express, and vanilla HTML/CSS/JavaScript.

## 🚀 Project Overview

This application allows users to generate high-quality content for different purposes using Google's Gemini AI. It features a premium, glassmorphism-inspired UI with smooth animations and a seamless user experience.

### Key Features
-   **Multiple Content Types**: Generate Social Media Captions, Blog Ideas, Product Descriptions, and Email Templates.
-   **Modern UI**: Beautiful gradients, glassmorphism effects, and responsive design.
-   **Real-time Generation**: Instant content generation with loading states.
-   **Copy to Clipboard**: Easily copy the generated text with a single click.
-   **Secure**: API keys are stored securely on the backend.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3 (Custom Properties, Flexbox/Grid), JavaScript (ES6+)
-   **Backend**: Node.js, Express.js
-   **AI Model**: Google Gemini API (`@google/generative-ai`)
-   **Utilities**: `dotenv` for environment variables, `cors` for cross-origin resource sharing.

## ⚙️ How It Works

1.  **User Input**: The user selects a content type and enters a prompt in the frontend.
2.  **API Request**: The frontend sends a `POST` request to the `/generate` endpoint on the backend.
3.  **AI Processing**: The backend receives the request, constructs a specialized prompt based on the content type, and calls the Google Gemini API.
4.  **Response**: The AI generates the content, which is sent back to the frontend.
5.  **Display**: The frontend displays the result with a typewriter animation.

## 🔌 API Explanation

### `POST /generate`

Endpoint to generate content.

**Request Body:**
```json
{
  "prompt": "Your topic or description here",
  "type": "social" // Options: 'social', 'blog', 'product', 'email'
}
```

**Response:**
```json
{
  "success": true,
  "data": "Generated content string..."
}
```

## 📝 Setup Instructions

### Prerequisites
-   Node.js installed on your machine.
-   A Google Cloud Project with Gemini API enabled and an API Key.

### Installation

1.  **Clone or Download** the project folder.
2.  **Install Dependencies**:
    Open your terminal in the project folder and run:
    ```bash
    npm install
    ```
3.  **Configure Environment**:
    -   Open the `.env` file.
    -   Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API Key.
    ```env
    PORT=3000
    GEMINI_API_KEY=AIzaSy...
    ```

## ▶️ How to Run (Node.js)

1.  **Start the Backend Server**:
    ```bash
    npm start
    ```
    You should see: `Server is running on http://localhost:3000`

2.  **Open the App**:
    Open your browser and visit: `http://localhost:3000`

## 🐍 How to Run (Python)

If you prefer using Python:

1.  **Install Python Dependencies**:
    ```bash
    pip install -r server/requirements.txt
    ```

2.  **Start the Python Server**:
    ```bash
    python server/app.py
    ```
    You should see: `Server is running on http://localhost:5000`

3.  **Open the App**:
    Open your browser and visit: `http://localhost:5000`

## 📸 Screenshots

*(Placeholder: Upload screenshots of the application here to showcase the UI)*

---

**Enjoy creating amazing content with AI!**
