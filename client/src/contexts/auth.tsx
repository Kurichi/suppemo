import React, { useEffect, createContext, useState, useContext, PropsWithChildren } from 'react';
import { auth } from '../services/firebase';
import { User } from 'firebase/auth';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface ContextInterface {
  user: User | null,
}

const AuthContext = createContext({} as ContextInterface);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setLoading(false);
      useNavigation().navigate('Tab')
    });
    return () => unsubscribed();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}