
export enum RiskLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  CLEAR = 'CLEAR'
}

export interface VerificationResult {
  source: string;
  riskCategory: string;
  description: string;
  level: RiskLevel;
}

export interface ApiKey {
  id: string;
  application: string;
  name: string;
  key: string;
  status: 'Active' | 'Revoked';
  createdAt: string;
}

export type ViewState = 'Verification' | 'ApiManagement';
