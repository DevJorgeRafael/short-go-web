import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ShortLinkResponse } from '../types/shortLink.types';

interface ShortLinksState {
    // Estado
    links: ShortLinkResponse[];
    currentLink: ShortLinkResponse | null;
    isLoading: boolean;
    error: string | null;

    // Acciones
    setCurrentLink: (link: ShortLinkResponse) => void;
    addLink: (link: ShortLinkResponse) => void;
    clearCurrentLink: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // Para usuario autenticado
    setUserLinks: (links: ShortLinkResponse[]) => void;
}

export const useShortLinksStore = create<ShortLinksState>()(
    devtools(
        (set) => ({
            links: [],
            currentLink: null,
            isLoading: false,
            error: null,

            setCurrentLink: (link) => set({ currentLink: link, error: null }),

            addLink: (link) =>
                set((state) => ({
                    links: [link, ...state.links],
                    currentLink: link,
                })),

            clearCurrentLink: () => set({ currentLink: null }),

            setLoading: (loading) => set({ isLoading: loading }),

            setError: (error) => set({ error, isLoading: false }),

            setUserLinks: (links) => set({ links }),
        }),
        { name: 'short-links-store' }
    )
);