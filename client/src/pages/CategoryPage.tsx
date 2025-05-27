import { getCategoryContent } from "@/lib/videos";
import ContentCard from "@/components/ContentCard";
import { Apple, Heart, Dumbbell, MessageSquareOff } from "lucide-react";

interface CategoryPageProps {
  category: string;
}

const categoryConfig = {
  food: {
    title: "Food & Nutrition",
    description: "Discover the science of nutrition and learn how to fuel your body for optimal health",
    importance: "Proper nutrition is the foundation of wellness. What you eat directly impacts your energy levels, mood, immune system, and long-term health. Good nutrition supports brain function, helps maintain a healthy weight, and reduces the risk of chronic diseases. It's not about restriction—it's about nourishing your body with foods that make you feel vibrant and strong.",
    benefits: ["Increased energy and vitality", "Better mood and mental clarity", "Stronger immune system", "Improved sleep quality", "Reduced inflammation"],
    icon: Apple,
    color: "green"
  },
  health: {
    title: "Health & Wellness", 
    description: "Explore holistic approaches to health, mental wellness, and lifestyle optimization",
    importance: "Mental and emotional wellness are just as important as physical health. Taking care of your mental health improves your quality of life, relationships, and ability to handle stress. It's about building resilience, practicing self-compassion, and creating healthy habits that support your overall well-being.",
    benefits: ["Reduced stress and anxiety", "Better emotional regulation", "Improved relationships", "Greater life satisfaction", "Enhanced coping skills"],
    icon: Heart,
    color: "blue"
  },
  workout: {
    title: "Workout & Exercise",
    description: "Get fit with comprehensive workout routines for all fitness levels and goals",
    importance: "Regular physical activity is one of the most powerful tools for improving both physical and mental health. Exercise releases endorphins, strengthens your heart, builds muscle, and boosts confidence. You don't need to be perfect—even small amounts of movement can make a big difference in how you feel.",
    benefits: ["Stronger heart and muscles", "Better mood and confidence", "Improved sleep and energy", "Enhanced brain function", "Reduced risk of chronic disease"],
    icon: Dumbbell,
    color: "orange"
  },
  yoga: {
    title: "Yoga & Mindfulness",
    description: "Find inner peace and physical balance through yoga practice and mindfulness techniques",
    importance: "Yoga and mindfulness practices help you connect with your body and mind, reducing stress and increasing self-awareness. These practices teach you to be present, breathe deeply, and find calm in the midst of life's challenges. They're powerful tools for both physical flexibility and emotional resilience.",
    benefits: ["Increased flexibility and balance", "Reduced stress and tension", "Better sleep and relaxation", "Enhanced self-awareness", "Improved focus and concentration"],
    icon: MessageSquareOff,
    color: "purple"
  }
};

export default function CategoryPage({ category }: CategoryPageProps) {
  const config = categoryConfig[category as keyof typeof categoryConfig];
  const content = getCategoryContent(category);

  if (!config) {
    return <div>Category not found</div>;
  }

  const IconComponent = config.icon;
  const iconColorClass = {
    green: "text-green-500",
    blue: "text-blue-500", 
    orange: "text-orange-500",
    purple: "text-purple-500"
  }[config.color];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          <IconComponent className={`${iconColorClass} inline mr-3`} />
          {config.title}
        </h1>
        <p className="text-lg text-gray-800 mb-8">{config.description}</p>
        
        {/* Wellness Importance Section */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why This Matters for Your Wellbeing</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{config.importance}</p>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Benefits you may experience:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {config.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    config.color === 'green' ? 'bg-green-500' :
                    config.color === 'blue' ? 'bg-blue-500' :
                    config.color === 'orange' ? 'bg-orange-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Curated Videos & Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              description={item.description}
              source={item.source}
              type={item.type}
              url={item.url}
              subscribers={item.subscribers}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
