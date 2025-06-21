module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const response = getPatternBasedResponse(message);
    
    return res.status(200).json({ response });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

function getPatternBasedResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Nutrition patterns
  if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
    const nutritionTips = [
      "Focus on whole foods like fruits, vegetables, lean proteins, and whole grains. These provide essential nutrients your body needs.",
      "Stay hydrated by drinking plenty of water throughout the day. Aim for 8 glasses daily.",
      "Practice portion control by using smaller plates and eating slowly to recognize fullness cues.",
      "Include colorful vegetables in every meal - they're packed with vitamins and antioxidants.",
      "Choose healthy snacks like nuts, fruits, or yogurt instead of processed foods."
    ];
    return nutritionTips[Math.floor(Math.random() * nutritionTips.length)];
  }
  
  // Exercise patterns
  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness') || lowerMessage.includes('gym')) {
    const exerciseTips = [
      "Start with 30 minutes of moderate exercise daily. Even a brisk walk can make a significant difference.",
      "Mix cardio and strength training for optimal health benefits. Try alternating days.",
      "Listen to your body and rest when needed. Recovery is just as important as the workout itself.",
      "Find activities you enjoy - dancing, hiking, swimming - so exercise feels less like a chore.",
      "Set realistic goals and celebrate small victories to stay motivated on your fitness journey."
    ];
    return exerciseTips[Math.floor(Math.random() * exerciseTips.length)];
  }
  
  // Stress and mental health patterns
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('mental') || lowerMessage.includes('mood')) {
    const stressTips = [
      "Practice deep breathing exercises. Try the 4-7-8 technique: inhale for 4, hold for 7, exhale for 8.",
      "Take regular breaks throughout your day to prevent burnout. Even 5 minutes can help reset your mind.",
      "Consider meditation or mindfulness practices. Start with just 5-10 minutes daily.",
      "Connect with friends and family regularly. Social support is crucial for mental wellbeing.",
      "Establish a consistent sleep schedule. Quality sleep is fundamental for managing stress."
    ];
    return stressTips[Math.floor(Math.random() * stressTips.length)];
  }
  
  // Sleep patterns
  if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('rest')) {
    const sleepTips = [
      "Create a bedtime routine and stick to it. This helps signal to your body that it's time to wind down.",
      "Keep your bedroom cool, dark, and quiet for optimal sleep conditions.",
      "Avoid screens at least 1 hour before bedtime. The blue light can interfere with your natural sleep cycle.",
      "Try to go to bed and wake up at the same time every day, even on weekends.",
      "If you can't fall asleep within 20 minutes, get up and do a quiet activity until you feel sleepy."
    ];
    return sleepTips[Math.floor(Math.random() * sleepTips.length)];
  }
  
  // Yoga patterns
  if (lowerMessage.includes('yoga') || lowerMessage.includes('stretch') || lowerMessage.includes('flexibility')) {
    const yogaTips = [
      "Start with basic poses like child's pose, downward dog, and mountain pose. Focus on proper alignment.",
      "Practice yoga consistently, even if it's just 10-15 minutes daily. Regular practice is more beneficial than long, infrequent sessions.",
      "Listen to your body and never force a pose. Yoga should feel challenging but not painful.",
      "Focus on your breath during practice. Deep, controlled breathing enhances the benefits of yoga.",
      "Consider joining a beginner-friendly class or following online tutorials to learn proper techniques."
    ];
    return yogaTips[Math.floor(Math.random() * yogaTips.length)];
  }
  
  // General wellness
  const generalTips = [
    "Wellness is a journey, not a destination. Be patient and kind to yourself as you develop healthy habits.",
    "Small, consistent changes often lead to the most sustainable results. Start with one habit at a time.",
    "Stay connected with your community and loved ones. Social wellness is a key component of overall health.",
    "Regular check-ups with healthcare providers help catch potential issues early and maintain optimal health.",
    "Practice gratitude daily. Taking time to appreciate positive aspects of your life can improve mental wellbeing."
  ];
  
  return generalTips[Math.floor(Math.random() * generalTips.length)];
}