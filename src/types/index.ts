export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  coverUrl: string;
  documentUrl: string;
  type: 'book' | 'story';
  status: 'completed' | 'ongoing';
  copyright: string;
  source: string;
  chapters?: Chapter[];
  tags: string[];
}

export interface UserProgress {
  bookId: string;
  chapterId?: string;
  lastPosition: number;
  lastReadAt: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  lineHeight: number;
  contentWidth: 'narrow' | 'medium' | 'wide';
}