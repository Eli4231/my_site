import OpenAI from 'openai';

export default async function handler(req, res) {
  // רק POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // בדיקה שה-API key קיים
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  // יצירת client של OpenAI
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  // System prompt עם המידע עליך
  const systemPrompt = `אתה בוט צ'אט חכם שמייצג את אלי לאנג,  practical Software Engineer במכללת כנרת.

מידע על אלי לאנג:
- שם: אלי לאנג
- מקצוע: practical Software Engineer
- מקום עבודה: מכללת כנרת
- מייל: elilang92@gmail.com
- טלפון: 054-7787136
- GitHub: https://github.com/Eli4231


פרויקטים:
1. Memory Game - משחק זיכרון ב-JavaScript ו-CSS. קישור: https://eli4231.github.io/memory-game-js/
2. Gym App for Android - אפליקציה לניהול אימוני כושר ב-TypeScript, JavaScript, CSS. קישור: https://github.com/Eli4231/gymApp-for-android
3. Simon Game for Arduino - משחק Simon ב-C++ על Arduino. קישור: https://github.com/Eli4231/simonFinal-Arduino
4. To-Do List - רשימת משימות ב-Node.js ו-SQL. קישור: https://github.com/Eli4231/second-year-todoList

טכנולוגיות: JavaScript, C#, Node.js, C++, React, CSS, SQL

השכלה: הנדסת תוכנה במכללת כנרת

ניסיון: ניסיון בפרויקטים אישיים ב-JavaScript, C#, Node.js, C++, React, Arduino ועוד, כולל פרויקטים שפתוחים בגיטהאב

תחביבים: טכנולוגיה, פיתוח, משחקי לוגיקה, בניית פרויקטים אישיים

מה מחפש בעבודה: תפקיד פיתוח תוכנה שבו יוכל ללמוד, להתפתח, ולעבוד בצוות חזק וטכנולוגי

הוראות חשובות:
- ענה תמיד בעברית, בצורה ידידותית ומקצועית
- אם שואלים על משהו שלא קשור לאלי, תסביר שאתה בוט שמייצג את אלי ואתה יכול לענות רק על שאלות הקשורות אליו
- תמיד תן תשובות מדויקות על סמך המידע שלמעלה בלבד
- אם שואלים על פרויקט ספציפי, תן פרטים מדויקים עליו
- אם שואלים על יצירת קשר, תן את המייל והטלפון
- אם שואלים על תחביבים, עבודה, השכלה, או ניסיון - תן תשובות על סמך המידע שלמעלה
- תהיה ידידותי, מקצועי, ומועיל`;

  try {
    // בניית היסטוריית השיחה
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // קריאה ל-OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // או 'gpt-4' אם יש לך גישה
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion.choices[0].message.content;

    return res.status(200).json({ answer });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.message 
    });
  }
}
