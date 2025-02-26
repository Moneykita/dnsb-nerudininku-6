import { LegalDocument } from "@/types/legal";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Trash2 } from "lucide-react";
import { EditDocumentSheet } from "./EditDocumentSheet";
import { cn } from "@/lib/utils";

interface LegalDocumentCardProps {
  document: LegalDocument;
  onUpdate: (document: LegalDocument, file: File | null, externalUrl: string) => Promise<void>;
  onDelete: (document: LegalDocument) => Promise<void>;
  isLoading: boolean;
}

const documentTypeMap: Record<string, string> = {
  'statute': 'Bendrijos įstatai',
  'voting': 'Butų ir kitų patalpų savininkų balsavimo raštu tvarka',
  'funding': 'Butų ir kitų patalpų savininkų lėšų kaupimo tvarka',
  'technical': 'STR. Statinių techninės ir naudojimo priežiūros tvarka',
  'cleanliness': 'Tvarkos ir švaros taisyklės',
  'noise': 'Triukšmo valdymo įstatymas ir taisyklės',
  'pets': 'Gyvūnų auginimo ir laikymo taisyklės'
};

export const LegalDocumentCard = ({ 
  document, 
  onUpdate, 
  onDelete, 
  isLoading 
}: LegalDocumentCardProps) => {
  const hasDocument = document.document_path || document.external_url;

  return (
    <div className="flex items-start justify-between p-4 bg-gray-700 rounded-lg">
      <div className="flex-1">
        <h3 className="font-medium">
          {documentTypeMap[document.document_type] || document.title}
        </h3>
        {document.description && (
          <p className="text-sm text-gray-400 mt-1">{document.description}</p>
        )}
        <p className="text-sm text-gray-400 mt-1">
          Atnaujinta: {new Date(document.last_updated_at || document.created_at).toLocaleDateString('lt-LT')}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        {(document.url || document.external_url) && (
          <a
            href={document.url || document.external_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            {document.url ? (
              <>
                <FileText className="w-4 h-4 mr-1" />
                Atsisiųsti
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-1" />
                Atidaryti
              </>
            )}
          </a>
        )}

        <EditDocumentSheet
          document={document}
          onUpdate={onUpdate}
          isLoading={isLoading}
        />

        {hasDocument && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(document);
            }}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
