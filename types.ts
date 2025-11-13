
export enum GoalTimeHorizon {
  RECURRING = 'מטרות מחזוריות',
  SHORT = 'מטרות לטווח קצר (0-3 שנים)',
  MEDIUM = 'מטרות לטווח בינוני (3-8 שנים)',
  LONG = 'מטרות לטווח ארוך (8-15 שנים)',
  VERY_LONG = 'מטרות לטווח ארוך מאוד (15+ שנים)',
}

export interface Goal {
  id: string;
  description: string;
  amount: number;
  timeframe: string;
  category: GoalTimeHorizon;
}

export interface FinancialPlan {
  totalRequiredMonthlySavings: number;
  savingsGap: number;
  cashFlow: {
    [key in GoalTimeHorizon]?: number;
  };
  goalRecommendations: Array<Goal & { monthlyContribution: number; suggestedInvestment: string }>;
}

export interface UserData {
  goals: {
    [key in GoalTimeHorizon]: Goal[];
  };
  currentMonthlySavings: number;
  availableCapital: number;
}
