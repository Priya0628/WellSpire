import { User } from "lucide-react";

interface TipCardProps {
  username: string;
  category: string;
  content: string;
  createdAt: string;
}

const categoryConfig = {
  food: {
    name: "Food & Nutrition",
    color: "green",
    bgClass: "bg-gradient-to-br from-green-50 to-green-100",
    badgeClass: "bg-green-500",
    iconClass: "text-green-500"
  },
  health: {
    name: "Health & Wellness", 
    color: "blue",
    bgClass: "bg-gradient-to-br from-blue-50 to-blue-100",
    badgeClass: "bg-blue-500",
    iconClass: "text-blue-500"
  },
  workout: {
    name: "Workout & Exercise",
    color: "orange", 
    bgClass: "bg-gradient-to-br from-orange-50 to-orange-100",
    badgeClass: "bg-orange-500",
    iconClass: "text-orange-500"
  },
  yoga: {
    name: "Yoga & Mindfulness",
    color: "purple",
    bgClass: "bg-gradient-to-br from-purple-50 to-purple-100", 
    badgeClass: "bg-purple-500",
    iconClass: "text-purple-500"
  }
};

export default function TipCard({ username, category, content, createdAt }: TipCardProps) {
  const config = categoryConfig[category as keyof typeof categoryConfig];
  
  if (!config) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <div className={`tip-card ${config.bgClass} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`${config.badgeClass} text-white text-xs px-2 py-1 rounded-full font-medium`}>
          {config.name}
        </span>
        <span className="text-xs text-gray-500">{formatDate(createdAt)}</span>
      </div>
      <p className="text-gray-800 mb-3">"{content}"</p>
      <div className="flex items-center">
        <User className={`${config.iconClass} mr-2 h-4 w-4`} />
        <span className="text-sm font-medium text-gray-700">{username}</span>
      </div>
    </div>
  );
}
