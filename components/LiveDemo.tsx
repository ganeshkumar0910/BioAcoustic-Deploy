
import React, { useState, useRef, useEffect } from 'react';
import { simulatePrediction } from '../services/geminiService';

const LiveDemo: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [detections, setDetections] = useState<any[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyzer = audioCtx.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      
      audioContextRef.current = audioCtx;
      analyzerRef.current = analyzer;

      const updateLevel = () => {
        const dataArray = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average);
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

      // Simulate a detection every few seconds
      const interval = setInterval(async () => {
        const pred = await simulatePrediction("Simulate a random bird sound or environmental noise detection in a forest environment.");
        setDetections(prev => [
          { ...pred, time: new Date().toLocaleTimeString() },
          ...prev.slice(0, 4)
        ]);
      }, 4000);

      (window as any)._detectionInterval = interval;

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Please allow microphone access to see the simulation.");
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    if ((window as any)._detectionInterval) clearInterval((window as any)._detectionInterval);
    setAudioLevel(0);
  };

  useEffect(() => {
    return () => stopListening();
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Inference Simulator</h2>
          <p className="text-slate-600 mb-8">
            This simulator demonstrates the data flow from your microphone (edge capture) to our "virtual" 
            cloud endpoint (powered by Gemini). Observe how audio levels fluctuate and predictions return asynchronously.
          </p>
          
          <div className="bg-slate-900 rounded-2xl p-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>

            <div className="relative">
              <div 
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening ? 'bg-emerald-500/20' : 'bg-slate-800'
                }`}
                style={{ transform: `scale(${1 + audioLevel / 200})` }}
              >
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
                    isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}
                >
                  {isListening ? (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" /></svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <p className={`text-sm font-medium ${isListening ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isListening ? 'Streaming Audio to Virtual Endpoint...' : 'Ready to capture live bio-acoustics'}
              </p>
              {isListening && (
                <div className="mt-4 flex items-center justify-center space-x-1 h-8">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-emerald-500 rounded-full transition-all duration-100" 
                      style={{ height: `${Math.random() * audioLevel * 1.5 + 4}px` }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-96">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Inference Feed</h3>
          <div className="space-y-4">
            {detections.length === 0 ? (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 text-sm">
                Awaiting first inference result...
              </div>
            ) : (
              detections.map((d, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm animate-slide-in">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{d.time}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      d.threatLevel === 'High' ? 'bg-red-100 text-red-600' : 
                      d.threatLevel === 'Medium' ? 'bg-amber-100 text-amber-600' : 
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {d.threatLevel} Threat
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800">{d.species}</h4>
                  <p className="text-xs text-slate-500 mt-1">{d.reasoning}</p>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${d.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{(d.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
