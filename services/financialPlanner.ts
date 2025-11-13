
import { UserData, FinancialPlan, GoalTimeHorizon } from '../types';
import { INVESTMENT_SUGGESTIONS } from '../constants';

const parseTimeframeToMonths = (timeframe: string): number => {
  if (timeframe.toLowerCase().includes('כל שנה')) return 12;
  if (timeframe.toLowerCase().includes('חצי שנה')) return 6;
  
  const parts = timeframe.split(' ');
  const value = parseFloat(parts[0].replace(/,/g, ''));
  if (isNaN(value)) return 12;

  if (parts.some(p => p.includes('חודש'))) {
    return value;
  }
  if (parts.some(p => p.includes('שנ'))) {
    return value * 12;
  }
  return value; 
};

export const generateFinancialPlan = (userData: UserData): FinancialPlan => {
  let totalRequiredMonthlySavings = 0;
  const cashFlow: { [key in GoalTimeHorizon]?: number } = {};
  const goalRecommendations: FinancialPlan['goalRecommendations'] = [];

  Object.values(userData.goals).forEach(goalList => {
    goalList.forEach(goal => {
      const months = parseTimeframeToMonths(goal.timeframe);
      if (months > 0 && goal.amount > 0) {
        const monthlyContribution = Math.ceil(goal.amount / months);
        totalRequiredMonthlySavings += monthlyContribution;

        if (!cashFlow[goal.category]) {
          cashFlow[goal.category] = 0;
        }
        cashFlow[goal.category]! += monthlyContribution;

        goalRecommendations.push({
          ...goal,
          monthlyContribution,
          suggestedInvestment: INVESTMENT_SUGGESTIONS[goal.category],
        });
      }
    });
  });

  const savingsGap = totalRequiredMonthlySavings - userData.currentMonthlySavings;

  return {
    totalRequiredMonthlySavings,
    savingsGap,
    cashFlow,
    goalRecommendations,
  };
};
