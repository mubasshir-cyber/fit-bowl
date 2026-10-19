export type PlanId = 'starter' | 'regular' | 'pro';

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  mealsPerMonth: number;
  totalPrice: number;       // in INR
  pricePerMeal: number;     // in INR
  isPopular?: boolean;
  features: string[];
}
