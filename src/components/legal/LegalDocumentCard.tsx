
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
    <div className={cn(
      "bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-all duration-200",
      hasDocument && "hover:shadow-lg cursor-pointer"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">
            {documentTypeMap[document.document_type] || document.title}
            <span className="text-gray-400 ml-1">:</span>
          </h3>
          {document.description && (
            <p className="text-gray-600 text-sm mb-3">{document.description}</p>
          )}
          {hasDocument && (
            <div className="text-sm text-gray-500">
              Atnaujinta: {new Date(document.last_updated_at || document.created_at).toLocaleDateString('lt-LT')}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {(document.url || document.external_url) && (
            <a
              href={document.url || document.external_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 p-2"
            >
              {document.url ? <FileText className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
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
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
