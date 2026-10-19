export interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  rating: number; // 1-5
  age?: number;
  locality?: string;
  role?: string;
  avatar?: string;
  dishName?: string;
  dishImage?: string;
  bgColor?: string;
  borderColor?: string;
  rotationDeg?: number;
  initials?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}
