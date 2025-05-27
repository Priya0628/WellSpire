import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import TipsPage from "@/pages/TipsPage";
import NotFound from "@/pages/not-found";
import { Leaf } from "lucide-react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/food">
        <CategoryPage category="food" />
      </Route>
      <Route path="/health">
        <CategoryPage category="health" />
      </Route>
      <Route path="/workout">
        <CategoryPage category="workout" />
      </Route>
      <Route path="/yoga">
        <CategoryPage category="yoga" />
      </Route>
      <Route path="/tips" component={TipsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="text-primary text-2xl mr-2" />
            <span className="text-2xl font-bold">Wellspire</span>
          </div>
          <p className="text-gray-300 mb-4">Your journey to wellness starts here</p>
          <p className="text-sm text-gray-400">&copy; 2024 Wellspire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
