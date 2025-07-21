
export interface MenuItem {
  image?: string;
  name: string;
  description: string;
  price?: string; // Optional price display
}

export interface FranchiseTier {
  level: string;
  name: string;
  coreBenefit: string;
  requirements: string;
  biUsage: string;
  territoryProtection: string;
  premium: string;
  benefits: string;
  benefitsDetails?: string[]; // Added optional property
}

export interface SuccessStory {
  id: string;
  title: string;
  image?: string;
  quote: string;
  franchisee: string;
  age?: number;
  metrics: {
    label: string;
    value: string;
  }[];
}