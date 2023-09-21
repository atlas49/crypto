import React, { createContext, useContext, useState } from 'react';
import initialState from '.';

export type Currency = {
  icon: string;
  name: string;
  code: string;
  value: string;
};

export interface IContext {
  currencyData: Currency[];
  currencyFrom: Currency | null;
  currencyTo: Currency | null;
  updateState: (newValues: { [key: string]: any }) => void;
  email: string;
  wallet: string;
}

const AppContext = createContext<IContext>(initialState);

const { Provider } = AppContext;

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setValues] = useState<IContext>(initialState);

  const updateState = (newValues: { [key: string]: string }) => {
    setValues({ ...state, ...newValues });
  };

  return <Provider value={{ ...state, updateState }}>{children}</Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
