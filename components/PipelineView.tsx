
import React from 'react';

const PipelineView: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">Deployment & Inference Pipeline</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">1. The Endpoint</h3>
            <p className="text-slate-600 text-sm">
              Use managed services like <strong>AWS SageMaker</strong> or <strong>Google Vertex AI</strong>. 
              The model is wrapped in a container (often FastAPI or Flask) and hosted on GPU instances (like G4dn) to ensure inference under 100ms.
            </p>
            <div className="mt-4 bg-slate-900 p-3 rounded-lg font-mono text-[10px] text-emerald-400">
              # Example Config<br/>
              deployment_type: realtime<br/>
              min_instances: 1<br/>
              autoscaling: latency_based
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-emerald-900 mb-2">2. Audio Serialization</h3>
            <p className="text-slate-600 text-sm">
              Audio data is high bandwidth. To send it real-time:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Convert to 16-bit PCM Mono</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Base64 Encode or Binary Stream</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Metadata: Timestamp, Location</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-amber-900 mb-2">3. Real-Time Feedback</h3>
            <p className="text-slate-600 text-sm">
              The model returns a probability distribution. For threat detection, a "thresholding" logic is applied. 
              If probability {">"} 0.85, an immediate push notification is triggered to rangers via Firebase or AWS SNS.
            </p>
            <div className="mt-4 flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200">
              <span className="text-xs font-bold text-amber-800">Alert Triggered!</span>
              <span className="text-[10px] bg-red-500 text-white px-2 py-1 rounded">High Confidence</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Technical Description of the Handshake</h3>
        <p className="text-slate-600 leading-relaxed">
          The client initiates a <strong>WebSocket connection</strong> to the server. Every 500ms, a buffer of audio bytes is sent. 
          The server maintains a "rolling state" for each client. This is crucial because bird calls can span across chunks. 
          The server processes the chunk, runs inference, and sends back a JSON object containing the detected species, 
          confidence score, and a "Threat Level" flag (e.g., detecting a chainsaw vs a woodpecker).
        </p>
      </div>
    </div>
  );
};

export default PipelineView;
