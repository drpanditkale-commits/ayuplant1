
export interface PlantDetails {
  localName: string;
  latinName: string;
  otherNames: string[];
  family: string;
  rasa: string[];
  virya: string;
  vipak: string;
  guna: string[];
  prabhava: string;
  karma: string[];
  indications: string[];
  usedParts: string[];
  dosage: string;
  description: string;
}

export type AppLanguage = 'English' | 'Hindi' | 'Sanskrit' | 'Marathi' | 'Gujarati' | 'Tamil' | 'Telugu' | 'Bengali' | 'Malayalam';

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  data: PlantDetails | null;
  imageUrl: string | null;
}
