// src\context\UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({children}) {
    const [user, setUser] = useState(null);

    const login = (user) => setUser(user);
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value = {{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}