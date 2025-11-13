import React from 'react';
import { Goal, GoalTimeHorizon } from '../types';

interface Props {
    category: GoalTimeHorizon;
    goals: Goal[];
    onGoalsChange: (category: GoalTimeHorizon, updatedGoals: Goal[]) => void;
}

const GoalInputGroup: React.FC<Props> = ({ category, goals, onGoalsChange }) => {
    
    const handleAddGoal = () => {
        const newGoal: Goal = {
            id: Date.now().toString(),
            description: '',
            amount: 0,
            timeframe: '',
            category: category,
        };
        onGoalsChange(category, [...goals, newGoal]);
    };

    const handleRemoveGoal = (id: string) => {
        onGoalsChange(category, goals.filter(goal => goal.id !== id));
    };

    const handleGoalChange = (id: string, field: keyof Omit<Goal, 'id' | 'category'>, value: string | number) => {
        const updatedGoals = goals.map(goal => 
            goal.id === id ? { ...goal, [field]: value } : goal
        );
        onGoalsChange(category, updatedGoals);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">{category}</h2>
            <div className="space-y-4">
                {goals.map((goal, index) => (
                    <div key={goal.id} className="grid grid-cols-1 md:grid-cols-8 gap-3 items-center bg-slate-50 p-3 rounded-md">
                        <div className="md:col-span-3">
                            {index === 0 && <label className="text-base font-medium text-slate-600">תיאור המטרה</label>}
                            <input
                                type="text"
                                value={goal.description}
                                onChange={(e) => handleGoalChange(goal.id, 'description', e.target.value)}
                                placeholder="לדוגמה: חופשה בתאילנד"
                                className="w-full mt-1 p-2 border bg-white border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                             {index === 0 && <label className="text-base font-medium text-slate-600">סכום נדרש (ש"ח)</label>}
                            <input
                                type="number"
                                value={goal.amount}
                                onChange={(e) => handleGoalChange(goal.id, 'amount', Number(e.target.value))}
                                placeholder="25,000"
                                className="w-full mt-1 p-2 border bg-white border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            {index === 0 && <label className="text-base font-medium text-slate-600">מועד</label>}
                            <input
                                type="text"
                                value={goal.timeframe}
                                onChange={(e) => handleGoalChange(goal.id, 'timeframe', e.target.value)}
                                placeholder="לדוגמה: 18 חודשים"
                                className="w-full mt-1 p-2 border bg-white border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="md:col-span-1 flex items-end justify-center h-full">
                            <button
                                type="button"
                                onClick={() => handleRemoveGoal(goal.id)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-10 h-10 flex items-center justify-center mt-1 md:mt-0"
                                aria-label="Remove goal"
                            >
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <button
                    type="button"
                    onClick={handleAddGoal}
                    className="flex items-center gap-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    הוסף מטרה
                </button>
            </div>
        </div>
    );
};

export default GoalInputGroup;
