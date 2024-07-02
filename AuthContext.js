import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from "./firebaseConfig"
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [sportCat, setSportCat] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(user);
            }
        });
        return unsub;
    }, [])

    const login = async (email, paasword) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, paasword);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message };
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true }
        } catch (e) {
            return { success: false, msg: e.message }
        }
    }

    const register = async (email, password, username) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                userId: response?.user?.uid
            });
            return { success: true, data: response?.user };
        } catch (e) {
            return { success: false, msg: e.message };
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, login, logout, register, sportCat, setSportCat, search, setSearch, filteredData, setFilteredData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};