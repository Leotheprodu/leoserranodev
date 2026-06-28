export type SnippetProject = 'flproductions' | 'zamr' | 'mejormenu';
export type SnippetLanguage = 'typescript' | 'tsx' | 'javascript' | 'sql' | 'bash' | 'json';

export interface Snippet {
  id: string;
  project: SnippetProject;
  title: string;
  description: string;
  file: string;
  language: SnippetLanguage;
  code: string;
  highlights?: string[];
  tags: string[];
  featured?: boolean;
  order: number;
}

import { snippets as flpSnippets } from './flproductions';
import { snippets as zamrSnippets } from './zamr';
import { snippets as mmSnippets } from './mejormenu';

export const allSnippets: Snippet[] = [
  ...flpSnippets,
  ...zamrSnippets,
  ...mmSnippets,
].sort((a, b) => a.order - b.order);

export const snippetsByProject = (project: SnippetProject) =>
  allSnippets.filter((s) => s.project === project);

export const featuredSnippets = allSnippets.filter((s) => s.featured);
