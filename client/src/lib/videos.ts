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
      id: "jN_A5I8RgKI",
      title: "MyFitnessPal Tutorial: Track Your Nutrition",
      description: "Complete guide to using MyFitnessPal for tracking calories and macros effectively",
      channel: "FitnessBlender",
      views: "1.2M views",
      duration: "12:34",
      embedUrl: "https://www.youtube.com/embed/jN_A5I8RgKI"
    },
    {
      id: "TlfRgn_o0QA",
      title: "5 Minute Healthy Breakfast Ideas",
      description: "Quick nutritious breakfast options you can make in under 5 minutes",
      channel: "Pick Up Limes",
      views: "856K views",
      duration: "5:42",
      embedUrl: "https://www.youtube.com/embed/TlfRgn_o0QA"
    },
    {
      id: "hFDcoX7s0rE",
      title: "Understanding Macros: Protein, Carbs & Fats",
      description: "Simple explanation of macronutrients and how to balance them",
      channel: "Thomas DeLauer",
      views: "642K views",
      duration: "8:45",
      embedUrl: "https://www.youtube.com/embed/hFDcoX7s0rE"
    },
    {
      id: "EpVgNNOjYZE",
      title: "Meal Prep for Beginners",
      description: "Easy meal prep strategies to save time and eat healthier",
      channel: "Brothers Green Eats",
      views: "923K views",
      duration: "15:22",
      embedUrl: "https://www.youtube.com/embed/EpVgNNOjYZE"
    },
    {
      id: "VIWaK05Q5h4",
      title: "How to Read Nutrition Labels",
      description: "Master the art of understanding what's really in your food",
      channel: "Nutrition Made Simple!",
      views: "445K views",
      duration: "11:28",
      embedUrl: "https://www.youtube.com/embed/VIWaK05Q5h4"
    },
    {
      id: "cRmwp-85oEc",
      title: "Healthy Snack Ideas",
      description: "Nutritious snack options that will keep you energized throughout the day",
      channel: "Cheap Lazy Vegan",
      views: "678K views",
      duration: "7:15",
      embedUrl: "https://www.youtube.com/embed/cRmwp-85oEc"
    }
  ],
  health: [
    {
      id: "wqEM_jlDRZI",
      title: "Simple Stress Relief Techniques",
      description: "Easy methods to manage stress and anxiety in daily life",
      channel: "Therapy in a Nutshell",
      views: "1.5M views",
      duration: "8:42",
      embedUrl: "https://www.youtube.com/embed/wqEM_jlDRZI"
    },
    {
      id: "nm1TxQj9IsQ",
      title: "How to Sleep Better",
      description: "Science-based tips for improving your sleep quality naturally",
      channel: "Matthew Walker",
      views: "987K views",
      duration: "12:15",
      embedUrl: "https://www.youtube.com/embed/nm1TxQj9IsQ"
    },
    {
      id: "inpok4MKVLM",
      title: "Building Healthy Daily Habits",
      description: "Small changes that lead to big improvements in your wellbeing",
      channel: "Thomas Frank",
      views: "734K views",
      duration: "16:29",
      embedUrl: "https://www.youtube.com/embed/inpok4MKVLM"
    },
    {
      id: "YQJ2UeKsLiU",
      title: "Mental Health Self-Care",
      description: "Practical strategies for maintaining good mental health",
      channel: "Kati Morton",
      views: "1.1M views",
      duration: "14:08",
      embedUrl: "https://www.youtube.com/embed/YQJ2UeKsLiU"
    },
    {
      id: "K-xbNkHU8p8",
      title: "Boost Your Immune System Naturally",
      description: "Evidence-based ways to strengthen your immune system",
      channel: "Dr. Berg",
      views: "567K views",
      duration: "13:55",
      embedUrl: "https://www.youtube.com/embed/K-xbNkHU8p8"
    },
    {
      id: "ZG2LWbKhdpU",
      title: "Digital Wellness Tips",
      description: "How to have a healthy relationship with technology",
      channel: "TEDx Talks",
      views: "892K views",
      duration: "11:34",
      embedUrl: "https://www.youtube.com/embed/ZG2LWbKhdpU"
    }
  ],
  workout: [
    {
      id: "ML4ab_33suY",
      title: "20 Min Full Body HIIT Workout",
      description: "High-intensity interval training for maximum calorie burn - no equipment needed",
      channel: "MadFit",
      views: "2.1M views",
      duration: "20:45",
      embedUrl: "https://www.youtube.com/embed/ML4ab_33suY"
    },
    {
      id: "IODxDxX7oi4",
      title: "Beginner Bodyweight Workout",
      description: "Perfect starter workout using just your body weight",
      channel: "FitnessBlender",
      views: "1.3M views",
      duration: "15:20",
      embedUrl: "https://www.youtube.com/embed/IODxDxX7oi4"
    },
    {
      id: "DHD1-sV3fyM",
      title: "10 Min Ab Workout",
      description: "Quick and effective core strengthening routine",
      channel: "Chloe Ting",
      views: "987K views",
      duration: "10:12",
      embedUrl: "https://www.youtube.com/embed/DHD1-sV3fyM"
    },
    {
      id: "bfW22VgASGc",
      title: "30 Min Cardio Dance Workout",
      description: "Fun dance fitness routine that burns calories while having fun",
      channel: "emkfit",
      views: "1.8M views",
      duration: "30:33",
      embedUrl: "https://www.youtube.com/embed/bfW22VgASGc"
    },
    {
      id: "L_xrDAtykMM",
      title: "Full Body Stretching Routine",
      description: "Essential stretches for flexibility and recovery",
      channel: "Yoga with Adriene",
      views: "756K views",
      duration: "25:45",
      embedUrl: "https://www.youtube.com/embed/L_xrDAtykMM"
    },
    {
      id: "Ey7Hj5FM08w",
      title: "Lower Body Strength Training",
      description: "Build strong legs and glutes with this targeted workout",
      channel: "Natacha Océane",
      views: "1.4M views",
      duration: "18:18",
      embedUrl: "https://www.youtube.com/embed/Ey7Hj5FM08w"
    }
  ],
  yoga: [
    {
      id: "v7AYKMP6rOE",
      title: "20 Min Morning Yoga Flow",
      description: "Energizing sequence to start your day with intention and vitality",
      channel: "Yoga with Adriene",
      views: "1.7M views",
      duration: "20:30",
      embedUrl: "https://www.youtube.com/embed/v7AYKMP6rOE"
    },
    {
      id: "inpok4MKVLM",
      title: "5 Minute Meditation for Beginners",
      description: "Simple mindfulness practice for daily calm and focus",
      channel: "Headspace",
      views: "1.2M views",
      duration: "5:15",
      embedUrl: "https://www.youtube.com/embed/inpok4MKVLM"
    },
    {
      id: "BiWDsfZ2nbo",
      title: "Bedtime Yoga for Better Sleep",
      description: "Gentle poses to unwind and prepare your body for restful sleep",
      channel: "Yoga with Kassandra",
      views: "934K views",
      duration: "15:42",
      embedUrl: "https://www.youtube.com/embed/BiWDsfZ2nbo"
    },
    {
      id: "4T7Vr0dNjlE",
      title: "Breathing Exercises for Stress Relief",
      description: "Simple breathing techniques to calm your mind and reduce anxiety",
      channel: "The Honest Guys",
      views: "823K views",
      duration: "10:28",
      embedUrl: "https://www.youtube.com/embed/4T7Vr0dNjlE"
    },
    {
      id: "GLy2rYHwUqY",
      title: "30 Min Vinyasa Flow",
      description: "Dynamic flowing sequence linking movement with breath",
      channel: "Boho Beautiful",
      views: "1.5M views",
      duration: "30:10",
      embedUrl: "https://www.youtube.com/embed/GLy2rYHwUqY"
    },
    {
      id: "DWuDeF04xs4",
      title: "Yoga for Back Pain Relief",
      description: "Therapeutic poses to strengthen and stretch your spine",
      channel: "SarahBethYoga",
      views: "678K views",
      duration: "25:33",
      embedUrl: "https://www.youtube.com/embed/DWuDeF04xs4"
    }
  ]
};

export const getCategoryVideos = (category: string): Video[] => {
  return videoData[category] || [];
};
