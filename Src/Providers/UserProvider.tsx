import React, { createContext, useState, useContext } from "react";

// Define types
type ProfileType = UserType | null
export interface UserContextType {
    profileType: ProfileType;
    setProfileType: React.Dispatch<React.SetStateAction<ProfileType>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profileType, setProfileType] = useState<ProfileType>(null);

    return (
        <UserContext.Provider value={{ profileType, setProfileType }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};