import React, { useState } from 'react';
import { UserData, Goal, GoalTimeHorizon } from '../types';
import { GOAL_CATEGORIES, PREFILLED_GOALS } from '../constants';
import GoalInputGroup from './GoalInputGroup';

interface Props {
  onSubmit: (data: UserData) => void;
  initialData?: UserData | null;
}

const FinancialGoalForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [goals, setGoals] = useState<UserData['goals']>(initialData?.goals || PREFILLED_GOALS);
  const [currentMonthlySavings, setCurrentMonthlySavings] = useState<number>(initialData?.currentMonthlySavings || 5000);
  const [availableCapital, setAvailableCapital] = useState<number>(initialData?.availableCapital || 991000);

  const handleGoalsChange = (category: GoalTimeHorizon, updatedGoals: Goal[]) => {
    setGoals(prev => ({ ...prev, [category]: updatedGoals }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      goals,
      currentMonthlySavings,
      availableCapital,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">נתונים נוכחיים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="currentSavings" className="block text-base font-medium text-slate-700 mb-1">חיסכון חודשי קיים (ש"ח)</label>
                    <input
                        type="number"
                        id="currentSavings"
                        value={currentMonthlySavings}
                        onChange={(e) => setCurrentMonthlySavings(Number(e.target.value))}
                        className="w-full p-2 border bg-white border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="לדוגמה: 5000"
                    />
                </div>
                <div>
                    <label htmlFor="availableCapital" className="block text-base font-medium text-slate-700 mb-1">הון עצמי פנוי ונזיל (ש"ח)</label>
                    <input
                        type="number"
                        id="availableCapital"
                        value={availableCapital}
                        onChange={(e) => setAvailableCapital(Number(e.target.value))}
                        className="w-full p-2 border bg-white border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="לדוגמה: 100000"
                    />
                </div>
            </div>
        </div>

      {GOAL_CATEGORIES.map(category => (
        <GoalInputGroup
          key={category}
          category={category}
          goals={goals[category]}
          onGoalsChange={handleGoalsChange}
        />
      ))}

      <div className="flex justify-center pt-6">
        <button type="submit" className="w-full md:w-auto bg-indigo-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 text-lg shadow-lg">
          חשב את התוכנית הפיננסית
        </button>
      </div>
    </form>
  );
};

export default FinancialGoalForm;