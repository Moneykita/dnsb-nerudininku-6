
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, UploadCloud } from "lucide-react";

const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "Klaida",
        description: "Failas per didelis. Maksimalus dydis yra 10MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    const fileType = selectedFile.type;
    if (!['application/pdf', 'image/jpeg', 'image/jpg'].includes(fileType)) {
      toast({
        title: "Klaida",
        description: "Netinkamas failo formatas. Galimi formatai: .jpg, .pdf",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    if (file) {
      formData.append('file', file);
    }

    try {
      const { data, error } = await supabase.functions.invoke('handle-contact-form', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Sėkmingai išsiųsta",
        description: "Jūsų žinutė sėkmingai išsiųsta",
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setFile(null);
    } catch (error) {
      toast({
        title: "Klaida",
        description: "Nepavyko išsiųsti žinutės. Bandykite dar kartą.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Parašyti mums</h1>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Vardas *
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jūsų vardas"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                El. paštas *
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="jusu@pastas.lt"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Žinutė *
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Jūsų žinutė"
                className="min-h-[150px]"
              />
            </div>

            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                Prisegti failą
              </label>
              <div className="mt-1 flex items-center gap-4">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.pdf"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file')?.click()}
                  className="w-full"
                >
                  <UploadCloud className="mr-2 h-4 w-4" />
                  {file ? file.name : "Įkelti failą (.jpg, .pdf)"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Maksimalus failo dydis: 10MB. Galimi formatai: .jpg, .pdf
              </p>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Siunčiama...
                </>
              ) : (
                "Siųsti"
              )}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
