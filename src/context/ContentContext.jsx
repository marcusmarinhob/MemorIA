import React, { createContext, useState, useContext } from "react";

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [selectedContent, setSelectedContent] = useState(null);

  return (
    <ContentContext.Provider value={{ selectedContent, setSelectedContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent deve ser usado dentro de ContentProvider");
  }
  return context;
}
