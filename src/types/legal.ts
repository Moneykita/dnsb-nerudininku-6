
export interface DatabaseDocument {
  id: string;
  title: string;
  description: string | null;
  document_path: string | null;
  external_url: string | null;
  document_type: string;
  created_at: string;
  last_updated_at: string;
}

export interface LegalDocument extends DatabaseDocument {
  url?: string;
}
