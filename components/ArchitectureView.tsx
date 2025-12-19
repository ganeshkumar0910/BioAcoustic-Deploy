
import React from 'react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Real-Time Acoustic Architecture</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Deploying a bird sound or threat detection model requires a specialized low-latency pipeline. 
            Unlike standard image classification, audio processing involves continuous temporal features 
            that must be analyzed in overlapping windows.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg font-bold">1</div>
              <div>
                <h4 className="font-semibold text-slate-800">Edge Capture</h4>
                <p className="text-sm text-slate-500">IOT sensors or mobile devices capture raw PCM audio at 16kHz-44.1kHz.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg font-bold">2</div>
              <div>
                <h4 className="font-semibold text-slate-800">Chunking & WebSocket Stream</h4>
                <p className="text-sm text-slate-500">Data is buffered into 500ms-1s chunks and sent via WebSockets or gRPC for real-time throughput.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg font-bold">3</div>
              <div>
                <h4 className="font-semibold text-slate-800">Spectrogram Transformation</h4>
                <p className="text-sm text-slate-500">On the server, audio is converted to Log-Mel Spectrograms using STFT before being fed to a CNN or Transformer.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-slate-900 rounded-3xl p-8 overflow-hidden min-h-[400px] flex items-center justify-center">
          <svg viewBox="0 0 500 400" className="w-full h-full text-white">
            {/* Edge Device */}
            <rect x="20" y="150" width="80" height="100" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
            <text x="60" y="270" textAnchor="middle" fill="#10b981" fontSize="12" className="font-medium">Edge Sensor</text>
            
            {/* Pipeline Arrows */}
            <path d="M100 200 L180 200" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <circle cx="140" cy="200" r="4" fill="#10b981">
              <animate attributeName="cx" from="100" to="180" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Cloud Endpoint */}
            <rect x="180" y="100" width="140" height="200" rx="12" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
            <text x="250" y="320" textAnchor="middle" fill="#3b82f6" fontSize="12" className="font-medium">ML Inference Engine</text>
            
            {/* Feature Extraction Node */}
            <rect x="195" y="120" width="110" height="30" rx="4" fill="#3b82f6" fillOpacity="0.4" />
            <text x="250" y="140" textAnchor="middle" fill="white" fontSize="10">Pre-processing</text>
            
            {/* Model Node */}
            <rect x="195" y="165" width="110" height="70" rx="4" fill="#3b82f6" fillOpacity="0.6" />
            <text x="250" y="200" textAnchor="middle" fill="white" fontSize="10">Deep Neural Net</text>
            <path d="M210 215 Q250 185 290 215" stroke="white" strokeWidth="1" fill="none" />

            {/* Return Arrow */}
            <path d="M320 200 L400 200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            
            {/* Dashboard */}
            <rect x="400" y="150" width="80" height="100" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
            <text x="440" y="270" textAnchor="middle" fill="#f59e0b" fontSize="12" className="font-medium">Admin Alerts</text>
          </svg>
          
          <div className="absolute top-4 left-4 flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Live Flow Visualization</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
