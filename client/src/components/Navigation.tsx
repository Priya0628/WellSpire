import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Leaf, Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", id: "home" },
    { path: "/food", label: "Food & Nutrition", id: "food" },
    { path: "/health", label: "Health & Wellness", id: "health" },
    { path: "/workout", label: "Workout & Exercise", id: "workout" },
    { path: "/yoga", label: "Yoga & Mindfulness", id: "yoga" },
    { path: "/tips", label: "Community Tips", id: "tips" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Leaf className="text-primary text-2xl mr-2" />
              <span className="text-2xl font-bold text-primary">Wellspire</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path) 
                      ? "border-b-2 border-primary" 
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary transition-colors duration-200 ${
                  isActive(item.path) ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
