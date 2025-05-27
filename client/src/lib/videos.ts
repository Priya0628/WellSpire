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
      id: "WPPPFqsECz0",
      title: "The happy secret to better work | Shawn Achor",
      description: "How positive psychology can boost happiness and improve performance",
      channel: "TED",
      views: "27M views",
      duration: "12:20",
      embedUrl: "https://www.youtube.com/embed/WPPPFqsECz0"
    },
    {
      id: "pN34FNbOKXc",
      title: "The puzzle of motivation | Dan Pink",
      description: "Understanding what truly motivates us for lasting change",
      channel: "TED",
      views: "29M views",
      duration: "18:36",
      embedUrl: "https://www.youtube.com/embed/pN34FNbOKXc"
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
      id: "arj7oStGLkU",
      title: "The power of believing that you can improve | Carol Dweck",
      description: "Growth mindset applied to fitness and physical improvement",
      channel: "TED",
      views: "21M views",
      duration: "10:20",
      embedUrl: "https://www.youtube.com/embed/arj7oStGLkU"
    },
    {
      id: "Xe1TZaElTAs",
      title: "Why some people find exercise harder than others | Emily Balcetis",
      description: "Understanding different perspectives on exercise and motivation",
      channel: "TED",
      views: "3.2M views",
      duration: "13:15",
      embedUrl: "https://www.youtube.com/embed/Xe1TZaElTAs"
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
      id: "iN6g2mr0p3Q",
      title: "How to make stress your friend | Kelly McGonigal",
      description: "Transform your relationship with stress through mindfulness",
      channel: "TED",
      views: "28M views",
      duration: "14:28",
      embedUrl: "https://www.youtube.com/embed/iN6g2mr0p3Q"
    },
    {
      id: "rqoxYKtEWEc",
      title: "10-minute meditation for beginners",
      description: "Simple guided meditation to start your mindfulness practice",
      channel: "Headspace",
      views: "8.5M views",
      duration: "11:07",
      embedUrl: "https://www.youtube.com/embed/rqoxYKtEWEc"
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
