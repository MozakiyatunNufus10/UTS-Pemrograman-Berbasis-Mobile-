import React, { useState, useContext } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeranjangContext } from '../App';
import { COLORS } from '../constants/colors';

const KEUNGGULAN = [
  'Produk asli UMKM lokal',
  'Kualitas terjamin',
  'Pengiriman ke seluruh Indonesia',
  'Garansi keaslian produk',
];

function BintangRating({ rating }) {
  return (
    <View style={styles.bintangRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons key={i} name={i <= Math.floor(rating) ? 'star' : 'star-outline'} size={18} color="#FFC107" />
      ))}
      <Text style={styles.ratingAngka}>{rating}/5</Text>
    </View>
  );
}

function InfoBaris({ ikon, label, nilai, warnaTeks }) {
  return (
    <View style={styles.infoBaris}>
      <Ionicons name={ikon} size={16} color={warnaTeks || COLORS.primary} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoNilai, warnaTeks && { color: warnaTeks }]}>{nilai}</Text>
    </View>
  );
}

function StatItem({ angka, label, warna }) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statAngka, { color: warna }]}>{angka}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function KontrolQty({ qty, stok, onKurang, onTambah }) {
  return (
    <View style={styles.kontrolQty}>
      <TouchableOpacity style={styles.tombolQty} onPress={onKurang} activeOpacity={0.8}>
        <Ionicons name="remove" size={18} color={COLORS.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.angkaQty}>{qty}</Text>
      <TouchableOpacity style={styles.tombolQty} onPress={onTambah} disabled={qty >= stok} activeOpacity={0.8}>
        <Ionicons name="add" size={18} color={qty >= stok ? '#ccc' : COLORS.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

export default function ProdukDetailScreen({ route, navigation }) {
  const { produk } = route.params;
  const { tambahKeKeranjang } = useContext(KeranjangContext);
  const [qty, setQty] = useState(1);
  const [favorit, setFavorit] = useState(false);

  const totalHarga = produk.harga * qty;

  const handleBeli = () => {
    for (let i = 0; i < qty; i++) tambahKeKeranjang(produk);
    Alert.alert(
      'Berhasil Ditambahkan! 🛒',
      `${qty}x ${produk.nama} ditambahkan ke keranjang`,
      [
        { text: 'Lihat Keranjang', onPress: () => navigation.navigate('Keranjang') },
        { text: 'Lanjut Belanja', style: 'cancel' },
      ]
    );
  };

  const stokRendah = produk.stok < 15;

  return (
    <View style={styles.kontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: produk.warna + '20' }]}>
          <Text style={styles.emojiHero}>{produk.emoji}</Text>
          <TouchableOpacity style={styles.tombolFavorit} onPress={() => setFavorit((v) => !v)} activeOpacity={0.8}>
            <Ionicons name={favorit ? 'heart' : 'heart-outline'} size={22} color={favorit ? COLORS.danger : COLORS.textSecondary} />
          </TouchableOpacity>
          <View style={[styles.badgeHero, { backgroundColor: produk.warna }]}>
            <Text style={styles.badgeHeroTeks}>{produk.kategori}</Text>
          </View>
        </View>

        <View style={styles.konten}>
          <Text style={styles.namaProduk}>{produk.nama}</Text>
          <Text style={styles.hargaProduk}>Rp {produk.harga.toLocaleString('id-ID')}</Text>
          <BintangRating rating={produk.rating} />

          <View style={styles.kartuPenjual}>
            <View style={[styles.avatarPenjual, { backgroundColor: produk.warna }]}>
              <Ionicons name="storefront" size={18} color={COLORS.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.labelPenjual}>Dijual oleh</Text>
              <Text style={styles.namaPenjual}>{produk.penjual}</Text>
            </View>
            <View style={styles.badgeVerifikasi}>
              <Ionicons name="checkmark-circle" size={13} color={COLORS.primary} />
              <Text style={styles.verifikasiTeks}>Terverifikasi</Text>
            </View>
          </View>

          <View style={styles.statGrid}>
            <StatItem angka={produk.terjual} label="Terjual" warna={produk.warna} />
            <View style={styles.pemisah} />
            <StatItem angka={produk.stok} label="Stok" warna={produk.warna} />
            <View style={styles.pemisah} />
            <StatItem angka={produk.rating} label="Rating" warna={produk.warna} />
          </View>

          <Text style={styles.sectionJudul}>Informasi Produk</Text>
          <View style={styles.kartuInfo}>
            <InfoBaris ikon="pricetag-outline" label="Kategori" nilai={produk.kategori} warnaTeks={produk.warna} />
            <View style={styles.garis} />
            <InfoBaris ikon="location-outline" label="Asal" nilai={produk.penjual.split(' - ')[1] || 'Indonesia'} />
            <View style={styles.garis} />
            <InfoBaris ikon="cube-outline" label="Stok" nilai={`${produk.stok} unit`} warnaTeks={stokRendah ? COLORS.danger : COLORS.primary} />
          </View>

          <Text style={styles.sectionJudul}>Deskripsi Produk</Text>
          <Text style={styles.deskripsi}>{produk.deskripsi}</Text>

          <Text style={styles.sectionJudul}>Keunggulan</Text>
          {KEUNGGULAN.map((item) => (
            <View key={item} style={styles.keunggulanItem}>
              <Ionicons name="checkmark-circle" size={15} color={COLORS.primary} />
              <Text style={styles.keunggulanTeks}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footerBeli}>
        <KontrolQty
          qty={qty} stok={produk.stok}
          onKurang={() => setQty((q) => Math.max(1, q - 1))}
          onTambah={() => setQty((q) => Math.min(produk.stok, q + 1))}
        />
        <TouchableOpacity
          style={[styles.tombolBeli, { backgroundColor: produk.warna }]}
          onPress={handleBeli} activeOpacity={0.85}
        >
          <Ionicons name="cart" size={18} color={COLORS.white} />
          <Text style={styles.tombolBeliTeks}>Rp {totalHarga.toLocaleString('id-ID')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kontainer: { flex: 1, backgroundColor: COLORS.background },
  hero: { height: 220, justifyContent: 'center', alignItems: 'center' },
  emojiHero: { fontSize: 88 },
  tombolFavorit: {
    position: 'absolute', top: 16, right: 16,
    backgroundColor: COLORS.white, width: 38, height: 38,
    borderRadius: 19, justifyContent: 'center', alignItems: 'center', elevation: 2,
  },
  badgeHero: { position: 'absolute', bottom: 16, left: 16, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  badgeHeroTeks: { color: COLORS.white, fontWeight: 'bold', fontSize: 12 },
  konten: { padding: 20 },
  namaProduk: { fontSize: 22, fontWeight: 'bold', color: COLORS.primaryDark, marginBottom: 4 },
  hargaProduk: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginBottom: 10 },
  bintangRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 16 },
  ratingAngka: { fontSize: 13, color: '#555', fontWeight: '600', marginLeft: 6 },
  kartuPenjual: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 14,
    padding: 14, gap: 12, marginBottom: 16, elevation: 1,
  },
  avatarPenjual: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
  labelPenjual: { fontSize: 11, color: COLORS.textSecondary },
  namaPenjual: { fontSize: 13, fontWeight: 'bold', color: COLORS.textPrimary, marginTop: 2 },
  badgeVerifikasi: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: COLORS.primaryLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  verifikasiTeks: { fontSize: 11, color: COLORS.primary, fontWeight: '600' },
  statGrid: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 14, padding: 16, marginBottom: 20, elevation: 1 },
  statItem: { flex: 1, alignItems: 'center' },
  statAngka: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 3 },
  pemisah: { width: 1, backgroundColor: '#eee', marginVertical: 4 },
  sectionJudul: { fontSize: 15, fontWeight: 'bold', color: COLORS.primaryDark, marginBottom: 10, marginTop: 4 },
  kartuInfo: { backgroundColor: COLORS.white, borderRadius: 14, padding: 14, marginBottom: 20, elevation: 1 },
  infoBaris: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  infoLabel: { flex: 1, fontSize: 13, color: COLORS.textSecondary },
  infoNilai: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  garis: { height: 1, backgroundColor: '#f5f5f5' },
  deskripsi: { fontSize: 13, color: '#555', lineHeight: 21, marginBottom: 20 },
  keunggulanItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  keunggulanTeks: { fontSize: 13, color: '#444' },
  footerBeli: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.white, paddingHorizontal: 16, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: COLORS.border, elevation: 8,
  },
  kontrolQty: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 10 },
  tombolQty: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  angkaQty: { fontSize: 16, fontWeight: 'bold', color: COLORS.textPrimary, minWidth: 28, textAlign: 'center' },
  tombolBeli: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, borderRadius: 14, paddingVertical: 14 },
  tombolBeliTeks: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});
