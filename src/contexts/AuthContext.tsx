import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { observeAuthState } from "@/lib/firebase/auth";
import {
  resolveUserProfile,
  signIn,
  signInWithGoogle,
  signOutUser,
  signUp,
  toAuthUser,
} from "@/services/auth";
import type { AuthUser, UserProfile } from "@/types";

import { AuthContext, type AuthContextValue } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let authEventId = 0;

    const unsubscribe = observeAuthState(async (firebaseUser) => {
      const currentEventId = ++authEventId;

      // Reset derived state before resolving the new session's profile.
      if (active) {
        setProfile(null);
        setLoading(true);
      }

      if (!firebaseUser) {
        if (!active) return;
        setUser(null);
        setLoading(false);
        return;
      }

      // Publish identity immediately, then resolve the role from Firestore.
      if (active) setUser(toAuthUser(firebaseUser));

      const resolved = await resolveUserProfile(firebaseUser);

      // A newer auth event may have landed while the profile was in flight.
      if (!active || currentEventId !== authEventId) return;
      setProfile(resolved);
      setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const login = useCallback(
    (email: string, password: string) => signIn(email, password),
    [],
  );
  const register = useCallback(
    (email: string, password: string) => signUp(email, password),
    [],
  );
  const loginWithGoogle = useCallback(() => signInWithGoogle(), []);
  const logout = useCallback(() => signOutUser(), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      role: profile?.role ?? null,
      loading,
      isAuthenticated: user !== null,
      isAdmin: profile?.role === "admin",
      login,
      register,
      loginWithGoogle,
      logout,
    }),
    [user, profile, loading, login, register, loginWithGoogle, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
