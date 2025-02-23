
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const NewsTable = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Klaida",
        description: "Nepavyko gauti naujienų sąrašo",
        variant: "destructive",
      });
      return;
    }

    setNewsItems(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('news').insert({
        title,
        content,
      });

      if (error) throw error;

      toast({
        title: "Sėkmingai pridėta",
        description: "Naujiena sėkmingai pridėta",
      });

      setTitle("");
      setContent("");
      fetchNews();
    } catch (error) {
      toast({
        title: "Klaida",
        description: "Nepavyko pridėti naujienos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="w-full space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Pavadinimas
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Turinys
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[150px]"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Įkeliama..." : "Pridėti naujieną"}
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Data</TableHead>
            <TableHead>Pavadinimas</TableHead>
            <TableHead className="w-[100px]">Veiksmai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsItems.map((item) => (
            <React.Fragment key={item.id}>
              <TableRow 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => toggleRow(item.id)}
              >
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString('lt-LT')}
                </TableCell>
                <TableCell>
                  {item.title}
                </TableCell>
                <TableCell>
                  {expandedRow === item.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </TableCell>
              </TableRow>
              {expandedRow === item.id && (
                <TableRow>
                  <TableCell colSpan={3} className="bg-gray-50">
                    <div className="p-4">
                      <p className="whitespace-pre-wrap">{item.content}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NewsTable;
