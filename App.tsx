
import React, { useState, useEffect } from 'react';
import { AppLanguage, SearchState } from './types';
import { getPlantInfo, generatePlantImage } from './services/geminiService';
import SearchBar from './components/SearchBar';
import PlantCard from './components/PlantCard';

const LANGUAGES: AppLanguage[] = [
  'English', 'Hindi', 'Sanskrit', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Bengali', 'Malayalam'
];

const App: React.FC = () => {
  const [language, setLanguage] = useState<AppLanguage>('English');
  const [state, setState] = useState<SearchState>({
    isLoading: false,
    error: null,
    data: null,
    imageUrl: null,
  });

  const handleSearch = async (query: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, data: null, imageUrl: null }));
    
    try {
      // Step 1: Get plant details
      const plantData = await getPlantInfo(query, language);
      setState(prev => ({ ...prev, data: plantData }));

      // Step 2: Generate plant image in background
      try {
        const imageUrl = await generatePlantImage(plantData.latinName);
        setState(prev => ({ ...prev, imageUrl, isLoading: false }));
      } catch (imgError) {
        console.error("Image generation failed:", imgError);
        setState(prev => ({ ...prev, isLoading: false })); // Still show data even if image fails
      }
    } catch (error) {
      console.error("Search failed:", error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "We couldn't find information for that plant. Please try a more specific name or check the spelling." 
      }));
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="relative bg-emerald-900 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800/50 border border-emerald-700/50 rounded-full text-emerald-300 text-sm font-medium mb-4">
            <i className="fas fa-leaf animate-bounce"></i>
            <span>AI-Powered Ayurvedic Encyclopedia</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            AyurPlant <span className="text-emerald-400 italic">Explorer</span>
          </h1>
          <p className="text-emerald-100/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Discover the ancient wisdom of medicinal herbs. Enter a local or Latin name to reveal pharmacological properties and traditional applications.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="space-y-12">
          {/* Search & Language Bar */}
          <div className="sticky top-4 z-50 space-y-4">
             <SearchBar onSearch={handleSearch} isLoading={state.isLoading} />
             
             <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm font-semibold text-stone-500 mr-2 uppercase tracking-widest">Select Language:</span>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      language === lang 
                        ? 'bg-emerald-600 text-white shadow-md scale-105' 
                        : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-100'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
             </div>
          </div>

          {/* Results Area */}
          <div className="min-h-[400px]">
            {state.error && (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mb-6 border border-red-100">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-2">Oops! Something went wrong</h3>
                <p className="text-stone-500 max-w-md mx-auto">{state.error}</p>
                <button 
                  onClick={() => setState(s => ({ ...s, error: null }))}
                  className="mt-6 text-emerald-600 font-semibold hover:underline"
                >
                  Clear search and try again
                </button>
              </div>
            )}

            {!state.data && !state.isLoading && !state.error && (
              <div className="flex flex-col items-center justify-center py-24 text-center text-stone-300">
                <i className="fas fa-seedling text-8xl mb-8 opacity-20"></i>
                <p className="text-xl font-serif italic text-stone-400">Search for herbs like 'Holy Basil' or 'Curcuma Longa' to begin your journey.</p>
              </div>
            )}

            {state.data && (
              <PlantCard data={state.data} imageUrl={state.imageUrl} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-stone-200 py-10 text-center">
        <p className="text-stone-400 text-sm">
          &copy; {new Date().getFullYear()} AyurPlant Explorer. Powered by Google Gemini AI.
        </p>
        <p className="text-stone-300 text-xs mt-2 max-w-xl mx-auto px-4">
          Disclaimer: This tool is for educational purposes only. Always consult a qualified Ayurvedic practitioner or physician before using any medicinal plants for treatment.
        </p>
      </footer>
    </div>
  );
};

export default App;
