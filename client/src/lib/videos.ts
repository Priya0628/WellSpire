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
      id: "OJAEaAom5FQ",
      title: "The power of believing that you can improve | Carol Dweck",
      description: "Growth mindset for health and nutrition changes",
      channel: "TED",
      views: "1.2M views",
      duration: "10:20",
      embedUrl: "https://www.youtube.com/embed/OJAEaAom5FQ"
    },
    {
      id: "ZfOh_MSaJKo",
      title: "5 Minute Healthy Breakfast Ideas",
      description: "Quick and nutritious breakfast options for busy mornings",
      channel: "HealthyKitchen101",
      views: "856K views",
      duration: "5:23",
      embedUrl: "https://www.youtube.com/embed/ZfOh_MSaJKo"
    },
    {
      id: "TvHqwYwhKzM",
      title: "How the food you eat affects your brain - Mia Nacamulli",
      description: "Discover how food impacts your brain and mental performance",
      channel: "TED-Ed",
      views: "3.2M views",
      duration: "4:52",
      embedUrl: "https://www.youtube.com/embed/TvHqwYwhKzM"
    },
    {
      id: "lI26YcbIX2c", 
      title: "What I eat in a day for a healthy brain",
      description: "Brain-boosting foods and nutrition tips",
      channel: "Pick Up Limes",
      views: "1.1M views",
      duration: "8:15",
      embedUrl: "https://www.youtube.com/embed/lI26YcbIX2c"
    },
    {
      id: "aUaInS6HIGo",
      title: "The surprising habit that could help you live longer | Dan Buettner",
      description: "Insights from the world's longest-lived communities about healthy eating",
      channel: "TED",
      views: "2.1M views",
      duration: "19:27",
      embedUrl: "https://www.youtube.com/embed/aUaInS6HIGo"
    },
    {
      id: "jOeJn1RoxNc",
      title: "What I learned from 100 days of rejection | Jia Jiang",
      description: "Building confidence and resilience through wellness mindset",
      channel: "TED",
      views: "8.9M views",
      duration: "15:24",
      embedUrl: "https://www.youtube.com/embed/jOeJn1RoxNc"
    }
  ],
  health: [
    {
      id: "RcGyVTAoXEU",
      title: "The power of vulnerability | Brené Brown",
      description: "Understanding vulnerability as a pathway to courage and authentic living",
      channel: "TED",
      views: "19M views",
      duration: "20:04",
      embedUrl: "https://www.youtube.com/embed/RcGyVTAoXEU"
    },
    {
      id: "fLJsdqxnZb0",
      title: "Your body language may shape who you are | Amy Cuddy",
      description: "How posture and body language can boost confidence and reduce stress",
      channel: "TED",
      views: "21M views",
      duration: "21:02",
      embedUrl: "https://www.youtube.com/embed/fLJsdqxnZb0"
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
