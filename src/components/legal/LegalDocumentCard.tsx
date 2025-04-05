import { LegalDocument } from "@/types/legal";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Trash2 } from "lucide-react";
import { EditDocumentSheet } from "./EditDocumentSheet";
interface LegalDocumentCardProps {
  document: LegalDocument;
  onUpdate: (document: LegalDocument, file: File | null, externalUrl: string) => Promise<void>;
  onDelete: (document: LegalDocument) => Promise<void>;
  isLoading: boolean;
}
export const LegalDocumentCard = ({
  document,
  onUpdate,
  onDelete,
  isLoading
}: LegalDocumentCardProps) => {
  return <div className="rounded-lg shadow-md p-6 bg-slate-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-50">{document.title}</h3>
          {(document.document_path || document.external_url) && <div className="mt-2 text-sm text-gray-500">
              Atnaujinta: {new Date(document.last_updated_at || document.created_at).toLocaleDateString('lt-LT')}
            </div>}
        </div>

        <div className="flex items-center space-x-2">
          {(document.url || document.external_url) && <a href={document.url || document.external_url || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 p-2">
              {document.url ? <FileText className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
            </a>}

          <EditDocumentSheet document={document} onUpdate={onUpdate} isLoading={isLoading} />

          {(document.document_path || document.external_url) && <Button variant="ghost" size="icon" onClick={() => onDelete(document)}>
              <Trash2 className="w-5 h-5 text-red-600" />
            </Button>}
        </div>
      </div>
    </div>;
};