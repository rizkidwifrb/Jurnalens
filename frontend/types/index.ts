export type Paper = {
  id: string;
  title: string;
  abstract?: string | null;
  doi?: string | null;
  year?: number | null;
  source?: string | null;
  journal?: string | null;
  url?: string | null;
  pdf_url?: string | null;
  open_access: boolean;
  citation_count?: number | null;
};

export type SearchResult = {
  paper: Paper;
  relevance_score: number;
  ai_summary?: string | null;
  match_reasons: string[];
};

export type SearchResponse = {
  query: string;
  results: SearchResult[];
  answer?: string | null;
  citations: Array<{ index: number; paper_id: string; title: string; doi: string }>;
  next_questions: string[];
};
