import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({children}) {
    const [user, setUser] = useState(null);

    //This sets the logged-in user
    const login = (user) => setUser(user);

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