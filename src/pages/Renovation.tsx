import { useEffect, useState } from "react";
import { FileText, Upload } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RenovationDocument {
  id: string;
  title: string;
  description: string | null;
  document_path: string;
  created_at: string;
  url?: string;
}

const Renovation = () => {
  const [documents, setDocuments] = useState<RenovationDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('legal_documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Klaida",
        description: "Nepavyko gauti dokumentų sąrašo",
        variant: "destructive",
      });
      return;
    }

    // Get URLs for all documents
    const documentsWithUrls = await Promise.all((data || []).map(async (doc) => {
      const { data: urlData } = await supabase.storage
        .from('renovation_documents')
        .getPublicUrl(doc.document_path);
      return { ...doc, url: urlData.publicUrl };
    }));

    setDocuments(documentsWithUrls);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!file || !title) {
        throw new Error("Prašome užpildyti privalomus laukus");
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      if (description) {
        formData.append('description', description);
      }

      const response = await supabase.functions.invoke('upload-renovation-document', {
        body: formData,
      });

      if (response.error) throw new Error('Nepavyko įkelti dokumento');

      toast({
        title: "Sėkmingai įkelta",
        description: "Dokumentas buvo sėkmingai įkeltas",
      });

      setTitle("");
      setDescription("");
      setFile(null);
      fetchDocuments();
    } catch (error) {
      toast({
        title: "Klaida",
        description: error instanceof Error ? error.message : "Įvyko nenumatyta klaida",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Renovacija</h1>

        {/* Upload Form */}
        <div className="p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Pavadinimas *
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Aprašymas
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-300">
                Dokumentas *
              </label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="mt-1"
                accept=".pdf,.doc,.docx"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                "Įkeliama..."
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Įkelti dokumentą
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Renovation;
