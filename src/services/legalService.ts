
import { supabase } from "@/integrations/supabase/client";
import { DatabaseDocument, LegalDocument } from "@/types/legal";

export const fetchLegalDocuments = async (): Promise<LegalDocument[]> => {
  const { data, error } = await supabase
    .from('legal_documents')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new Error("Nepavyko gauti dokumentų sąrašo");

  return Promise.all((data || []).map(async (doc: DatabaseDocument) => {
    let url = null;
    if (doc.document_path) {
      const { data: urlData } = await supabase.storage
        .from('legal_documents')
        .getPublicUrl(doc.document_path);
      url = urlData.publicUrl;
    }

    return {
      ...doc,
      url
    };
  }));
};

export const updateLegalDocument = async (
  document: LegalDocument,
  file: File | null,
  externalUrl: string
) => {
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
    })
    .eq('id', document.id);

  if (updateError) throw new Error('Nepavyko atnaujinti dokumento');
};

export const deleteLegalDocument = async (document: LegalDocument) => {
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
    })
    .eq('id', document.id);

  if (updateError) throw new Error('Nepavyko ištrinti dokumento');
};
