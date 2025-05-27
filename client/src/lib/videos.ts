export interface Video {
  id: string;
  title: string;
  description: string;
  channel: string;
  views: string;
  duration: string;
  embedUrl: string;
}

export const videoData: Record<string, Video[]> = {
  food: [
    {
      id: "dQw4w9WgXcQ",
      title: "Understanding Macronutrients",
      description: "Learn about proteins, carbohydrates, and fats for optimal nutrition",
      channel: "Dr. Nutrition",
      views: "1.2M views",
      duration: "12:34",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "9bZkp7q19f0",
      title: "Quick Healthy Breakfast Ideas",
      description: "5 nutritious breakfast options you can make in under 10 minutes",
      channel: "Healthy Kitchen",
      views: "856K views",
      duration: "0:58",
      embedUrl: "https://www.youtube.com/embed/9bZkp7q19f0"
    },
    {
      id: "kJQP7kiw5Fk",
      title: "Superfoods for Energy",
      description: "Discover nutrient-dense foods that boost your energy naturally",
      channel: "Energy Coach",
      views: "642K views",
      duration: "8:45",
      embedUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk"
    },
    {
      id: "oHg5SJYRHA0",
      title: "Plant-Based Nutrition Guide",
      description: "Complete guide to getting all nutrients from plant-based sources",
      channel: "Plant Power",
      views: "923K views",
      duration: "20:11",
      embedUrl: "https://www.youtube.com/embed/oHg5SJYRHA0"
    },
    {
      id: "BQ9YtJC-Kd8",
      title: "Hydration and Health",
      description: "Why proper hydration is crucial for your overall well-being",
      channel: "Wellness Doc",
      views: "445K views",
      duration: "14:33",
      embedUrl: "https://www.youtube.com/embed/BQ9YtJC-Kd8"
    },
    {
      id: "ZfOh_MSaJKo",
      title: "Reading Nutrition Labels",
      description: "Master the art of understanding what's really in your food",
      channel: "Smart Shopper",
      views: "678K views",
      duration: "11:28",
      embedUrl: "https://www.youtube.com/embed/ZfOh_MSaJKo"
    }
  ],
  health: [
    {
      id: "LsoLEjrDogU",
      title: "Stress Management Techniques",
      description: "Learn proven methods to reduce and manage daily stress",
      channel: "Calm Mind",
      views: "1.5M views",
      duration: "18:42",
      embedUrl: "https://www.youtube.com/embed/LsoLEjrDogU"
    },
    {
      id: "2vjPBrBU-TM",
      title: "Sleep Optimization Guide",
      description: "Improve your sleep quality for better health and performance",
      channel: "Sleep Expert",
      views: "987K views",
      duration: "25:15",
      embedUrl: "https://www.youtube.com/embed/2vjPBrBU-TM"
    },
    {
      id: "ByED80IKdIU",
      title: "Mental Health First Aid",
      description: "Essential tools for supporting mental wellness in yourself and others",
      channel: "Mind Care",
      views: "734K views",
      duration: "16:29",
      embedUrl: "https://www.youtube.com/embed/ByED80IKdIU"
    },
    {
      id: "HEewnHQAlHI",
      title: "Building Healthy Habits",
      description: "Science-backed strategies for creating lasting positive changes",
      channel: "Habit Coach",
      views: "1.1M views",
      duration: "22:08",
      embedUrl: "https://www.youtube.com/embed/HEewnHQAlHI"
    },
    {
      id: "fJ9rUzIMcZQ",
      title: "Digital Detox Benefits",
      description: "How reducing screen time can improve your mental and physical health",
      channel: "Tech Balance",
      views: "567K views",
      duration: "13:55",
      embedUrl: "https://www.youtube.com/embed/fJ9rUzIMcZQ"
    },
    {
      id: "A_MjCqQoLLA",
      title: "Immune System Boosters",
      description: "Natural ways to strengthen your body's defense mechanisms",
      channel: "Immunity Pro",
      views: "892K views",
      duration: "19:34",
      embedUrl: "https://www.youtube.com/embed/A_MjCqQoLLA"
    }
  ],
  workout: [
    {
      id: "UBNXDXNOKlo",
      title: "Full Body HIIT Workout",
      description: "High-intensity interval training for maximum calorie burn",
      channel: "Fit Life",
      views: "2.1M views",
      duration: "30:45",
      embedUrl: "https://www.youtube.com/embed/UBNXDXNOKlo"
    },
    {
      id: "OUbxnDSu8bY",
      title: "Beginner Strength Training",
      description: "Learn proper form and build strength with basic exercises",
      channel: "Strong Start",
      views: "1.3M views",
      duration: "15:20",
      embedUrl: "https://www.youtube.com/embed/OUbxnDSu8bY"
    },
    {
      id: "8vzKgD89oOE",
      title: "Core Strengthening Routine",
      description: "Build a strong core with targeted abdominal exercises",
      channel: "Core Power",
      views: "987K views",
      duration: "25:12",
      embedUrl: "https://www.youtube.com/embed/8vzKgD89oOE"
    },
    {
      id: "lDMng3JFW98",
      title: "Cardio Dance Fitness",
      description: "Fun dance routines that get your heart pumping",
      channel: "Dance Fit",
      views: "1.8M views",
      duration: "40:33",
      embedUrl: "https://www.youtube.com/embed/lDMng3JFW98"
    },
    {
      id: "L_xrDAtykMM",
      title: "Stretching & Recovery",
      description: "Essential stretches for post-workout recovery and flexibility",
      channel: "Flex & Flow",
      views: "756K views",
      duration: "12:45",
      embedUrl: "https://www.youtube.com/embed/L_xrDAtykMM"
    },
    {
      id: "mlc38rjOgHY",
      title: "Lower Body Blast",
      description: "Target your legs and glutes with this intensive routine",
      channel: "Leg Day Pro",
      views: "1.4M views",
      duration: "35:18",
      embedUrl: "https://www.youtube.com/embed/mlc38rjOgHY"
    }
  ],
  yoga: [
    {
      id: "hJbRpHZr_d0",
      title: "Morning Yoga Flow",
      description: "Energizing sequence to start your day with intention and vitality",
      channel: "Sunrise Yoga",
      views: "1.7M views",
      duration: "45:30",
      embedUrl: "https://www.youtube.com/embed/hJbRpHZr_d0"
    },
    {
      id: "wcgTBFHMqeE",
      title: "Meditation for Beginners",
      description: "Learn the basics of mindfulness meditation and breath awareness",
      channel: "Mindful Path",
      views: "1.2M views",
      duration: "20:15",
      embedUrl: "https://www.youtube.com/embed/wcgTBFHMqeE"
    },
    {
      id: "sTMRuRjGy1s",
      title: "Restorative Evening Yoga",
      description: "Gentle poses to unwind and prepare your body for restful sleep",
      channel: "Evening Zen",
      views: "934K views",
      duration: "35:42",
      embedUrl: "https://www.youtube.com/embed/sTMRuRjGy1s"
    },
    {
      id: "4T7Vr0dNjlE",
      title: "Breathwork for Anxiety",
      description: "Powerful breathing techniques to calm the mind and reduce stress",
      channel: "Breath Peace",
      views: "823K views",
      duration: "15:28",
      embedUrl: "https://www.youtube.com/embed/4T7Vr0dNjlE"
    },
    {
      id: "Eml2xnoLpYE",
      title: "Vinyasa Flow Practice",
      description: "Dynamic flowing sequence linking movement with breath",
      channel: "Flow State",
      views: "1.5M views",
      duration: "50:10",
      embedUrl: "https://www.youtube.com/embed/Eml2xnoLpYE"
    },
    {
      id: "qyF79cpEdV0",
      title: "Yoga for Back Pain",
      description: "Therapeutic poses to strengthen and stretch your spine",
      channel: "Healing Yoga",
      views: "678K views",
      duration: "25:33",
      embedUrl: "https://www.youtube.com/embed/qyF79cpEdV0"
    }
  ]
};

export const getCategoryVideos = (category: string): Video[] => {
  return videoData[category] || [];
};
