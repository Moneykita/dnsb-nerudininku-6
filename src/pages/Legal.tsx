import { useEffect, useState } from "react";
import { FileText, Upload, Trash2, ExternalLink, Edit2, Eye, Save, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface LegalDocument {
  id: string;
  title: string;
  description: string | null;
  document_path: string | null;
  external_url: string | null;
  document_type: string;
  created_at: string;
  last_updated_at: string;
  url?: string;
}

const Legal = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingDoc, setEditingDoc] = useState<LegalDocument | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const { toast } = useToast();

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_documents')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        toast({
          title: "Klaida",
          description: "Nepavyko gauti dokumentų sąrašo",
          variant: "destructive",
        });
        return;
      }

      const documentsWithUrls = await Promise.all((data || []).map(async (doc) => {
        let url = null;
        if (doc.document_path) {
          const { data: urlData } = await supabase.storage
            .from('legal_documents')
            .getPublicUrl(doc.document_path);
          url = urlData.publicUrl;
        }

        return {
          id: doc.id,
          title: doc.title,
          description: doc.description,
          document_path: doc.document_path,
          external_url: doc.external_url || null,
          document_type: doc.document_type,
          created_at: doc.created_at,
          last_updated_at: doc.last_updated_at || doc.created_at,
          url: url,
        } as LegalDocument;
      }));

      setDocuments(documentsWithUrls);
    } catch (error) {
      toast({
        title: "Klaida",
        description: "Nepavyko gauti dokumentų sąrašo",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExternalUrl("");
    }
  };

  const handleUrlChange = (url: string) => {
    setExternalUrl(url);
    setFile(null);
  };

  const handleUpdate = async (document: LegalDocument) => {
    setLoading(true);

    try {
      let document_path = document.document_path;
      
      if (file) {
        if (document.document_path) {
          await supabase.storage
            .from('legal_documents')
            .remove([document.document_path]);
        }

        const fileExt = file.name.split('.').pop();
        document_path = `${document.document_type}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('legal_documents')
          .upload(document_path, file);

        if (uploadError) throw new Error('Nepavyko įkelti failo');
      }

      const { error: updateError } = await supabase
        .from('legal_documents')
        .update({
          document_path: file ? document_path : null,
          external_url: externalUrl || null,
          last_updated_at: new Date().toISOString(),
        })
        .eq('id', document.id);

      if (updateError) throw new Error('Nepavyko atnaujinti dokumento');

      toast({
        title: "Sėkmingai atnaujinta",
        description: "Dokumentas buvo sėkmingai atnaujintas",
      });

      setEditingDoc(null);
      setFile(null);
      setExternalUrl("");
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

  const handleDelete = async (document: LegalDocument) => {
    if (!window.confirm('Ar tikrai norite ištrinti šį dokumentą?')) return;

    try {
      if (document.document_path) {
        await supabase.storage
          .from('legal_documents')
          .remove([document.document_path]);
      }

      const { error: updateError } = await supabase
        .from('legal_documents')
        .update({
          document_path: null,
          external_url: null,
          last_updated_at: new Date().toISOString(),
        })
        .eq('id', document.id);

      if (updateError) throw new Error('Nepavyko ištrinti dokumento');

      toast({
        title: "Sėkmingai ištrinta",
        description: "Dokumentas buvo sėkmingai ištrintas",
      });

      fetchDocuments();
    } catch (error) {
      toast({
        title: "Klaida",
        description: "Nepavyko ištrinti dokumento",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Teisės aktai</h1>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{doc.title}</h3>
                  {(doc.document_path || doc.external_url) && (
                    <div className="mt-2 text-sm text-gray-500">
                      Atnaujinta: {new Date(doc.last_updated_at || doc.created_at).toLocaleDateString('lt-LT')}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {(doc.url || doc.external_url) && (
                    <a
                      href={doc.url || doc.external_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 p-2"
                    >
                      {doc.url ? <FileText className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                    </a>
                  )}

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setEditingDoc(doc);
                          setExternalUrl(doc.external_url || '');
                        }}
                      >
                        <Edit2 className="w-5 h-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Redaguoti dokumentą</SheetTitle>
                        <SheetDescription>{doc.title}</SheetDescription>
                      </SheetHeader>

                      <div className="space-y-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Įkelti dokumentą
                          </label>
                          <Input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            arba įveskite nuorodą
                          </label>
                          <Input
                            type="url"
                            value={externalUrl}
                            onChange={(e) => handleUrlChange(e.target.value)}
                            placeholder="https://"
                            className="mt-1"
                          />
                        </div>

                        <Button 
                          onClick={() => handleUpdate(doc)} 
                          disabled={loading || (!file && !externalUrl)}
                          className="w-full"
                        >
                          {loading ? "Išsaugoma..." : "Išsaugoti"}
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {(doc.document_path || doc.external_url) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(doc)}
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Legal;
