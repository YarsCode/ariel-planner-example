
import { GoogleGenAI } from "@google/genai";
import { FinancialPlan, UserData } from '../types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', minimumFractionDigits: 0 }).format(amount);
};

export const generateSummaryWithGemini = async (userData: UserData, plan: FinancialPlan): Promise<string> => {
  if (!process.env.API_KEY) {
    return "שגיאה: מפתח ה-API של Gemini אינו מוגדר. לא ניתן ליצור סיכום.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const goalsText = plan.goalRecommendations.map(g => 
    `- ${g.description} (${g.category}): דרוש ${formatCurrency(g.amount)} תוך ${g.timeframe}. חיסכון חודשי מומלץ: ${formatCurrency(g.monthlyContribution)} באפיק ${g.suggestedInvestment}.`
  ).join('\n');

  const prompt = `
    אתה יועץ פיננסי אישי. נתח את התוכנית הפיננסית הבאה וכתוב סיכום קצר, מעודד ומקצועי בעברית.
    התמקד בנקודות המרכזיות: החיסכון הנדרש, הפער הקיים (אם יש), והאסטרטגיה הכללית.
    אל תחזור על כל מטרה ומטרה, אלא תן מבט על. סכם בפסקה אחת או שתיים.
    
    פרטי התוכנית:
    - חיסכון חודשי קיים: ${formatCurrency(userData.currentMonthlySavings)}
    - סך החיסכון החודשי הדרוש להשגת כל המטרות: ${formatCurrency(plan.totalRequiredMonthlySavings)}
    - פער בחיסכון החודשי: ${formatCurrency(plan.savingsGap)}
    - הון עצמי זמין להשקעה: ${formatCurrency(userData.availableCapital)}
    
    רשימת מטרות וחישובים:
    ${goalsText}

    כתוב את הסיכום שלך כאן:
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    return "לא הצלחנו ליצור סיכום אוטומטי. אנא עיין בפרטי התוכנית למטה.";
  }
};
