import { GoalTimeHorizon, Goal } from './types';

export const GOAL_CATEGORIES: GoalTimeHorizon[] = [
  GoalTimeHorizon.RECURRING,
  GoalTimeHorizon.SHORT,
  GoalTimeHorizon.MEDIUM,
  GoalTimeHorizon.LONG,
  GoalTimeHorizon.VERY_LONG,
];

export const INVESTMENT_SUGGESTIONS: { [key in GoalTimeHorizon]: string } = {
  [GoalTimeHorizon.RECURRING]: 'קרן כספית',
  [GoalTimeHorizon.SHORT]: 'השקעה שקלית / קרן כספית',
  [GoalTimeHorizon.MEDIUM]: 'השקעות חוב / הלוואות חברתיות',
  [GoalTimeHorizon.LONG]: 'שוק ההון / פוליסה מנוהלת',
  [GoalTimeHorizon.VERY_LONG]: 'קריפטו / שוק ההון אגרסיבי',
};

export const PREFILLED_GOALS: { [key in GoalTimeHorizon]: Goal[] } = {
  [GoalTimeHorizon.RECURRING]: [
    { id: 'rec1', description: 'חופשות', amount: 25000, timeframe: 'כל שנה', category: GoalTimeHorizon.RECURRING },
    { id: 'rec2', description: 'מתנות ואירועים', amount: 6000, timeframe: 'כל שנה', category: GoalTimeHorizon.RECURRING },
  ],
  [GoalTimeHorizon.SHORT]: [
    { id: 'sho1', description: 'לימודים אקדמיים - פיזיותרפיה', amount: 100000, timeframe: 'חצי שנה', category: GoalTimeHorizon.SHORT },
    { id: 'sho2', description: 'החלפת טלפון נייד', amount: 5000, timeframe: '18 חודשים', category: GoalTimeHorizon.SHORT },
  ],
  [GoalTimeHorizon.MEDIUM]: [
    { id: 'med1', description: 'חתונה', amount: 50000, timeframe: '4 שנים', category: GoalTimeHorizon.MEDIUM },
    { id: 'med2', description: 'רכב חדש', amount: 200000, timeframe: '7 שנים', category: GoalTimeHorizon.MEDIUM },
  ],
  [GoalTimeHorizon.LONG]: [
    { id: 'lon1', description: 'בית חלומות (הון עצמי)', amount: 2500000, timeframe: '10 שנים', category: GoalTimeHorizon.LONG },
    { id: 'lon2', description: 'בר/בת מצווה ל-2 ילדים', amount: 80000, timeframe: '12 שנים', category: GoalTimeHorizon.LONG },
  ],
  [GoalTimeHorizon.VERY_LONG]: [
    { id: 'vlon1', description: 'עצמאות כלכלית', amount: 1800000, timeframe: '24 שנים', category: GoalTimeHorizon.VERY_LONG },
    { id: 'vlon2', description: 'פרישה בגיל 60', amount: 3600000, timeframe: '34 שנים', category: GoalTimeHorizon.VERY_LONG },
  ],
};
