import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
}) : null;

export async function generateChatbotResponse(userMessage: string): Promise<string> {
  // If OpenAI API is available, use AI for intelligent responses
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: `You are a supportive wellness assistant for Wellspire, a wellness platform. You help users with:
            - Nutrition and healthy eating advice
            - Exercise and workout suggestions
            - Mindfulness and yoga practices
            - General health and wellness guidance
            
            Guidelines:
            - Be encouraging and supportive, especially for beginners
            - Provide practical, actionable advice
            - Keep responses concise but helpful
            - Never provide medical diagnosis or treatment advice
            - Suggest consulting healthcare professionals for serious concerns
            - Reference the platform's content categories: Food & Nutrition, Health & Wellness, Workout & Exercise, Yoga & Mindfulness
            - Maintain a warm, non-judgmental tone`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      });

      return response.choices[0].message.content || getPatternBasedResponse(userMessage);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return getPatternBasedResponse(userMessage);
    }
  }

  // Fallback to pattern-based responses when API is not available
  return getPatternBasedResponse(userMessage);
}

function getPatternBasedResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Breakfast patterns
  if (lowerMessage.includes('breakfast') || lowerMessage.includes('morning meal')) {
    return "For a healthy breakfast, try: Greek yogurt with berries and nuts, oatmeal with banana and chia seeds, or avocado toast with a poached egg. These provide protein, fiber, and sustained energy to start your day right!";
  }

  // Diet and nutrition patterns
  if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition') || lowerMessage.includes('diet') || lowerMessage.includes('meal')) {
    return "Focus on whole foods: lean proteins, colorful vegetables, whole grains, and healthy fats. Aim for balanced meals with protein, complex carbs, and vegetables. Stay hydrated and eat mindfully. Small, consistent changes work better than drastic restrictions.";
  }

  // Exercise and workout patterns
  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness') || lowerMessage.includes('gym') || lowerMessage.includes('cardio') || lowerMessage.includes('strength')) {
    return "Start with 150 minutes of moderate exercise weekly. Try: 30-minute walks, bodyweight exercises (push-ups, squats, planks), or beginner yoga. Mix cardio with strength training. Listen to your body and progress gradually.";
  }

  // Stress and mental health patterns
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('mindful') || lowerMessage.includes('meditation') || lowerMessage.includes('mental') || lowerMessage.includes('calm')) {
    return "Try these stress-relief techniques: deep breathing (4-7-8 method), 10-minute daily meditation, gentle yoga, or mindful walking. Regular exercise, adequate sleep, and limiting caffeine also help manage stress naturally.";
  }

  // Sleep patterns
  if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia') || lowerMessage.includes('rest')) {
    return "For better sleep: maintain a consistent bedtime, avoid screens 1 hour before bed, keep your room cool and dark, try chamomile tea, and consider gentle stretching or reading. Aim for 7-9 hours nightly.";
  }

  // Weight management patterns
  if (lowerMessage.includes('weight') || lowerMessage.includes('lose') || lowerMessage.includes('gain') || lowerMessage.includes('fat') || lowerMessage.includes('muscle')) {
    return "Sustainable weight management combines balanced nutrition with regular exercise. Focus on whole foods, portion control, staying hydrated, and being patient with progress. Aim for 1-2 pounds per week for healthy weight loss.";
  }

  // Water/hydration patterns
  if (lowerMessage.includes('water') || lowerMessage.includes('hydrat') || lowerMessage.includes('drink')) {
    return "Aim for 8-10 glasses of water daily. Start your day with a glass of water, carry a water bottle, and eat water-rich foods like cucumbers and watermelon. Proper hydration supports energy, skin health, and overall wellness.";
  }

  // Pain management patterns
  if (lowerMessage.includes('pain') || lowerMessage.includes('ache') || lowerMessage.includes('sore') || lowerMessage.includes('hurt')) {
    return "For natural pain relief: try gentle stretching, apply heat or ice as appropriate, practice deep breathing, consider anti-inflammatory foods like turmeric and cherries, and ensure adequate rest. Consult a healthcare provider for persistent pain.";
  }

  // Energy and fatigue patterns
  if (lowerMessage.includes('energy') || lowerMessage.includes('fatigue') || lowerMessage.includes('tired') || lowerMessage.includes('boost')) {
    return "Boost energy naturally: eat balanced meals with protein and complex carbs, stay hydrated, get 7-9 hours of sleep, take short walks, limit processed sugar, and consider B-vitamins from whole foods.";
  }

  // Goal setting patterns
  if (lowerMessage.includes('goal') || lowerMessage.includes('motivat') || lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('plan')) {
    return "Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound. Start small (like 10-minute daily walks), track progress, celebrate wins, and be flexible. Consistency beats perfection every time!";
  }

  // Vitamin and supplement patterns
  if (lowerMessage.includes('vitamin') || lowerMessage.includes('supplement') || lowerMessage.includes('nutrient')) {
    return "Focus on nutrients from whole foods first: vitamin D from sunlight and fish, vitamin C from citrus and berries, iron from leafy greens and lean meats. Consult a healthcare provider before starting supplements.";
  }

  // General health patterns
  if (lowerMessage.includes('health') || lowerMessage.includes('wellness') || lowerMessage.includes('healthy') || lowerMessage.includes('tips')) {
    return "Key wellness habits: eat whole foods, exercise regularly, get quality sleep, manage stress, stay hydrated, maintain social connections, and schedule regular health check-ups. Small daily choices create lasting health benefits.";
  }

  // Default supportive response
  return "I'm here to support your wellness journey! I can provide guidance on nutrition, exercise, stress management, sleep, and healthy lifestyle habits. What specific wellness topic would you like to discuss today?";
}