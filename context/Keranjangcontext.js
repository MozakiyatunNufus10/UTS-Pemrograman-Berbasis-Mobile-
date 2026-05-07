import React, { createContext, useContext, useState } from 'react';

export const KeranjangContext = createContext();

export const KeranjangProvider = ({ children }) => {
  const [keranjang, setKeranjang] = useState([]);

  // Tambah item — kalau sudah ada, naikkan jumlahnya
  const tambahKeKeranjang = (produk) => {
    setKeranjang((prev) => {
      const existing = prev.find((item) => item.id === produk.id);
      if (existing) {
        return prev.map((item) =>
          item.id === produk.id
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
        );
      }
      return [...prev, { ...produk, jumlah: 1 }];
    });
  };

  // Kurangi jumlah — kalau jumlah = 1, hapus dari keranjang
  const kurangiDariKeranjang = (id) => {
    setKeranjang((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (!existing) return prev;
      if (existing.jumlah === 1) return prev.filter((item) => item.id !== id);
      return prev.map((item) =>
        item.id === id ? { ...item, jumlah: item.jumlah - 1 } : item
      );
    });
  };

  // Hapus item langsung
  const hapusItem = (id) => {
    setKeranjang((prev) => prev.filter((item) => item.id !== id));
  };

  // Kosongkan seluruh keranjang (dipanggil setelah checkout)
  const kosongkanKeranjang = () => setKeranjang([]);

  // Total jumlah item (untuk badge di icon keranjang)
  const totalItem = keranjang.reduce((sum, item) => sum + item.jumlah, 0);

  // Total harga
  const totalHarga = keranjang.reduce(
    (sum, item) => sum + item.harga * item.jumlah,
    0
  );

  return (
    <KeranjangContext.Provider
      value={{
        keranjang,
        tambahKeKeranjang,
        kurangiDariKeranjang,
        hapusItem,
        kosongkanKeranjang,
        totalItem,
        totalHarga,
      }}
    >
      {children}
    </KeranjangContext.Provider>
  );
};

// Custom hook biar lebih praktis
export const useKeranjang = () => useContext(KeranjangContext);
