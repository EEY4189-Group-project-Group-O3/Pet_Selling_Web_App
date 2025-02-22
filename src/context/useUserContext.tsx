import { createContext, useState, useContext } from 'react';

interface User {
    access_token: string;
}


const UserContext = createContext<any | undefined>(undefined);

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
}