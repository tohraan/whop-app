import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";

interface LeadScraperFormProps {
  onSuccess: (data: any, formData: { location: string; searchString: string; maxPlaces: number }) => void;
}

export const LeadScraperForm = ({ onSuccess }: LeadScraperFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    maxPlaces: "50",
    searchString: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.location || !formData.searchString) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(
        "https://tohraan1.app.n8n.cloud/webhook/571af4d9-16a3-4a84-9e3f-05712105043b",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "location ": formData.location,
            "max places crwaled ": parseInt(formData.maxPlaces),
            "search string array ": formData.searchString,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to scrape leads");
      }

      // Response is binary HTML, not JSON
      const blob = await response.blob();
      const htmlContent = await blob.text();
      
      if (!htmlContent) {
        toast.error("No data received from scraper");
      } else {
        onSuccess(htmlContent, {
          location: formData.location,
          searchString: formData.searchString,
          maxPlaces: parseInt(formData.maxPlaces),
        });
        toast.success("Leads extracted successfully!");
      }
    } catch (error) {
      console.error("Scraping error:", error);
      toast.error("Failed to extract leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          placeholder="e.g., New York, NY"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          disabled={loading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxPlaces">Max Places to Crawl</Label>
        <Input
          id="maxPlaces"
          type="number"
          min="1"
          max="500"
          placeholder="50"
          value={formData.maxPlaces}
          onChange={(e) => setFormData({ ...formData, maxPlaces: e.target.value })}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="searchString">Search String *</Label>
        <Input
          id="searchString"
          placeholder="e.g., restaurants, coffee shops, dentists"
          value={formData.searchString}
          onChange={(e) => setFormData({ ...formData, searchString: e.target.value })}
          disabled={loading}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Scraping Leads...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Extract Leads
          </>
        )}
      </Button>
    </form>
  );
};
