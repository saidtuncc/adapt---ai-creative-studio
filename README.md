<div align="center">
  <br />
  <h1>✨ AdAPT — AI Creative Studio</h1>
  <p><strong>Generate campaign-ready ad creatives instantly with Gemini 2.5 AI</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Gemini_2.5-Flash-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  </p>

  <p>
    <a href="#-demo">Demo</a> •
    <a href="#-features">Features</a> •
    <a href="#-how-it-works">How It Works</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-tech-stack">Tech Stack</a>
  </p>

  <br />
</div>

---

## 🎬 Demo

<div align="center">
  <img src="screenshots/hero.png" alt="AdAPT UI Screenshot" width="100%" />
</div>

> Upload a reference ad + your product → AI generates a new campaign-ready creative instantly.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Reference-Based Generation** | Upload any "winning" ad as a reference — Gemini analyzes its composition, lighting, and style |
| 📦 **Product Swap** | Drop in your product image — AI matches perspective, shadows, and lighting automatically |
| 🏷️ **Logo Overlay** | Optionally add your brand logo for complete brand-ready output |
| ✍️ **Custom Prompts** | Fine-tune the output with natural language instructions |
| ⬇️ **One-Click Download** | Download generated creatives as high-quality PNG files |
| 🖱️ **Drag & Drop** | Drag and drop images directly — no file picker needed |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |
| 🌙 **Dark Mode** | Premium dark UI with glassmorphism effects |

---

## 🧠 How It Works

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  1. UPLOAD       │    │  2. CUSTOMIZE    │    │  3. GENERATE    │
│                  │    │                  │    │                 │
│  Reference Ad    │───▶│  Custom Prompt   │───▶│  Gemini 2.5     │
│  Product Image   │    │  (Optional)      │    │  Flash Vision   │
│  Logo (Optional) │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

1. **Upload** your reference ad (the "winning" layout) and product image
2. **Customize** with an optional prompt to guide style, mood, or details
3. **Generate** — Gemini analyzes the reference composition and creates a new ad with your product seamlessly integrated

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- A **Google Gemini API Key** ([Get one free](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/said-bay/adapt---ai-creative-studio.git
cd adapt---ai-creative-studio

# Install dependencies
npm install

# Set up your API key
cp .env.example .env.local
# Edit .env.local and add your Gemini API key
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🏗️ Architecture

```
adapt---ai-creative-studio/
├── index.html              # Entry point with SEO meta tags
├── index.css               # Custom animations & styles
├── index.tsx               # React root mount
├── App.tsx                 # Main application layout
├── types.ts                # TypeScript interfaces & enums
├── components/
│   ├── FileUploader.tsx    # Drag & drop image uploader with validation
│   └── ResultViewer.tsx    # AI output display with loading states
├── services/
│   └── geminiService.ts    # Gemini 2.5 API integration
├── utils/
│   └── fileHelpers.ts      # File processing & base64 utilities
├── vite.config.ts          # Vite configuration
└── .env.example            # Environment variables template
```

### Key Design Decisions

- **Gemini 2.5 Flash (Image model)** — Chosen for its ability to generate images while understanding multi-image context (reference ad + product + logo)
- **Client-side processing** — All image processing happens in the browser; only the Gemini API call goes to the server
- **No backend needed** — Direct API calls to Gemini (for production, proxy through a backend to protect the API key)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI component library |
| **TypeScript** | Type safety |
| **Vite 6** | Build tool & dev server |
| **Gemini 2.5 Flash** | AI image generation |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icon system |

---

## 🌟 Use Cases

- **Performance Marketers** — Quickly test product variations on proven ad layouts
- **Social Media Managers** — Generate platform-ready creatives in seconds
- **Small Business Owners** — Create professional ads without a design team
- **A/B Testing** — Generate multiple variations from the same reference for split testing

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>
    <sub>Built with ❤️ by <strong>Said</strong></sub>
  </p>
  <p>
    <sub>Powered by <a href="https://ai.google.dev/">Google Gemini</a></sub>
  </p>
</div>
