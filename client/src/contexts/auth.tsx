import React, { useEffect, createContext, useState, useContext, PropsWithChildren } from 'react';
import { auth } from '../services/firebase';
import { User } from 'firebase/auth';

interface ContextInterface {
    user: User | null,
}

const AuthContext = createContext({} as ContextInterface);

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const value = {
        user,
        loading,
    };

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribed();
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}