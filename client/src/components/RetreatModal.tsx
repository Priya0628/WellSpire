import { useState } from "react";
import { X, MapPin, Phone, Globe, Star } from "lucide-react";

interface RetreatCenter {
  name: string;
  description: string;
  location: string;
  website?: string;
  phone?: string;
  rating: number;
  specialties: string[];
}

interface RetreatModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  centers: RetreatCenter[];
}

const retreatCenters: Record<string, RetreatCenter[]> = {
  "Rishikesh, India": [
    {
      name: "Ananda in the Himalayas",
      description: "Luxury wellness retreat combining traditional Ayurveda with modern spa treatments",
      location: "Narendra Nagar, Rishikesh",
      website: "anandaspa.com",
      rating: 4.8,
      specialties: ["Ayurveda", "Yoga", "Meditation", "Detox"]
    },
    {
      name: "Vana Wellness Retreat",
      description: "Holistic wellness sanctuary focusing on mind-body-spirit harmony",
      location: "Dehradun, near Rishikesh",
      website: "vana.co.in",
      rating: 4.9,
      specialties: ["Tibetan Medicine", "Yoga Therapy", "Sowa Rigpa", "Mindfulness"]
    },
    {
      name: "Parmarth Niketan Ashram",
      description: "Traditional ashram offering authentic spiritual and yoga experiences",
      location: "Swarg Ashram, Rishikesh",
      website: "parmarth.org",
      rating: 4.6,
      specialties: ["Traditional Yoga", "Meditation", "Spiritual Healing", "Ganga Aarti"]
    }
  ],
  "Tulum, Mexico": [
    {
      name: "Ahau Tulum",
      description: "Beachfront eco-resort with focus on holistic wellness and Mayan traditions",
      location: "Tulum Beach Zone",
      website: "ahaututlum.com",
      rating: 4.7,
      specialties: ["Temazcal Ceremonies", "Beach Yoga", "Mayan Healing", "Sound Therapy"]
    },
    {
      name: "Amansala",
      description: "Wellness resort offering yoga, nutrition, and bikini bootcamp programs",
      location: "Tulum Beachfront",
      website: "amansala.com",
      rating: 4.5,
      specialties: ["Yoga Teacher Training", "Fitness Bootcamps", "Nutrition Coaching", "Breathwork"]
    },
    {
      name: "Azulik Wellness Center",
      description: "Eco-luxury treehouse resort with integrated wellness experiences",
      location: "Tulum Jungle",
      website: "azulik.com",
      rating: 4.8,
      specialties: ["Forest Bathing", "Ancestral Ceremonies", "Art Therapy", "Reconnection Rituals"]
    }
  ],
  "Bali, Indonesia": [
    {
      name: "COMO Shambhala Estate",
      description: "Luxury wellness retreat in tropical rainforest setting",
      location: "Ubud, Bali",
      website: "comohotels.com/shambhala",
      rating: 4.9,
      specialties: ["Ayurveda", "Traditional Indonesian Healing", "Nutrition", "Fitness"]
    },
    {
      name: "Fivelements Retreat",
      description: "Award-winning eco-wellness retreat focused on Balinese healing traditions",
      location: "Mambal, Bali",
      website: "fivelements.com",
      rating: 4.8,
      specialties: ["Raw Food Cuisine", "Sacred Arts", "Plant Medicine", "Energy Healing"]
    },
    {
      name: "The Yoga Barn",
      description: "Community-centered yoga and wellness space in the heart of Ubud",
      location: "Ubud, Bali",
      website: "theyogabarn.com",
      rating: 4.7,
      specialties: ["Yoga Classes", "Meditation", "Sound Healing", "Community Wellness"]
    }
  ],
  "Costa Rica": [
    {
      name: "Nayara Gardens",
      description: "Luxury rainforest resort with comprehensive wellness programs",
      location: "Arenal Volcano, Costa Rica",
      website: "nayararesorts.com",
      rating: 4.8,
      specialties: ["Adventure Therapy", "Rainforest Healing", "Thermal Springs", "Wildlife Therapy"]
    },
    {
      name: "Bodhi Tree Yoga Resort",
      description: "Sustainable yoga retreat center in pristine jungle setting",
      location: "Nosara, Costa Rica",
      website: "bodhitreeyogaresort.com",
      rating: 4.6,
      specialties: ["Yoga Teacher Training", "Surf Therapy", "Permaculture", "Digital Detox"]
    },
    {
      name: "Xandari Resort & Spa",
      description: "Boutique eco-resort with award-winning spa and wellness programs",
      location: "Alajuela, Costa Rica",
      website: "xandari.com",
      rating: 4.7,
      specialties: ["Coffee Plantation Wellness", "Organic Spa Treatments", "Bird Watching Therapy", "Sustainable Living"]
    }
  ]
};

export default function RetreatModal({ isOpen, onClose, destination, centers }: RetreatModalProps) {
  const retreatList = retreatCenters[destination] || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Wellness Retreats in {destination}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid gap-6">
            {retreatList.map((center, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{center.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {center.location}
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{center.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{center.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {center.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                {center.website && (
                  <div className="flex items-center text-sm text-primary">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{center.website}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}