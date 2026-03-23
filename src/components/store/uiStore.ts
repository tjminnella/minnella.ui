import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** State shape for UI store */
interface UIState {
  /** Whether the mobile navigation menu is open */
  isMobileMenuOpen: boolean;
  /** Whether the cart drawer is open */
  isCartDrawerOpen: boolean;
  /** Current theme (light or dark) */
  theme: 'light' | 'dark';

  /** Toggle the mobile menu open/closed state */
  toggleMobileMenu: () => void;
  /** Toggle the cart drawer open/closed state */
  toggleCartDrawer: () => void;
  /** Set the cart drawer to a specific open state */
  setCartDrawerOpen: (open: boolean) => void;
}

/**
 * UI Store for managing global UI state.
 * Handles mobile menu, cart drawer, and theme state.
 * State is persisted to localStorage for consistency across sessions.
 */
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      isCartDrawerOpen: false,
      theme: 'light',

      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
      setCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
