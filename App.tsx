
import React, { useState } from 'react';
import FinancialGoalForm from './components/FinancialGoalForm';
import SummaryReport from './components/SummaryReport';
import { UserData, FinancialPlan } from './types';
import { generateFinancialPlan } from './services/financialPlanner';

const App: React.FC = () => {
  const [view, setView] = useState<'form' | 'summary'>('form');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [plan, setPlan] = useState<FinancialPlan | null>(null);

  const handleFormSubmit = (data: UserData) => {
    const calculatedPlan = generateFinancialPlan(data);
    setUserData(data);
    setPlan(calculatedPlan);
    setView('summary');
  };
  
  const handleBackToForm = () => {
      setView('form');
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4">
             <div className="bg-gray-800 p-2 rounded-lg">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2.5 17.5L7.5 11.5L11.5 14.5L16.5 6.5L21.5 13.5" />
                    <path d="M2.5 7.5H21.5" />
                    <path d="M14.5 17.5H21.5" />
                    <path d="M2.5 17.5H9.5" />
                </svg>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">FUTURE</h1>
              <p className="text-lg text-slate-600">מתכננים את העתיד הפיננסי, בפשטות.</p>
            </div>
          </div>
        </header>

        <main>
            {view === 'form' && <FinancialGoalForm onSubmit={handleFormSubmit} initialData={userData} />}
            {view === 'summary' && plan && userData && <SummaryReport plan={plan} userData={userData} onBack={handleBackToForm} />}
        </main>
      </div>
    </div>
  );
};

export default App;
