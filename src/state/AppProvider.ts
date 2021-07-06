import React from 'react';

type appContextType = {
    value: number | undefined;
    setValue: (value: number) => void;
}

export const AppProvider = React.createContext<appContextType | undefined>(undefined);