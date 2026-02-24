import React, { useState, useCallback } from 'react';
import { FileUploader } from './components/FileUploader';
import { ResultViewer } from './components/ResultViewer';
import { generateAdCreative } from './services/geminiService';
import { UploadedFile, GenerationState, GenerationStatus } from './types';
import { Sparkles, Layout, Aperture, Info, Upload, Zap, Image, Github, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  // Input States
  const [referenceAd, setReferenceAd] = useState<UploadedFile | undefined>();
  const [productImage, setProductImage] = useState<UploadedFile | undefined>();
  const [logoImage, setLogoImage] = useState<UploadedFile | undefined>();
  const [prompt, setPrompt] = useState<string>("");

  // Generation State
  const [generationState, setGenerationState] = useState<GenerationState>({
    status: GenerationStatus.IDLE,
    resultImageUrl: null,
    errorMessage: null,
  });

  const canGenerate = referenceAd && productImage && generationState.status !== GenerationStatus.LOADING;

  const handleGenerate = useCallback(async () => {
    if (!referenceAd || !productImage) return;

    setGenerationState({
      status: GenerationStatus.LOADING,
      resultImageUrl: null,
      errorMessage: null,
    });

    try {
      const result = await generateAdCreative({
        referenceAd,
        productImage,
        logoImage,
        prompt: prompt.trim() || "Create a professional advertisement suitable for social media.",
      });

      setGenerationState({
        status: GenerationStatus.SUCCESS,
        resultImageUrl: result,
        errorMessage: null,
      });
    } catch (error: any) {
      setGenerationState({
        status: GenerationStatus.ERROR,
        resultImageUrl: null,
        errorMessage: error.message,
      });
    }
  }, [referenceAd, productImage, logoImage, prompt]);

  const steps = [
    {
      icon: <Upload size={20} />,
      title: "Upload Assets",
      description: "Add your reference ad, product image, and optional brand logo.",
    },
    {
      icon: <Aperture size={20} />,
      title: "Customize",
      description: "Fine-tune with custom prompts to guide the AI's creative direction.",
    },
    {
      icon: <Zap size={20} />,
      title: "Generate",
      description: "Gemini analyzes composition, lighting & style to produce a new ad.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white selection:bg-indigo-500/30 relative bg-grid">
      
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a1a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 animate-gradient">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight gradient-text">
                AdAPT
              </span>
              <span className="text-[10px] text-gray-500 -mt-1 tracking-widest uppercase">
                Creative Studio
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex text-xs text-gray-400 border border-white/10 rounded-full px-3 py-1.5 items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Powered by Gemini 2.5
            </span>
            <a
              href="https://github.com/said-bay/adapt---ai-creative-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 hover:bg-white/5"
            >
              <Github size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Hero Section */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
                  ✨ AI-Powered
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 gradient-text leading-tight">
                Creative Studio
              </h1>
              <p className="text-gray-400 max-w-xl text-sm sm:text-base leading-relaxed">
                Automate your creative workflow. Upload a winning reference ad and your product 
                to generate campaign-ready variations instantly with <span className="text-indigo-400 font-medium">Gemini 2.5 Flash</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
          
          {/* LEFT COLUMN: Inputs */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Upload Section */}
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Layout size={16} className="text-indigo-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white text-sm">Reference & Assets</h2>
                  <p className="text-[11px] text-gray-500">Upload your source materials</p>
                </div>
              </div>

              <div className="space-y-4">
                <FileUploader
                  label="1. Reference Ad"
                  subLabel="The 'Winning' ad to adapt"
                  file={referenceAd}
                  onFileChange={setReferenceAd}
                  required
                />

                <FileUploader
                  label="2. Your Product"
                  subLabel="High quality product shot"
                  file={productImage}
                  onFileChange={setProductImage}
                  required
                />

                <FileUploader
                  label="3. Brand Logo"
                  subLabel="Transparent PNG recommended"
                  file={logoImage}
                  onFileChange={setLogoImage}
                />
              </div>
            </div>

            {/* Prompt Section */}
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Aperture size={16} className="text-purple-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white text-sm">Instructions</h2>
                  <p className="text-[11px] text-gray-500">Guide the AI generation</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Custom Prompt <span className="text-gray-600 normal-case tracking-normal">(Optional)</span>
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Make the lighting warmer, focus on the product texture, use a minimal aesthetic..."
                  className="w-full h-28 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all resize-none outline-none"
                />
                <div className="flex gap-2 items-start text-xs text-gray-500 bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                  <Info size={14} className="mt-0.5 shrink-0 text-gray-600" />
                  <p>Gemini automatically analyzes the reference layout. Use this prompt to fine-tune details, mood, or style.</p>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`
                  w-full mt-5 py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide 
                  transition-all duration-300 flex items-center justify-center gap-2.5 btn-shine
                  ${canGenerate 
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] hover:bg-right text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5' 
                    : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
                  }
                `}
              >
                {generationState.status === GenerationStatus.LOADING ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Creative
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Output */}
          <div className="lg:col-span-8">
             <ResultViewer state={generationState} />
          </div>

        </div>

        {/* How It Works Section */}
        <div className="mt-16 mb-8 animate-fade-in-up delay-400" style={{ opacity: 0 }}>
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold gradient-text mb-2">How It Works</h2>
            <p className="text-sm text-gray-500">Three simple steps to create professional ad creatives</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="step-card group">
                <div className="flex items-start gap-3">
                  <div className="step-number">{index + 1}</div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-indigo-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-700 z-10">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <span className="text-sm font-semibold gradient-text">AdAPT</span>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-gray-500">AI Creative Studio</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="tech-badge">⚛️ React 19</span>
              <span className="tech-badge">⚡ Vite</span>
              <span className="tech-badge">🤖 Gemini 2.5</span>
              <span className="tech-badge">🎨 Tailwind CSS</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>Built with ❤️ by Said</span>
              <a
                href="https://github.com/said-bay/adapt---ai-creative-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
              >
                <Github size={14} />
                Source
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;