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
      id: "TvHqwYwhKzM",
      title: "How the food you eat affects your brain - Mia Nacamulli",
      description: "Discover how food impacts your brain and mental performance",
      channel: "TED-Ed",
      views: "3.2M views",
      duration: "4:52",
      embedUrl: "https://www.youtube.com/embed/TvHqwYwhKzM"
    },
    {
      id: "aUaInS6HIGo",
      title: "The surprising habit that could help you live longer | Dan Buettner",
      description: "Insights from the world's longest-lived communities about healthy eating",
      channel: "TED",
      views: "2.1M views",
      duration: "19:27",
      embedUrl: "https://www.youtube.com/embed/aUaInS6HIGo"
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
      id: "QX_oy9614HQ",
      title: "The power of introverts | Susan Cain",
      description: "Understanding and embracing different personality types for better mental health",
      channel: "TED",
      views: "31M views",
      duration: "19:04",
      embedUrl: "https://www.youtube.com/embed/QX_oy9614HQ"
    }
  ],
  workout: [
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
      id: "WBupia9oidU",
      title: "The brain-changing benefits of exercise | Wendy Suzuki",
      description: "How physical activity transforms your brain and improves cognitive function",
      channel: "TED",
      views: "5.2M views",
      duration: "13:02",
      embedUrl: "https://www.youtube.com/embed/WBupia9oidU"
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
      id: "LkoOCw_tp1I",
      title: "The brain benefits of deep sleep | Matt Walker",
      description: "Understanding how quality sleep supports mental and physical wellness",
      channel: "TED",
      views: "4.8M views",
      duration: "19:18",
      embedUrl: "https://www.youtube.com/embed/LkoOCw_tp1I"
    }
  ]
};

export const getCategoryVideos = (category: string): Video[] => {
  return videoData[category] || [];
};
