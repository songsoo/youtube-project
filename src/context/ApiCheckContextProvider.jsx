import React from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

export const ApiCheckContext = createContext();

export function ApiCheckContextProvider({ children }) {
    const [isApiAvailable, setIsApiAvailable] = useState(true);
    const controlIsApiAvailable = (newVal) => setIsApiAvailable(newVal);

    return (
        <ApiCheckContext.Provider value={{ isApiAvailable, controlIsApiAvailable }}>
            {children}
        </ApiCheckContext.Provider>
    );
}

export const useApiAvailable = () => useContext(ApiCheckContext);
