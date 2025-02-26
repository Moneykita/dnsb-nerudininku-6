import { useState } from "react";
import { LegalDocument } from "@/types/legal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [description, setDescription] = useState(document.description || "");

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
          className="text-blue-400 hover:text-blue-300"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-gray-800 text-gray-100">
        <SheetHeader>
          <SheetTitle className="text-gray-100">Redaguoti dokumentą</SheetTitle>
          <SheetDescription className="text-gray-300">{document.title}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Aprašymas
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Įveskite dokumento aprašymą..."
              className="min-h-[100px] bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Įkelti dokumentą
            </label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              arba įveskite nuorodą
            </label>
            <Input
              type="url"
              value={externalUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://"
              className="bg-gray-700 border-gray-600 text-gray-100"
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
