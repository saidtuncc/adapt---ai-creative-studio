import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Loader2, AlertCircle, CheckCircle2, Scan, Palette, Layers } from 'lucide-react';
import { GenerationState, GenerationStatus } from '../types';

interface ResultViewerProps {
  state: GenerationState;
}

const loadingSteps = [
  { icon: <Scan size={12} />, text: "Analyzing reference composition..." },
  { icon: <Palette size={12} />, text: "Matching lighting & perspective..." },
  { icon: <Layers size={12} />, text: "Blending product into scene..." },
  { icon: <CheckCircle2 size={12} />, text: "Finalizing creative output..." },
];

export const ResultViewer: React.FC<ResultViewerProps> = ({ state }) => {
  const [activeStep, setActiveStep] = useState(0);

  // Simulate loading steps
  useEffect(() => {
    if (state.status === GenerationStatus.LOADING) {
      setActiveStep(0);
      const interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev < loadingSteps.length - 1) return prev + 1;
          return prev;
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [state.status]);

  const handleDownload = () => {
    if (state.resultImageUrl) {
      const link = document.createElement('a');
      link.href = state.resultImageUrl;
      link.download = `adapt-creative-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleOpenNewTab = () => {
    if (state.resultImageUrl) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>AdAPT Generated Creative</title></head>
            <body style="margin:0;background:#0a0a1a;display:flex;align-items:center;justify-content:center;min-height:100vh;">
              <img src="${state.resultImageUrl}" style="max-width:100%;max-height:100vh;object-fit:contain;" />
            </body>
          </html>
        `);
      }
    }
  };

  return (
    <div className="h-full min-h-[500px] glass-card rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full transition-colors ${state.status === GenerationStatus.SUCCESS ? 'bg-green-400' :
              state.status === GenerationStatus.LOADING ? 'bg-indigo-400 animate-pulse' :
                state.status === GenerationStatus.ERROR ? 'bg-red-400' :
                  'bg-gray-600'
            }`}></span>
          Generated Output
        </h2>
        {state.status === GenerationStatus.SUCCESS && (
          <div className="flex items-center gap-2 animate-fade-in">
            <button
              onClick={handleOpenNewTab}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all hover:bg-white/5"
            >
              <ExternalLink size={12} />
              Open
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-sm shadow-indigo-500/20"
            >
              <Download size={12} />
              Download
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative">

        {/* Idle State */}
        {state.status === GenerationStatus.IDLE && (
          <div className="text-center max-w-xs animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-5 animate-float">
              <ExternalLink size={28} className="text-gray-700" />
            </div>
            <h3 className="text-gray-300 font-semibold text-sm mb-2">Ready to Create</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Upload your reference ad and product image, then click <span className="text-indigo-400">Generate</span> to see the AI magic happen here.
            </p>
          </div>
        )}

        {/* Loading State */}
        {state.status === GenerationStatus.LOADING && (
          <div className="text-center flex flex-col items-center animate-fade-in">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full scale-150"></div>
              <Loader2 className="relative text-indigo-400 animate-spin" size={44} />
            </div>
            <h3 className="text-indigo-300 font-semibold text-sm mb-4">Designing your creative...</h3>

            {/* Loading Steps */}
            <div className="space-y-2.5 text-left">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`loading-step transition-all duration-500 ${index < activeStep ? 'done' : index === activeStep ? 'active' : ''
                    }`}
                >
                  <span className="w-4 flex justify-center">
                    {index < activeStep ? (
                      <CheckCircle2 size={12} />
                    ) : index === activeStep ? (
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                    )}
                  </span>
                  {step.text}
                </div>
              ))}
            </div>

            <p className="text-[10px] text-gray-600 mt-4">
              This usually takes 10-20 seconds
            </p>
          </div>
        )}

        {/* Success State */}
        {state.status === GenerationStatus.SUCCESS && state.resultImageUrl && (
          <div className="relative w-full h-full flex items-center justify-center result-image-container animate-scale-in">
            <img
              src={state.resultImageUrl}
              alt="Generated Creative"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-black/50"
            />
          </div>
        )}

        {/* Error State */}
        {state.status === GenerationStatus.ERROR && (
          <div className="text-center max-w-sm p-6 bg-red-500/5 border border-red-500/10 rounded-xl animate-scale-in">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-3 text-red-400">
              <AlertCircle size={22} />
            </div>
            <h3 className="text-red-300 font-semibold text-sm mb-2">Generation Failed</h3>
            <p className="text-xs text-red-200/60 leading-relaxed">
              {state.errorMessage || "An unexpected error occurred. Please check your inputs and try again."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};