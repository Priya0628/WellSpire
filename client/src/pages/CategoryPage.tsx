import { getCategoryVideos } from "@/lib/videos";
import VideoCard from "@/components/VideoCard";
import { Apple, Heart, Dumbbell, MessageSquareOff } from "lucide-react";

interface CategoryPageProps {
  category: string;
}

const categoryConfig = {
  food: {
    title: "Food & Nutrition",
    description: "Discover the science of nutrition and learn how to fuel your body for optimal health",
    icon: Apple,
    color: "green"
  },
  health: {
    title: "Health & Wellness", 
    description: "Explore holistic approaches to health, mental wellness, and lifestyle optimization",
    icon: Heart,
    color: "blue"
  },
  workout: {
    title: "Workout & Exercise",
    description: "Get fit with comprehensive workout routines for all fitness levels and goals",
    icon: Dumbbell,
    color: "orange"
  },
  yoga: {
    title: "Yoga & Mindfulness",
    description: "Find inner peace and physical balance through yoga practice and mindfulness techniques",
    icon: MessageSquareOff,
    color: "purple"
  }
};

export default function CategoryPage({ category }: CategoryPageProps) {
  const config = categoryConfig[category as keyof typeof categoryConfig];
  const videos = getCategoryVideos(category);

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
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          <IconComponent className={`${iconColorClass} inline mr-3`} />
          {config.title}
        </h1>
        <p className="text-lg text-gray-800">{config.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            description={video.description}
            channel={video.channel}
            views={video.views}
            duration={video.duration}
            embedUrl={video.embedUrl}
          />
        ))}
      </div>
    </div>
  );
}
