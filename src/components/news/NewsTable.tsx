import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Paperclip } from "lucide-react";
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
  attachment_path: string | null;
  created_at: string;
  attachment_url?: string;
}

const NewsTable = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
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
        title: "Error",
        description: "Failed to fetch news items",
        variant: "destructive",
      });
      return;
    }

    // Get attachment URLs for all items with attachments
    const itemsWithUrls = await Promise.all((data || []).map(async (item) => {
      if (item.attachment_path) {
        const { data: urlData } = await supabase.storage
          .from('news_attachments')
          .getPublicUrl(item.attachment_path);
        return { ...item, attachment_url: urlData.publicUrl };
      }
      return item;
    }));

    setNewsItems(itemsWithUrls);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let attachmentPath = null;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await supabase.functions.invoke('upload-news-attachment', {
          body: formData,
        });

        if (response.error) throw new Error('Failed to upload file');
        attachmentPath = response.data.filePath;
      }

      const { error } = await supabase.from('news').insert({
        title,
        content,
        attachment_path: attachmentPath,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "News item added successfully",
      });

      setTitle("");
      setContent("");
      setFile(null);
      fetchNews();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add news item",
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
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Prisegti failą
          </label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="mt-1"
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
                <TableCell className="flex items-center gap-2">
                  {item.title}
                  {item.attachment_path && (
                    <Paperclip className="w-4 h-4 text-gray-400" />
                  )}
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
                    <div className="p-4 space-y-4">
                      <p className="whitespace-pre-wrap">{item.content}</p>
                      {item.attachment_path && item.attachment_url && (
                        <div>
                          <a
                            href={item.attachment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-2"
                          >
                            <Paperclip className="w-4 h-4" />
                            Atsisiųsti priedą
                          </a>
                        </div>
                      )}
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