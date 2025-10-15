// src\context\UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({children}) {
    const [user, setUser] = useState(() => {
        // Initialize user from localStorage if available
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? savedUser : null;
    });

    // Persist user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', user);
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);

    //This sets the logged-in user
    const login = (username) => setUser(username);

    //This clears the logged in user
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value = {{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

//Hook so components can use the context
export function useUser() {
    return useContext(UserContext);
}
