import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Calendar, FileText } from "lucide-react";

interface ScrapeRecord {
  id: string;
  location: string;
  searchString: string;
  maxPlaces: number;
  date: string;
  htmlTable: string;
}

interface ScrapeHistoryProps {
  onSelect: (record: ScrapeRecord) => void;
}

export const ScrapeHistory = ({ onSelect }: ScrapeHistoryProps) => {
  const [history, setHistory] = useState<ScrapeRecord[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("scrapeHistory") || "[]");
    setHistory(data);
  }, []);

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p>No scrapes yet. Start by extracting your first leads!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Past Scrapes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((record) => (
          <Card 
            key={record.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(record)}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-start gap-2">
                <Search className="h-5 w-5 mt-1 flex-shrink-0" />
                <span className="line-clamp-2">{record.searchString}</span>
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4" />
                {record.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                {record.date}
              </div>
              <p className="text-sm text-muted-foreground">
                Max places: {record.maxPlaces}
              </p>
              <Button variant="outline" className="w-full mt-4" size="sm">
                View Results
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
