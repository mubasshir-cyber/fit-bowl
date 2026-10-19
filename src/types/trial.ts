import { DietaryType } from './menu';

export type DeliveryHub = 'andheri' | 'bandra' | 'powai' | 'lower-parel' | 'other';

export interface TrialFormData {
  fullName: string;
  mobile: string;
  deliveryArea: DeliveryHub | '';
  foodPreference: DietaryType;
  deliveryDate: string; // YYYY-MM-DD
  customAreaNotes?: string;
  selectedBowlId?: string;
}

export interface FormValidationErrors {
  fullName?: string;
  mobile?: string;
  deliveryArea?: string;
  foodPreference?: string;
  deliveryDate?: string;
}
