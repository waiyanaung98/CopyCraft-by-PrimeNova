import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { FrameworkSelector } from './components/FrameworkSelector';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { BrandManager } from './components/BrandManager';
import { Language, Framework, Tone, ContentRequest, ContentPillar, BrandProfile, AppMode } from './types';
import { generateCopy } from './services/geminiService';
import { TRANSLATIONS, DEFAULT_BRANDS, MODE_LABELS, COPY_FRAMEWORKS_LIST, SCRIPT_FRAMEWORKS_LIST } from './constants';
import { PenTool, Video } from 'lucide-react';

const App: React.FC = () => {
  // UI Language default to English
  const [uiLanguage] = useState<Language>(Language.EN);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  // Brand State
  const [brands, setBrands] = useState<BrandProfile[]>(DEFAULT_BRANDS);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  
  // Form Data
  const [formData, setFormData] = useState<ContentRequest>({
    mode: AppMode.COPYWRITING,
    topic: '',
    description: '',
    framework: Framework.AIDA,
    pillar: ContentPillar.PROMOTIONAL,
    language: Language.EN,
    tone: Tone.PROFESSIONAL,
    targetAudience: ''
  });

  // Scroll to results when generated
  const resultRef = useRef<HTMLDivElement>(null);

  // Effect: Handle Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Effect: When brand changes, update formData defaults
  useEffect(() => {
    if (selectedBrandId) {
      const brand = brands.find(b => b.id === selectedBrandId);
      if (brand) {
        setFormData(prev => ({
          ...prev,
          tone: brand.defaultTone,
          targetAudience: brand.defaultAudience,
          brand: brand // Attach brand object to request for AI context
        }));
      }
    } else {
      // Reset brand context if deselected
      setFormData(prev => ({ ...prev, brand: undefined }));
    }
  }, [selectedBrandId, brands]);

  const handleAddBrand = (newBrand: BrandProfile) => {
    setBrands(prev => [...prev, newBrand]);
    setSelectedBrandId(newBrand.id); // Auto select the new brand
  };

  const handleDeleteBrand = (brandId: string) => {
    setBrands(prev => prev.filter(b => b.id !== brandId));
    if (selectedBrandId === brandId) {
      setSelectedBrandId(null);
    }
  };

  const handleModeChange = (newMode: AppMode) => {
    setFormData(prev => ({
      ...prev,
      mode: newMode,
      // Reset framework to the first available one for the new mode to avoid type mismatch
      framework: newMode === AppMode.SCRIPTWRITING ? SCRIPT_FRAMEWORKS_LIST[0] : COPY_FRAMEWORKS_LIST[0]
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedContent(null); // Clear previous while loading
    
    try {
      const result = await generateCopy(formData);
      setGeneratedContent(result);
      
      // Scroll to result after a brief delay for render
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setGeneratedContent(null);
    setFormData(prev => ({ 
      ...prev, 
      topic: '', 
      description: '',
      // Keep target audience if brand is selected, otherwise clear
      targetAudience: selectedBrandId ? prev.targetAudience : ''
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex flex-col font-sans transition-colors duration-300">
      <Header 
        currentLang={uiLanguage} 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />

      <main className="flex-grow w-full px-2 py-8">
        
        {/* Inputs Container - Centered with max width */}
        <div className="max-w-3xl mx-auto space-y-8 mb-12 px-2">
          
          {/* Mode Switcher */}
          <section className="flex justify-center mb-6">
            <div className="bg-white dark:bg-[#1E2A38] p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm inline-flex">
              <button
                onClick={() => handleModeChange(AppMode.COPYWRITING)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  formData.mode === AppMode.COPYWRITING
                  ? 'bg-[#31d190] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <PenTool size={16} />
                {MODE_LABELS[AppMode.COPYWRITING][uiLanguage]}
              </button>
              <button
                onClick={() => handleModeChange(AppMode.SCRIPTWRITING)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  formData.mode === AppMode.SCRIPTWRITING
                  ? 'bg-[#31d190] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Video size={16} />
                {MODE_LABELS[AppMode.SCRIPTWRITING][uiLanguage]}
              </button>
            </div>
          </section>

          {/* Brand Manager Section */}
          <section>
            <BrandManager 
              brands={brands}
              selectedBrandId={selectedBrandId}
              onSelectBrand={setSelectedBrandId}
              onAddBrand={handleAddBrand}
              onDeleteBrand={handleDeleteBrand}
              currentLang={uiLanguage}
            />
          </section>

          {/* Framework Selection */}
          <section>
            <FrameworkSelector 
              mode={formData.mode}
              selected={formData.framework} 
              onSelect={(fw) => setFormData(prev => ({ ...prev, framework: fw }))}
              currentLang={uiLanguage}
            />
          </section>

          {/* Input Form */}
          <section>
            <InputForm 
              request={formData} 
              onChange={setFormData} 
              onSubmit={handleGenerate}
              isLoading={loading}
              currentUiLang={uiLanguage}
              selectedBrand={brands.find(b => b.id === selectedBrandId)}
            />
          </section>
        </div>

        {/* Output Container - Full Width (99%) */}
        <div ref={resultRef} className="w-full max-w-[99%] mx-auto">
          {generatedContent ? (
            <div className="animate-slide-up">
              <OutputDisplay 
                content={generatedContent} 
                currentUiLang={uiLanguage}
                outputLang={formData.language}
                onClear={handleClear}
              />
            </div>
          ) : (
            /* Empty State Placeholder */
            <div className="max-w-3xl mx-auto bg-white dark:bg-[#1E2A38] rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed flex flex-col items-center justify-center text-center p-12 text-slate-400 dark:text-slate-500 transition-colors">
              <div className="w-16 h-16 bg-slate-50 dark:bg-[#0f172a] rounded-full flex items-center justify-center mb-4">
                {formData.mode === AppMode.SCRIPTWRITING ? (
                   <Video className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                ) : (
                   <PenTool className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                )}
              </div>
              <h3 className="text-lg font-medium text-[#1E2A38] dark:text-white mb-2">Ready to Create</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Generated {formData.mode === AppMode.SCRIPTWRITING ? 'script' : 'content'} will appear here in full screen.
              </p>
            </div>
          )}
        </div>

      </main>
      
      {/* Footer with Branding */}
      <footer className="py-6 text-center border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E2A38] mt-auto transition-colors">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Powered by{' '}
          <a 
            href="https://web.facebook.com/PrimeNovaDigitalSolution" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#1E2A38] dark:text-[#31d190] font-bold hover:underline hover:opacity-80 transition-all"
          >
            PrimeNova Digital Solution
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;