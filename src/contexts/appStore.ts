import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, UserProgress, UserSettings } from '../types';

interface AppState {
  favorites: string[]; // Book IDs
  progress: Record<string, UserProgress>; // bookId -> progress
  settings: UserSettings;

  toggleFavorite: (bookId: string) => void;
  updateProgress: (progress: UserProgress) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetProgress: (bookId: string) => void;
  clearAllHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      progress: {},
      settings: {
        theme: 'system',
        fontSize: 16,
        lineHeight: 1.6,
        contentWidth: 'medium',
      },
      toggleFavorite: (bookId) => set((state) => ({
        favorites: state.favorites.includes(bookId)
          ? state.favorites.filter(id => id !== bookId)
          : [...state.favorites, bookId]
      })),
      updateProgress: (progress) => set((state) => ({
        progress: { ...state.progress, [progress.bookId]: progress }
      })),
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      resetProgress: (bookId) => set((state) => {
        const newProgress = { ...state.progress };
        delete newProgress[bookId];
        return { progress: newProgress };
      }),
      clearAllHistory: () => set({ progress: {}, favorites: [] }),
    }),
    {
      name: 'docln-storage',
    }
  )
);