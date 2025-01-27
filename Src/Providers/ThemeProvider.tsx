import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import appColors from '../Assets/Colors';
import strings from '../Assets/Languages';
import { RouteParamList } from '../Navigations/routes.type';

export interface ThemeProviderExtraData {
    prevousScreen?: keyof RouteParamList | undefined
}

export interface ThemeProviderType {
    colors: typeof appColors;
    lang: typeof strings;
    extraData?: ThemeProviderExtraData
    changeTheme?: (newTheme: ThemeProviderType) => void;
    updateExtraData?: <T extends keyof ThemeProviderExtraData>(key: T, value: ThemeProviderExtraData[T]) => void;
}

interface Props {
    children: React.ReactNode; // More specific typing for children
}

export const ThemeContext = createContext<ThemeProviderType>({
    colors: appColors,
    lang: strings,
    changeTheme: () => { }, // Provide a default no-op function
    updateExtraData: () => { }, // Provide a default no-op function
});

export const ThemeProvider: FC<Props> = ({ children }) => {
    const [theme, setTheme] = useState<Omit<ThemeProviderType, 'changeTheme' | 'updateExtraData'>>({
        colors: appColors,
        lang: strings,
    });
    const [extraData, setExtraData] = useState<ThemeProviderExtraData>({
        prevousScreen: undefined
    });

    const changeTheme = (newTheme: Omit<ThemeProviderType, 'changeTheme' | 'updateExtraData'>) => {
        setTheme(newTheme);
    };
    useEffect(() => {

    })
    const updateExtraData = <T extends keyof ThemeProviderExtraData>(updatedKey: T, data: ThemeProviderExtraData[T] | undefined) => {
        setExtraData((pre) => ({ ...pre, [updatedKey]: data }));
    };

    return (
        <ThemeContext.Provider value={{ ...theme, extraData, changeTheme, updateExtraData }}>
            {children}
        </ThemeContext.Provider>
    );
};


export const useAppTheme = (): ThemeProviderType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};