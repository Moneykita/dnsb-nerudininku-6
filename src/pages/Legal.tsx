
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { LegalDocument } from "@/types/legal";
import { LegalDocumentCard } from "@/components/legal/LegalDocumentCard";
import { 
  fetchLegalDocuments, 
  updateLegalDocument, 
  deleteLegalDocument 
} from "@/services/legalService";

const Legal = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadDocuments = async () => {
    try {
      const docs = await fetchLegalDocuments();
      setDocuments(docs);
    } catch (error) {
      toast({
        title: "Klaida",
        description: "Nepavyko gauti dokumentų sąrašo",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpdate = async (document: LegalDocument, file: File | null, externalUrl: string) => {
    setLoading(true);
    try {
      await updateLegalDocument(document, file, externalUrl);
      toast({
        title: "Sėkmingai atnaujinta",
        description: "Dokumentas buvo sėkmingai atnaujintas",
      });
      await loadDocuments();
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
      await deleteLegalDocument(document);
      toast({
        title: "Sėkmingai ištrinta",
        description: "Dokumentas buvo sėkmingai ištrintas",
      });
      await loadDocuments();
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
            <LegalDocumentCard
              key={doc.id}
              document={doc}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              isLoading={loading}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Legal;
