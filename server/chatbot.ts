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

  // Nutrition patterns
  if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
    return "For nutrition guidance, I recommend exploring our Food & Nutrition section which features trusted channels like Pick Up Limes and Rainbow Plant Life. A simple tip: start with adding one extra serving of vegetables to your daily meals. Small changes make a big difference!";
  }

  // Exercise patterns
  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness') || lowerMessage.includes('gym')) {
    return "Check out our Workout & Exercise section for great fitness resources! FitnessBlender and Yoga with Adriene offer excellent beginner-friendly content. Remember: even 10 minutes of movement daily counts. Start small and build consistency.";
  }

  // Mindfulness/mental health patterns
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('mindful') || lowerMessage.includes('meditation') || lowerMessage.includes('mental')) {
    return "Our Yoga & Mindfulness section has wonderful resources for mental wellness. Try the box breathing technique: breathe in for 4, hold for 4, out for 4, hold for 4. Headspace and The Honest Guys offer great guided meditations too.";
  }

  // Sleep patterns
  if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
    return "Good sleep is crucial for wellness! Try creating a digital sunset routine - stop using screens 1 hour before bed. Our Health & Wellness section has more sleep tips. Consider gentle stretching or reading before bedtime.";
  }

  // Water/hydration patterns
  if (lowerMessage.includes('water') || lowerMessage.includes('hydrat') || lowerMessage.includes('drink')) {
    return "Staying hydrated is so important! Try setting gentle reminders to drink water every 2 hours. A good goal is 8 glasses daily, but listen to your body. Adding a slice of lemon can make it more enjoyable!";
  }

  // Goal/motivation patterns
  if (lowerMessage.includes('goal') || lowerMessage.includes('motivat') || lowerMessage.includes('start') || lowerMessage.includes('begin')) {
    return "Starting your wellness journey is wonderful! The key is beginning small and being consistent. Pick one category that interests you most - Food, Health, Workout, or Mindfulness - and explore our curated content there. You've got this!";
  }

  // Weight patterns
  if (lowerMessage.includes('weight') || lowerMessage.includes('lose') || lowerMessage.includes('gain')) {
    return "Weight management is about creating sustainable, healthy habits. Focus on nourishing your body with whole foods and regular movement you enjoy. Our Food & Nutrition and Workout sections have great resources. Remember to be patient and kind to yourself!";
  }

  // Default supportive response
  return "I'm here to support your wellness journey! I can help with questions about nutrition, exercise, mindfulness, and general health. You can also explore our four main sections: Food & Nutrition, Health & Wellness, Workout & Exercise, and Yoga & Mindfulness. What aspect of wellness interests you most?";
}