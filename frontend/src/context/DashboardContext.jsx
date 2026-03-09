import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [range, setRange] = useState('L7D');
    const [selectedSector, setSelectedSector] = useState('All Sectors');

    const updateRange = (newRange) => setRange(newRange);
    const updateSector = (newSector) => setSelectedSector(newSector);

    return (
        <DashboardContext.Provider value={{
            range,
            selectedSector,
            updateRange,
            updateSector
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};
