import React, { createContext, useState } from 'react';

const AssetTypeContext = createContext();

export const AssetTypeProvider = ({ children }) => {
  const [assetTypes, setAssetTypes] = useState(["Laptop", "Phone", "Desktop"]);

  return (
    <AssetTypeContext.Provider value={{ assetTypes, setAssetTypes }}>
      {children}
    </AssetTypeContext.Provider>
  );
};

export default AssetTypeContext;
