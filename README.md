
# 🌿 AyurPlant Explorer

AyurPlant Explorer is a comprehensive AI-powered Ayurvedic plant encyclopedia. It provides detailed pharmacological profiles (Rasa, Virya, Vipak) with AI-generated visual aids and multi-language support.

## ✨ Features

- **Deep Ayurvedic Profiles**: Get details on Rasa (Taste), Virya (Potency), Vipak (Post-digestive effect), and more.
- **Pharmacological Actions**: Detailed 'Karma' and 'Guna' descriptions.
- **AI Visuals**: Automatically generates high-quality botanical illustrations of searched plants.
- **Multi-language Support**: Supports 9 languages including Sanskrit, Hindi, and regional Indian languages.
- **Mobile Friendly**: Responsive design optimized for all devices.
- **Utility Tools**: Copy plant details to clipboard or download AI-generated images.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for local development)
- A Google Gemini API Key (get it from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ayurplant-explorer.git
   cd ayurplant-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🛠 Tech Stack

- **Frontend**: React 19, Tailwind CSS
- **AI**: Google Gemini API (@google/genai)
- **Icons**: FontAwesome
- **Type Safety**: TypeScript

## 📜 Disclaimer

This tool is for educational purposes only. Always consult a qualified Ayurvedic practitioner or physician before using any medicinal plants for treatment.
