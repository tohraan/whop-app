import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadScraperForm } from "@/components/LeadScraperForm";
import { LeadResultsTable } from "@/components/LeadResultsTable";
import { ScrapeHistory } from "@/components/ScrapeHistory";
import { MapPin, TrendingUp, Zap, ArrowRight } from "lucide-react";

const Index = () => {
  const [showScraper, setShowScraper] = useState(false);
  const [scrapedData, setScrapedData] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    location: string;
    searchString: string;
    maxPlaces: number;
  } | null>(null);

  const handleScrapingSuccess = (data: string, form: { location: string; searchString: string; maxPlaces: number }) => {
    setScrapedData(data);
    setFormData(form);
    
    // Save to localStorage
    const newScrape = {
      id: Date.now().toString(),
      location: form.location,
      searchString: form.searchString,
      maxPlaces: form.maxPlaces,
      date: new Date().toLocaleString(),
      htmlTable: data,
    };
    
    const prev = JSON.parse(localStorage.getItem("scrapeHistory") || "[]");
    localStorage.setItem("scrapeHistory", JSON.stringify([newScrape, ...prev]));
  };

  const handleHistorySelect = (record: any) => {
    setScrapedData(record.htmlTable);
    setShowScraper(true);
  };

  if (showScraper) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Google Maps Lead Extractor</h1>
            </div>
            <Button variant="outline" onClick={() => setShowScraper(false)}>
              Back to Home
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {!scrapedData ? (
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Extract Business Leads</CardTitle>
                  <CardDescription>
                    Enter your search criteria to scrape business information from Google Maps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadScraperForm onSuccess={handleScrapingSuccess} />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Your Extracted Leads</h2>
                  <p className="text-muted-foreground mt-1">
                    Review and export your business leads
                  </p>
                </div>
                <Button onClick={() => setScrapedData(null)} variant="outline">
                  New Search
                </Button>
              </div>
              <LeadResultsTable htmlContent={scrapedData} />
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-10"></div>
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="h-4 w-4" />
              Instant Lead Generation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Extract Verified Business Leads from{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Google Maps
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get contact information, reviews, and location data for businesses in any location.
              Perfect for B2B sales, marketing, and research.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setShowScraper(true)}
            >
              Start Extracting Leads
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Lead Extractor?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fast, accurate, and easy to use. Get the data you need in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Location-Based Search</CardTitle>
                <CardDescription>
                  Target businesses in specific cities, regions, or countries with precision
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Comprehensive Data</CardTitle>
                <CardDescription>
                  Extract names, addresses, websites, phone numbers, reviews, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Instant Export</CardTitle>
                <CardDescription>
                  Download results as HTML or PDF with customizable column visibility
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-xl max-w-4xl mx-auto">
            <CardHeader className="text-center space-y-4 pb-8">
              <CardTitle className="text-3xl md:text-4xl">
                Ready to Find Your Next Customers?
              </CardTitle>
              <CardDescription className="text-primary-foreground/90 text-lg">
                Start extracting high-quality business leads in seconds
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
                onClick={() => setShowScraper(true)}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scrape History Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrapeHistory onSelect={handleHistorySelect} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Google Maps Lead Extractor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
