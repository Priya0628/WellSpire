export interface ContentItem {
  id: string;
  title: string;
  description: string;
  source: string;
  type: "channel" | "article" | "tip";
  url?: string;
  subscribers?: string;
}

export const contentData: Record<string, ContentItem[]> = {
  food: [
    {
      id: "1",
      title: "Pick Up Limes",
      description: "Plant-based nutrition and healthy cooking with a registered dietitian",
      source: "YouTube Channel",
      type: "channel",
      url: "https://www.youtube.com/@PickUpLimes",
      subscribers: "2.1M subscribers"
    },
    {
      id: "2", 
      title: "Rainbow Plant Life",
      description: "Vibrant plant-based recipes and nutrition education",
      source: "YouTube Channel",
      type: "channel",
      url: "https://www.youtube.com/@RainbowPlantLife",
      subscribers: "1.8M subscribers"
    },
    {
      id: "3",
      title: "Cheap Lazy Vegan",
      description: "Budget-friendly healthy meals and practical nutrition tips",
      source: "YouTube Channel", 
      type: "channel",
      url: "https://www.youtube.com/@CheapLazyVegan",
      subscribers: "865K subscribers"
    },
    {
      id: "4",
      title: "Start Your Day with Protein",
      description: "Research shows eating 20-30g protein at breakfast helps maintain stable blood sugar and energy levels throughout the day",
      source: "Nutrition Science",
      type: "tip"
    },
    {
      id: "5",
      title: "Hydrate Before You Caffeinate", 
      description: "Drink a glass of water when you wake up to rehydrate your body after 7-8 hours without fluids",
      source: "Wellness Practice",
      type: "tip"
    }
  ],
  health: [
    {
      id: "6",
      title: "Psych2Go",
      description: "Mental health awareness and psychology education in accessible formats",
      source: "YouTube Channel",
      type: "channel",
      url: "https://www.youtube.com/@Psych2go",
      subscribers: "11.2M subscribers"
    },
    {
      id: "7",
      title: "TEDx Talks",
      description: "Inspiring talks on wellness, mental health, and personal development",
      source: "YouTube Channel",
      type: "channel", 
      url: "https://www.youtube.com/@TEDxTalks",
      subscribers: "37.8M subscribers"
    },
    {
      id: "8",
      title: "Practice Daily Gratitude",
      description: "Studies show writing down 3 things you're grateful for each day can improve mood and life satisfaction within weeks",
      source: "Psychology Research",
      type: "tip"
    },
    {
      id: "9",
      title: "Take Walking Breaks",
      description: "A 10-minute walk can boost creativity by 60% and reduce stress hormones like cortisol",
      source: "Stanford Research",
      type: "tip"
    },
    {
      id: "10",
      title: "Digital Sunset Routine",
      description: "Stop using screens 1 hour before bed to improve sleep quality and mental clarity",
      source: "Sleep Science",
      type: "tip"
    }
  ],
  workout: [
    {
      id: "11",
      title: "FitnessBlender",
      description: "Free workout videos for all fitness levels, from beginner to advanced",
      source: "YouTube Channel",
      type: "channel",
      url: "https://www.youtube.com/@FitnessBlender",
      subscribers: "6.8M subscribers"
    },
    {
      id: "12",
      title: "Yoga with Adriene",
      description: "Accessible yoga and movement practices for all bodies and experience levels",
      source: "YouTube Channel",
      type: "channel",
      url: "https://www.youtube.com/@yogawithadriene",
      subscribers: "12.1M subscribers"
    },
    {
      id: "13",
      title: "Start with 10 Minutes",
      description: "Even 10 minutes of movement daily can improve mood, energy, and cardiovascular health",
      source: "Exercise Science",
      type: "tip"
    },
    {
      id: "14",
      title: "Exercise Snacks",
      description: "Take 2-minute movement breaks every hour - like wall push-ups or desk stretches",
      source: "Workplace Wellness",
      type: "tip"
    }
  ],
  yoga: [
    {
      id: "15",
      title: "Headspace",
      description: "Guided meditation and mindfulness practices for stress reduction and sleep",
      source: "YouTube Channel",
      type: "channel",
      url: "https://www.youtube.com/@Headspace",
      subscribers: "2.3M subscribers"
    },
    {
      id: "16",
      title: "The Honest Guys - Meditations",
      description: "Relaxing guided meditations for sleep, stress relief, and mindfulness",
      source: "YouTube Channel",
      type: "channel",
      url: "https://www.youtube.com/@TheHonestGuys",
      subscribers: "2.1M subscribers"
    },
    {
      id: "17",
      title: "Box Breathing Technique",
      description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat to reduce anxiety instantly",
      source: "Mindfulness Practice",
      type: "tip"
    },
    {
      id: "18",
      title: "Morning Intention Setting",
      description: "Spend 2 minutes each morning setting a positive intention for your day",
      source: "Mindfulness Research",
      type: "tip"
    }
  ]
};

export const getCategoryContent = (category: string): ContentItem[] => {
  return contentData[category] || [];
};
