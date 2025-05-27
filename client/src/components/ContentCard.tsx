import { ExternalLink, Youtube, Lightbulb } from "lucide-react";

interface ContentCardProps {
  title: string;
  description: string;
  source: string;
  type: "channel" | "article" | "tip";
  url?: string;
  subscribers?: string;
}

export default function ContentCard({ title, description, source, type, url, subscribers }: ContentCardProps) {
  const isChannel = type === "channel";
  const isTip = type === "tip";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            {isChannel ? (
              <Youtube className="h-5 w-5 text-red-500 mr-2" />
            ) : (
              <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
            )}
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              {isChannel ? "YouTube Channel" : "Wellness Tip"}
            </span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-500">{source}</span>
          
          {isChannel && subscribers && (
            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{subscribers}</span>
          )}
          
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Visit Channel <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}