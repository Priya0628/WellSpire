import { useState } from "react";
import { Link } from "wouter";
import { Play, Users, Apple, Heart, Dumbbell, MessageSquareOff, MapPin, Calendar, Smartphone, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Tip } from "@shared/schema";
import TipCard from "@/components/TipCard";
import RetreatModal from "@/components/RetreatModal";

export default function Home() {
  const [selectedRetreat, setSelectedRetreat] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tips = [] } = useQuery<Tip[]>({
    queryKey: ["/api/tips"]
  });

  // Show latest 3 tips for the timeline
  const latestTips = tips.slice(0, 3);

  const handleRetreatClick = (name: string) => {
    setSelectedRetreat(name);
    setIsModalOpen(true);
  };

  const retreatPlaces = [
    {
      name: "Rishikesh, India",
      description: "Yoga capital of the world with spiritual ashrams and meditation centers",
      icon: "🧘‍♀️"
    },
    {
      name: "Tulum, Mexico", 
      description: "Beachfront wellness retreats combining ancient Mayan wisdom with modern healing",
      icon: "🏝️"
    },
    {
      name: "Bali, Indonesia",
      description: "Tropical paradise offering holistic healing, yoga, and wellness experiences",
      icon: "🌺"
    },
    {
      name: "Costa Rica",
      description: "Eco-wellness retreats in rainforests with focus on sustainable living",
      icon: "🌿"
    }
  ];

  const categoryCards = [
    {
      id: "food",
      title: "Food & Nutrition",
      description: "Learn about healthy eating, meal planning, and nutritional science",
      icon: Apple,
      color: "green",
      bgClass: "bg-gradient-to-br from-green-50 to-green-100",
      iconBg: "bg-green-500",
      textColor: "text-green-600 hover:text-green-700"
    },
    {
      id: "health", 
      title: "Health & Wellness",
      description: "Discover mental health tips, lifestyle changes, and wellness practices",
      icon: Heart,
      color: "blue",
      bgClass: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
      textColor: "text-blue-600 hover:text-blue-700"
    },
    {
      id: "workout",
      title: "Workout & Exercise", 
      description: "Find fitness routines, strength training, and cardio workouts",
      icon: Dumbbell,
      color: "orange",
      bgClass: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconBg: "bg-orange-500",
      textColor: "text-orange-600 hover:text-orange-700"
    },
    {
      id: "yoga",
      title: "Yoga & Mindfulness",
      description: "Practice yoga, meditation, and mindfulness techniques", 
      icon: MessageSquareOff,
      color: "purple",
      bgClass: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-500",
      textColor: "text-purple-600 hover:text-purple-700"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Your Wellness Journey Starts Here ✨
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Wellspire</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              A refreshing space for wellness inspiration. Discover curated videos and uplifting tips to support you on your journey to feeling your best.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/food">
                <button className="group bg-gradient-to-r from-primary to-primary/90 text-white px-10 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <Play className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                  Explore Wellness Videos
                </button>
              </Link>
              <Link href="/tips">
                <button className="group bg-white text-primary border-2 border-primary px-10 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg flex items-center justify-center">
                  <Users className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                  Join Our Community
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Discover Your Wellness Path</h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto">Explore curated videos and YouTube shorts to inspire your wellness journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <Link key={card.id} href={`/${card.id}`}>
                  <div className={`category-card ${card.bgClass} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}>
                    <div className="text-center">
                      <div className={`${card.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="text-white h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{card.title}</h3>
                      <p className="text-gray-800 text-sm mb-4">{card.description}</p>
                      <span className={`${card.textColor} font-medium transition-colors duration-200`}>
                        Explore Videos →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calorie Tracking Hint Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Track Your Nutrition Journey</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Complement your wellness learning with practical tracking. Apps like MyFitnessPal can help you understand your eating patterns and make informed choices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Log Your Food</h3>
                <p className="text-gray-600">Track what you eat to understand your nutrition patterns and make mindful choices.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Apple className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Learn About Nutrients</h3>
                <p className="text-gray-600">Discover the nutritional value of foods and how they fuel your body.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Build Healthy Habits</h3>
                <p className="text-gray-600">Use insights from tracking to develop sustainable, healthy eating habits.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 mb-4">
                💡 <strong>Tip:</strong> Start small - even tracking for a few days can provide valuable insights about your eating patterns.
              </p>
              <div className="inline-flex items-center bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-600">
                Popular apps: MyFitnessPal • Cronometer • Lose It!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Tips Timeline */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Latest Community Tips</h2>
            <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">Real experiences from people on their wellness journey</p>
          </div>
          
          {latestTips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {latestTips.map((tip) => (
                <TipCard
                  key={tip.id}
                  username={tip.username}
                  category={tip.category}
                  content={tip.content}
                  createdAt={tip.createdAt.toString()}
                />
              ))}
            </div>
          ) : (
            <div className="text-center mb-8">
              <p className="text-gray-600">Loading wellness tips from our community...</p>
            </div>
          )}
          
          <div className="text-center">
            <Link href="/tips">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 transform hover:scale-105">
                <Users className="inline mr-2 h-4 w-4" />
                View All Tips & Share Yours
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Wellness Retreats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Wellness Retreat Destinations</h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto">Discover transformative places around the world for your wellness journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {retreatPlaces.map((place, index) => (
              <div 
                key={index} 
                onClick={() => handleRetreatClick(place.name)}
                className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{place.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center justify-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    {place.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{place.description}</p>
                  <p className="text-primary text-xs font-medium">Click to view centers →</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 text-sm">
              <Calendar className="inline h-4 w-4 mr-1" />
              Consider visiting these destinations for immersive wellness experiences and personal transformation
            </p>
          </div>
        </div>
      </section>
      
      {/* Retreat Modal */}
      <RetreatModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        destination={selectedRetreat || ""}
        centers={[]}
      />
    </div>
  );
}
