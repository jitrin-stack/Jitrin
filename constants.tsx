
import { RiskLevel, ApiKey } from './types';

export const APPLICATIONS = ['PaySolutions', 'Kulap', 'GroupFin', 'AssetSafe'];

export const MOCK_API_KEYS: ApiKey[] = [
  {
    id: '1',
    application: 'PaySolutions',
    name: 'Production Backend',
    key: 'sk_live_8f23...a9b1',
    status: 'Active',
    createdAt: '2023-10-15 09:30:00'
  },
  {
    id: '2',
    application: 'Kulap',
    name: 'Staging API',
    key: 'sk_test_4d12...c2e4',
    status: 'Revoked',
    createdAt: '2023-11-02 14:20:00'
  }
];

export const SOURCE_DATA: Record<string, any[]> = {
  '1234567890': [
    { source: 'CCIB', riskCategory: 'Blacklist (บัญชีม้าดำ)', description: 'A police report has been filed by a victim.', level: RiskLevel.HIGH },
    { source: 'AMLO', riskCategory: 'Dark Gray (บัญชีม้า เทาเข้ม)', description: 'Account is involved in an active money laundering case.', level: RiskLevel.HIGH }
  ],
  '0812345678': [
    { source: 'CFR', riskCategory: 'Brown (บัญชีม้าน้ำตาล)', description: 'Suspicious transaction patterns detected.', level: RiskLevel.MEDIUM }
  ]
};
