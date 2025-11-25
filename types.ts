export interface FinancialItem {
  name: string;
  value: number;
  description: string;
}

export interface CostItem {
  category: string;
  min: number;
  max: number;
}

export enum SectionId {
  HERO = 'hero',
  VALUE_PROP = 'value-prop',
  AUDIENCE = 'audience',
  MONETIZATION = 'monetization',
  FEATURES = 'features',
  FINANCIALS = 'financials',
  MARKETING = 'marketing',
  INFRA = 'infra',
  TEAM = 'team',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}