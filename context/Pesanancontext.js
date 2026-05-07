import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const PesananContext =
  createContext();

export function PesananProvider({
  children,
}) {

  const [
    daftarPesanan,
    setDaftarPesanan,
  ] = useState([]);

  // TAMBAH PESANAN
  const tambahPesanan = (
    pesananBaru
  ) => {

    setDaftarPesanan(
      (prev) => [

        pesananBaru,
        ...prev,

      ]
    );

  };

  return (

    <PesananContext.Provider
      value={{
        daftarPesanan,
        tambahPesanan,
      }}
    >

      {children}

    </PesananContext.Provider>

  );

}

export function usePesanan() {

  return useContext(
    PesananContext
  );

}
