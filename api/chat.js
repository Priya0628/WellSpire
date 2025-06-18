const OpenAI = require("openai");

module.exports = async function handler(req, res) {
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
    const { message, username } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    let response;

    // Try OpenAI first if API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a wellness coach providing helpful, supportive advice about health, nutrition, fitness, and mental well-being. Keep responses concise, practical, and encouraging."
            },
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        });

        response = completion.choices[0].message.content;
      } catch (openaiError) {
        console.error('OpenAI API error:', openaiError);
        response = getPatternBasedResponse(message);
      }
    } else {
      response = getPatternBasedResponse(message);
    }

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

  if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
    return "Try deep breathing exercises: inhale for 4 counts, hold for 4, exhale for 6. This activates your parasympathetic nervous system and helps reduce stress naturally.";
  }

  if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
    return "Good sleep hygiene is key: avoid screens 1 hour before bed, keep your room cool and dark, and try a consistent bedtime routine. Consider chamomile tea or gentle stretching.";
  }

  if (lowerMessage.includes('nutrition') || lowerMessage.includes('eat') || lowerMessage.includes('food')) {
    return "Focus on whole foods: lean proteins, colorful vegetables, whole grains, and healthy fats. Aim for balanced meals with protein, complex carbs, and vegetables. Stay hydrated and eat mindfully.";
  }

  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness')) {
    return "Start small and be consistent! Even 10-15 minutes of daily movement helps. Try walking, bodyweight exercises, or activities you enjoy. The best workout is the one you'll actually do.";
  }

  return "Every small step toward wellness matters! Focus on one healthy habit at a time. What feels most achievable for you today?";
}