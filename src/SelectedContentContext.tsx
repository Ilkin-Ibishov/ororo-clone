import React, { createContext, useContext, useState } from 'react';

interface SelectedContentContextProps {
  selectedContent: string;
  setSelectedContent: React.Dispatch<React.SetStateAction<string>>;
}

const SelectedContentContext = createContext<SelectedContentContextProps | undefined>(undefined);

export const SelectedContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedContent, setSelectedContent] = useState<string>("tv");
  return (
    <SelectedContentContext.Provider value={{ selectedContent, setSelectedContent }}>
      {children}
    </SelectedContentContext.Provider>
  );
};

export const useSelectedContent = (): SelectedContentContextProps => {
  const context = useContext(SelectedContentContext);
  if (!context) {
    throw new Error('useSelectedContent must be used within a SelectedContentProvider');
  }
  return context;
};
