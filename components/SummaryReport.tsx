
import React, { useState, useEffect } from 'react';
import { FinancialPlan, UserData } from '../types';
import { generateSummaryWithGemini } from '../services/geminiService';

interface Props {
  plan: FinancialPlan;
  userData: UserData;
  onBack: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', minimumFractionDigits: 0 }).format(amount);
};

const SummaryCard: React.FC<{title: string; children: React.ReactNode; className?: string}> = ({ title, children, className }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border border-slate-200 ${className}`}>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">{title}</h2>
        {children}
    </div>
);

const SummaryReport: React.FC<Props> = ({ plan, userData, onBack }) => {
    const [geminiSummary, setGeminiSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSummary = async () => {
            setIsLoading(true);
            const summary = await generateSummaryWithGemini(userData, plan);
            setGeminiSummary(summary);
            setIsLoading(false);
        };
        fetchSummary();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plan, userData]);

    const savingsGapColor = plan.savingsGap > 0 ? 'text-red-600' : 'text-green-600';

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center text-slate-900">סיכום התוכנית הפיננסית</h1>
            
            <SummaryCard title="תובנות מ-Gemini">
                {isLoading ? (
                     <div className="flex items-center justify-center h-24">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className="ms-3 text-slate-600">מעבד את הנתונים ומפיק המלצות...</p>
                    </div>
                ) : (
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{geminiSummary}</p>
                )}
            </SummaryCard>


            <SummaryCard title="סיכום פיננסי">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-slate-100 p-4 rounded-lg">
                        <p className="text-sm text-slate-600">חיסכון חודשי קיים</p>
                        <p className="text-2xl font-bold text-slate-800">{formatCurrency(userData.currentMonthlySavings)}</p>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                        <p className="text-sm text-slate-600">חיסכון חודשי דרוש</p>
                        <p className="text-2xl font-bold text-indigo-600">{formatCurrency(plan.totalRequiredMonthlySavings)}</p>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                        <p className="text-sm text-slate-600">פער לגישור</p>
                        <p className={`text-2xl font-bold ${savingsGapColor}`}>{formatCurrency(plan.savingsGap)}</p>
                    </div>
                </div>
            </SummaryCard>

            <SummaryCard title="פירוט המטרות וההמלצות">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-3 text-sm font-semibold tracking-wide text-slate-900">תיאור המטרה</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-slate-900">סכום נדרש</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-slate-900">טווח זמן</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-slate-900">חיסכון חודשי</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-slate-900">אפיק השקעה מומלץ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {plan.goalRecommendations.map(goal => (
                                <tr key={goal.id} className="bg-white hover:bg-slate-50">
                                    <td className="p-3 text-slate-800 font-medium">{goal.description}</td>
                                    <td className="p-3 text-slate-700">{formatCurrency(goal.amount)}</td>
                                    <td className="p-3 text-slate-700">{goal.timeframe}</td>
                                    <td className="p-3 text-indigo-600 font-semibold">{formatCurrency(goal.monthlyContribution)}</td>
                                    <td className="p-3 text-slate-700">{goal.suggestedInvestment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SummaryCard>
            
            <div className="flex justify-center pt-6">
                <button onClick={onBack} className="bg-slate-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-300 text-lg shadow-lg">
                    חזרה לטופס
                </button>
            </div>
        </div>
    );
};

export default SummaryReport;
