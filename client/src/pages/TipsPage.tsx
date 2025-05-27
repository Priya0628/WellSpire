import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTipSchema } from "@shared/schema";
import type { Tip, InsertTip } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import TipCard from "@/components/TipCard";
import { Users, Share } from "lucide-react";

export default function TipsPage() {
  const [filterCategory, setFilterCategory] = useState("");
  const { toast } = useToast();

  const form = useForm<InsertTip>({
    resolver: zodResolver(insertTipSchema),
    defaultValues: {
      username: "",
      category: "",
      content: ""
    }
  });

  const { data: tips = [], isLoading } = useQuery<Tip[]>({
    queryKey: ["/api/tips"]
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertTip) => {
      const response = await apiRequest("POST", "/api/tips", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tips"] });
      toast({
        title: "Success!",
        description: "Your wellness tip has been shared with the community."
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit your tip. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InsertTip) => {
    mutation.mutate(data);
  };

  const filteredTips = filterCategory
    ? tips.filter(tip => tip.category === filterCategory)
    : tips;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          <Users className="text-primary inline mr-3" />
          Community Tips
        </h1>
        <p className="text-lg text-gray-800">Share your wellness wisdom and discover insights from our community</p>
      </div>

      {/* Tips Submission Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Share Your Wellness Tip</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="food">Food & Nutrition</SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="workout">Workout & Exercise</SelectItem>
                      <SelectItem value="yoga">Yoga & Mindfulness</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Tip</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your wellness tip with the community..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90" 
              disabled={mutation.isPending}
            >
              <Share className="mr-2 h-4 w-4" />
              {mutation.isPending ? "Sharing..." : "Share Tip"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Community Tips Display */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Community Wellness Tips</h2>
        
        {/* Filter by Category */}
        <div className="mb-6">
          <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="food">Food & Nutrition</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="workout">Workout & Exercise</SelectItem>
              <SelectItem value="yoga">Yoga & Mindfulness</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tips Grid */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading community tips...</p>
          </div>
        ) : filteredTips.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              {filterCategory 
                ? "No tips found for this category. Be the first to share!" 
                : "No tips yet. Be the first to share your wellness wisdom!"
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip) => (
              <TipCard
                key={tip.id}
                username={tip.username}
                category={tip.category}
                content={tip.content}
                createdAt={tip.createdAt.toString()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
