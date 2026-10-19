import { SubscriptionPlan } from '@/types/pricing';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    mealsPerMonth: 5,
    totalPrice: 1450,
    pricePerMeal: 290,
    features: [
      'Free delivery across Mumbai hubs',
      'Pause or cancel anytime',
      'Choose meals every week',
      'Macro certified nutrition',
    ],
  },
  {
    id: 'regular',
    name: 'Regular',
    mealsPerMonth: 10,
    totalPrice: 2700,
    pricePerMeal: 270,
    isPopular: true,
    features: [
      'Free delivery across Mumbai hubs',
      'Pause or cancel anytime',
      'Choose meals every week',
      'Macro certified nutrition',
      'Priority delivery time slot',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    mealsPerMonth: 20,
    totalPrice: 5000,
    pricePerMeal: 250,
    features: [
      'Free delivery across Mumbai hubs',
      'Pause or cancel anytime',
      'Choose meals every week',
      'Macro certified nutrition',
      'Priority delivery time slot',
      'Free monthly meal replacement',
    ],
  },
];
