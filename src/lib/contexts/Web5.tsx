/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Web5 } from "@web5/api";

const DID_STORAGE_KEY = "did-key";

interface Web5ContextType {
  web5: Web5 | null;
  did: string | null;
  loading: boolean;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
}

export const Web5Context = createContext<Web5ContextType>(
  {} as Web5ContextType
);

export const Web5Provider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [web5, setWeb5] = useState<Web5 | null>(null);
  const [did, setDid] = useState<string | null>(null);

  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    try {
      setLoading(true);
      const storedDid = localStorage.getItem(DID_STORAGE_KEY);

      const { web5, did } = await Web5.connect();

      if (did !== storedDid) {
        console.log("A new did has been created.");
      }

      console.log("web5", web5, "did", did);

      setWeb5(web5);
      setDid(did);

      localStorage.setItem(DID_STORAGE_KEY, did);
    } catch (error: any) {
      // TODO: Create a util to handle error messages
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setWeb5(null);
    setDid(null);
    localStorage.removeItem(DID_STORAGE_KEY);
  };

  const memoizedValue = useMemo(
    () => ({
      web5,
      did,
      loading,
      error,
      connect,
      disconnect,
    }),
    [loading, web5, did, error]
  );

  return (
    <Web5Context.Provider value={memoizedValue}>
      {children}
    </Web5Context.Provider>
  );
};

export const useWeb5 = () => useContext(Web5Context);
