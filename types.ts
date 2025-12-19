
export enum AppTab {
  ARCHITECTURE = 'Architecture',
  PIPELINE = 'Pipeline',
  DEMO = 'Live Demo',
  EXPERT = 'AI Expert'
}

export interface DeploymentStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PredictionResult {
  species: string;
  confidence: number;
  threatLevel: 'Low' | 'Medium' | 'High';
  timestamp: string;
}
