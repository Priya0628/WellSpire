import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatbotPromoProps {
  onOpenChatbot: () => void;
}

export default function ChatbotPromo({ onOpenChatbot }: ChatbotPromoProps) {
  return (
    <div className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 text-white py-8 px-6 rounded-xl shadow-2xl mb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <div className="bg-white/20 p-2 rounded-full mr-3">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                NEW: AI-Powered Wellness Assistant
              </span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">
            Get Personalized Wellness Guidance
          </h3>
          <p className="text-white/90 mb-4 text-lg">
            Chat with our AI assistant powered by OpenAI GPT-4 for instant nutrition advice, workout tips, and mindfulness guidance tailored just for you.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🥗 Nutrition</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">💪 Fitness</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🧘 Mindfulness</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">❤️ Wellness</span>
          </div>
        </div>
        
        <div className="ml-6">
          <Button
            onClick={onOpenChatbot}
            className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Try AI Chat Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}