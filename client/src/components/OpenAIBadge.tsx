import { Sparkles } from "lucide-react";

interface OpenAIBadgeProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "gradient";
}

export default function OpenAIBadge({ size = "md", variant = "light" }: OpenAIBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5", 
    lg: "text-base px-4 py-2"
  };

  const variantClasses = {
    light: "bg-white/10 text-white border border-white/20",
    dark: "bg-black/10 text-gray-800 border border-gray-200",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
  };

  return (
    <div className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${variantClasses[variant]}`}>
      <Sparkles className="h-3 w-3 mr-1" />
      <span>Powered by OpenAI GPT-4</span>
    </div>
  );
}