import { useQuery } from "@tanstack/react-query";
import { Sparkles, TrendingUp } from "lucide-react";
import ContentCard from "./ContentCard";

interface RecommendationSectionProps {
  username?: string;
  category?: string;
  title?: string;
  maxItems?: number;
}

export default function RecommendationSection({ 
  username = "anonymous", 
  category, 
  title = "Recommended for You",
  maxItems = 3 
}: RecommendationSectionProps) {
  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ['/api/recommendations', username, category],
    queryFn: async () => {
      const url = category 
        ? `/api/recommendations/${username}?category=${category}`
        : `/api/recommendations/${username}`;
      const response = await fetch(url);
      return response.json();
    },
    enabled: !!username
  });

  // Don't show if no recommendations
  if (!recommendations.length && !isLoading) {
    return null;
  }

  const displayRecommendations = recommendations.slice(0, maxItems);

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: maxItems }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-32 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayRecommendations.map((rec: any) => (
            <ContentCard
              key={rec.id}
              title={rec.title}
              description={rec.description}
              source={rec.source}
              type={rec.type}
              url={rec.url}
              subscribers={rec.subscribers}
            />
          ))}
        </div>
      )}
      
      {recommendations.length > maxItems && (
        <div className="text-center mt-4">
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            View more recommendations
          </button>
        </div>
      )}
    </div>
  );
}