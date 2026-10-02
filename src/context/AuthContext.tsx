import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  type User as FirebaseUser,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  sendEmailVerification as firebaseSendEmailVerification,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { UserProfile, UserRole } from '../types/auth';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  role: UserRole | null;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrCreateProfile = async (user: FirebaseUser): Promise<UserProfile> => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;

        // Update last login & sync email verification
        await updateDoc(userDocRef, {
          last_login_at: new Date().toISOString(),
          email_verified: user.emailVerified,
          updated_at: new Date().toISOString(),
        }).catch(() => {});

        const updatedProfile: UserProfile = {
          ...data,
          email_verified: user.emailVerified,
          last_login_at: new Date().toISOString(),
        };
        setUserProfile(updatedProfile);
        return updatedProfile;
      } else {
        // Create new user profile with hardcoded USER role (NEVER TRUST CLIENT ROLE CHOICE)
        const newProfile: UserProfile = {
          id: user.uid,
          full_name: user.displayName || 'Traders User',
          email: user.email || '',
          phone: user.phoneNumber || '',
          role: 'USER', // FORCED ROLE SECURITY
          email_verified: user.emailVerified,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          status: 'ACTIVE',
          subscription_status: 'NOT_ACTIVE',
        };

        await setDoc(userDocRef, newProfile).catch(() => {});
        setUserProfile(newProfile);
        return newProfile;
      }
    } catch (error) {
      console.warn('Firestore profile fetch error, fallback to memory profile:', error);
      const fallbackProfile: UserProfile = {
        id: user.uid,
        full_name: user.displayName || 'Trader',
        email: user.email || '',
        phone: '',
        role: 'USER',
        email_verified: user.emailVerified,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login_at: new Date().toISOString(),
        status: 'ACTIVE',
        subscription_status: 'NOT_ACTIVE',
      };
      setUserProfile(fallbackProfile);
      return fallbackProfile;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchOrCreateProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await firebaseSignOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
  };

  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      await firebaseSendEmailVerification(auth.currentUser);
    }
  };

  const refreshUserProfile = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      await fetchOrCreateProfile(auth.currentUser);
    }
  };

  const isAuthenticated = !!currentUser;
  const isEmailVerified = currentUser ? currentUser.emailVerified : false;
  const role = userProfile ? userProfile.role : null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isAuthenticated,
        isEmailVerified,
        role,
        logout,
        resendVerificationEmail,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
