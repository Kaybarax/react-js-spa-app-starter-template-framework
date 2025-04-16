/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { clearAllPersistedStoresToLocalStorage, unregisterPersistenceEventListeners } from './store-utils';
import { useAppStore } from './zustand';
import { STORE_KEY_SUFFIX } from './actions-and-stores-data';

export interface AuthenticationResult {
  isAuthenticated: boolean;
  error?: Error;
}

export interface AuthState {
  isAuthenticated: boolean;
  checkAuthentication: () => Promise<boolean>;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      checkAuthentication: async () => {
        try {
          // TODO: Replace with actual authentication logic
          // Example implementation would check a token, session, or user data
          const isAuthenticated = true;
          set({ isAuthenticated });
          return isAuthenticated;
        } catch (error) {
          console.error('Authentication check failed:', error);
          set({ isAuthenticated: false });
          return false;
        }
      },
      login: () => {
        try {
          // TODO: Implement login logic and navigation
          set({ isAuthenticated: true });
          console.log('User logged in successfully');
          // appNavigation.navigateToSecuredAppHomepageExample();
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
      logout: () => {
        try {
          // Clear user data
          useAppStore.getState().setUser(null);

          // Clean up storage and listeners
          unregisterPersistenceEventListeners();
          clearAllPersistedStoresToLocalStorage();

          set({ isAuthenticated: false });

          // TODO: Add navigation after logout
          // appNavigation.navigateToLoginAndRegistration();

          console.log('User logged out successfully');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      }
    }),
    {
      name: `auth-store-${STORE_KEY_SUFFIX}`,
    }
  )
);

export class AppAuth {
  async isAuthenticated(): Promise<boolean> {
    return useAuthStore.getState().checkAuthentication();
  }

  handleLogin(): void {
    useAuthStore.getState().login();
  }

  handleLogout(): void {
    useAuthStore.getState().logout();
  }
}

// Singleton instance
const appAuth = new AppAuth();
export default appAuth;
