
import React, { useState } from 'react';
import { AppTab } from './types';
import Header from './components/Header';
import ArchitectureView from './components/ArchitectureView';
import PipelineView from './components/PipelineView';
import LiveDemo from './components/LiveDemo';
import AIExpertView from './components/AIExpertView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.ARCHITECTURE);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.ARCHITECTURE:
        return <ArchitectureView />;
      case AppTab.PIPELINE:
        return <PipelineView />;
      case AppTab.DEMO:
        return <LiveDemo />;
      case AppTab.EXPERT:
        return <AIExpertView />;
      default:
        return <ArchitectureView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {renderContent()}
        </div>
      </main>
      <footer className="bg-slate-900 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-400">
          BioAcoustic ML Deployer © 2024 - Built with Gemini AI & React
        </div>
      </footer>
    </div>
  );
};

export default App;
