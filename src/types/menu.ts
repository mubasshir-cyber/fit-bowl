export type DietaryType = 'veg' | 'non-veg';
export type MenuFilterType = 'all' | 'veg' | 'non-veg';

export interface NutritionInfo {
  calories: number; // in kcal
  protein: number;  // in grams
  carbs?: number;   // in grams
  fats?: number;    // in grams
  fiber?: number;   // in grams
}

export interface BowlItem {
  id: string;
  name: string;
  type: DietaryType;
  nutrition: NutritionInfo;
  ingredients: string;
  ingredientList?: string[];
  image: string;
  isFridayOnly?: boolean;
  detailedDescription?: string;
}
