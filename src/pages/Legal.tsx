
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { LegalDocument } from "@/types/legal";
import { LegalDocumentCard } from "@/components/legal/LegalDocumentCard";
import { fetchLegalDocuments, updateLegalDocument, deleteLegalDocument } from "@/services/legalService";

// Define the order of document types
const documentTypeOrder = ['statute', 'voting', 'funding', 'technical', 'cleanliness', 'noise', 'pets'];
const Legal = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const loadDocuments = async () => {
    try {
      const docs = await fetchLegalDocuments();
      // Sort documents according to the predefined order
      const sortedDocs = [...docs].sort((a, b) => {
        const indexA = documentTypeOrder.indexOf(a.document_type);
        const indexB = documentTypeOrder.indexOf(b.document_type);
        return indexA - indexB;
      });
      setDocuments(sortedDocs);
    } catch (error) {
      toast({
        title: "Klaida",
        description: "Nepavyko gauti dokumentų sąrašo",
        variant: "destructive"
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
        description: "Dokumentas buvo sėkmingai atnaujintas"
      });
      await loadDocuments();
    } catch (error) {
      toast({
        title: "Klaida",
        description: error instanceof Error ? error.message : "Įvyko nenumatyta klaida",
        variant: "destructive"
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
        description: "Dokumentas buvo sėkmingai ištrintas"
      });
      await loadDocuments();
    } catch (error) {
      toast({
        title: "Klaida",
        description: "Nepavyko ištrinti dokumento",
        variant: "destructive"
      });
    }
  };
  return <Layout>
      <div 
        className="container mx-auto px-4 py-8"
        style={{
          background: `url('/lovable-uploads/7a26c5f7-e712-46fc-84dd-5a3a9e59b7f4.png') no-repeat center center`,
          backgroundSize: 'cover',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}
      >
        <h1 className="text-3xl font-bold mb-6 text-white">Teisės aktai</h1>
        
        {/* Documents List */}
        <div className="p-6 bg-gray-700 bg-opacity-80 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Dokumentų sąrašas</h2>
          <div className="space-y-4">
            {documents.length === 0 ? <p className="text-gray-300">Nėra įkeltų dokumentų.</p> : documents.map(doc => <LegalDocumentCard key={doc.id} document={doc} onUpdate={handleUpdate} onDelete={handleDelete} isLoading={loading} />)}
          </div>
        </div>
      </div>
    </Layout>;
};
export default Legal;
