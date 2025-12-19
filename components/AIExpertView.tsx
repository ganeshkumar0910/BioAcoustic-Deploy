
import React, { useState } from 'react';
import { getTechnicalExpertise } from '../services/geminiService';

const AIExpertView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    try {
      const result = await getTechnicalExpertise(query);
      setResponse(result || 'No response found.');
    } catch (err) {
      setResponse('Error connecting to ML Expert. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "How do I optimize the spectrogram window size for bird chirps?",
    "What instance type should I use for real-time GPU inference?",
    "How to handle data drift in environmental acoustics?",
    "Explain the benefits of TFLite for edge deployment."
  ];

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">Consult the ML Expert</h2>
        <p className="text-slate-600 mb-8 text-center">
          Ask specific questions about scaling your audio pipeline, choosing models, or handling noisy environments.
        </p>

        <form onSubmit={handleAsk} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., How can I send audio chunks via WebSockets securely?"
              className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-0 outline-none transition-all pr-16"
            />
            <button
              type="submit"
              disabled={isLoading || !query}
              className="absolute right-3 top-2 bottom-2 bg-emerald-600 text-white px-4 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Ask'}
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setQuery(s)}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {response && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 prose prose-slate max-w-none shadow-inner">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs">AI</div>
              <span className="font-bold text-slate-800">Expert Recommendation</span>
            </div>
            <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIExpertView;
