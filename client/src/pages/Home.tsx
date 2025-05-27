import { Link } from "wouter";
import { Play, Users, Apple, Heart, Dumbbell, MessageSquareOff, MapPin, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Tip } from "@shared/schema";
import TipCard from "@/components/TipCard";

export default function Home() {
  const { data: tips = [] } = useQuery<Tip[]>({
    queryKey: ["/api/tips"]
  });

  // Show latest 3 tips for the timeline
  const latestTips = tips.slice(0, 3);

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
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-primary">Wellspire</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-3xl mx-auto">
              A refreshing space for wellness inspiration. Discover curated videos and uplifting tips to support you on your journey to feeling your best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/food">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 transform hover:scale-105">
                  <Play className="inline mr-2 h-4 w-4" />
                  Explore Videos
                </button>
              </Link>
              <Link href="/tips">
                <button className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-105">
                  <Users className="inline mr-2 h-4 w-4" />
                  Share & Discover Tips
                </button>
              </Link>
            </div>
          </div>
        </div>
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
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="text-center">
                  <div className="text-4xl mb-4">{place.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center justify-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    {place.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{place.description}</p>
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
    </div>
  );
}
