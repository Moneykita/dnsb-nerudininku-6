
import { useState } from "react";
import { LegalDocument } from "@/types/legal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit2 } from "lucide-react";

interface EditDocumentSheetProps {
  document: LegalDocument;
  onUpdate: (document: LegalDocument, file: File | null, externalUrl: string) => Promise<void>;
  isLoading: boolean;
}

export const EditDocumentSheet = ({ document, onUpdate, isLoading }: EditDocumentSheetProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState(document.external_url || "");

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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
        >
          <Edit2 className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Redaguoti dokumentą</SheetTitle>
          <SheetDescription>{document.title}</SheetDescription>
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
            onClick={() => onUpdate(document, file, externalUrl)} 
            disabled={isLoading || (!file && !externalUrl)}
            className="w-full"
          >
            {isLoading ? "Išsaugoma..." : "Išsaugoti"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
