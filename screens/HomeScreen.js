import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// HAPUS IONICONS BIAR TIDAK ERROR
// import { Ionicons } from '@expo/vector-icons';

// ─────────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────────
const COLORS = {
  primary: '#2E7D32',
  primaryDark: '#1B5E20',
  white: '#FFFFFF',
  background: '#F5F5F5',
  textPrimary: '#222222',
  textSecondary: '#777777',
  danger: '#E53935',
};

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const KATEGORI = [
  { id: '1', nama: 'Makanan', ikon: '🍔', warna: '#E53935' },
  { id: '2', nama: 'Kerajinan', ikon: '🎨', warna: '#8E24AA' },
  { id: '3', nama: 'Fashion', ikon: '👕', warna: '#1E88E5' },
  { id: '4', nama: 'Minuman', ikon: '☕', warna: '#00897B' },
  { id: '5', nama: 'Kosmetik', ikon: '💄', warna: '#E91E8C' },
  { id: '6', nama: 'Pertanian', ikon: '🌿', warna: '#43A047' },
];

const TIPS = [
  {
    id: '1',
    judul: 'Cara Meningkatkan Penjualan Online',
    isi:
      'Gunakan media sosial seperti Instagram dan TikTok untuk mempromosikan produk Anda.',
  },
  {
    id: '2',
    judul: 'Tips Pengelolaan Keuangan UMKM',
    isi:
      'Pisahkan keuangan bisnis dan pribadi dengan rekening berbeda.',
  },
  {
    id: '3',
    judul: 'Membangun Brand yang Kuat',
    isi:
      'Buat logo dan kemasan menarik agar mudah dikenali pelanggan.',
  },
];

const STATISTIK = [
  { angka: '120+', label: 'Produk' },
  { angka: '50+', label: 'Mitra UMKM' },
  { angka: '1.2K', label: 'Pelanggan' },
];

// ─────────────────────────────────────────────
// KATEGORI CARD
// ─────────────────────────────────────────────
function KategoriCard({ nama, ikon, warna, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.kategoriCard,
        { backgroundColor: warna },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.iconEmoji}>
        {ikon}
      </Text>

      <Text style={styles.kategoriTeks}>
        {nama}
      </Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// BANNER
// ─────────────────────────────────────────────
function BannerPromo() {
  return (
    <View style={styles.banner}>

      <View style={styles.bannerKonten}>
        <Text style={styles.bannerJudul}>
          Promo Spesial Hari Ini!
        </Text>

        <Text style={styles.bannerDeskripsi}>
          Diskon hingga 30% untuk produk pilihan UMKM lokal terbaik
        </Text>

        <TouchableOpacity
          style={styles.bannerTombol}
          activeOpacity={0.8}
        >
          <Text style={styles.bannerTombolTeks}>
            Lihat Sekarang
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bannerIcon}>
        🏪
      </Text>

    </View>
  );
}

// ─────────────────────────────────────────────
// STATISTIK
// ─────────────────────────────────────────────
function StatistikRow() {
  return (
    <View style={styles.statRow}>

      {STATISTIK.map((item) => (
        <View
          key={item.label}
          style={styles.statKotak}
        >
          <Text style={styles.statAngka}>
            {item.angka}
          </Text>

          <Text style={styles.statLabel}>
            {item.label}
          </Text>
        </View>
      ))}

    </View>
  );
}

// ─────────────────────────────────────────────
// TIPS CARD
// ─────────────────────────────────────────────
function TipsCard({ judul, isi }) {

  const [terbuka, setTerbuka] = useState(false);

  return (
    <TouchableOpacity
      style={styles.tipsCard}
      onPress={() => setTerbuka(!terbuka)}
      activeOpacity={0.9}
    >

      <View style={styles.tipsHeader}>

        <Text style={styles.bulb}>
          💡
        </Text>

        <Text style={styles.tipsJudul}>
          {judul}
        </Text>

        <Text style={styles.arrow}>
          {terbuka ? '▲' : '▼'}
        </Text>

      </View>

      {terbuka && (
        <Text style={styles.tipsIsi}>
          {isi}
        </Text>
      )}

    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// SCREEN
// ─────────────────────────────────────────────
export default function HomeScreen({ navigation }) {

  return (
    <ScrollView
      style={styles.kontainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollKonten}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <View>
          <Text style={styles.sapaan}>
            Selamat Datang 👋
          </Text>

          <Text style={styles.namaUMKM}>
            UMKM Nusantara
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarTeks}>
            UN
          </Text>
        </View>

      </View>

      <BannerPromo />

      <StatistikRow />

      {/* KATEGORI */}
      <Text style={styles.sectionJudul}>
        Kategori Produk
      </Text>

      <FlatList
        data={KATEGORI}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.kategoriList}
        renderItem={({ item }) => (
          <KategoriCard
            nama={item.nama}
            ikon={item.ikon}
            warna={item.warna}
            onPress={() => navigation.navigate('Produk')}
          />
        )}
      />

      {/* TIPS */}
      <Text style={styles.sectionJudul}>
        Tips & Inspirasi UMKM
      </Text>

      <View style={styles.tipsList}>
        {TIPS.map((tips) => (
          <TipsCard
            key={tips.id}
            judul={tips.judul}
            isi={tips.isi}
          />
        ))}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>

        <Text style={styles.heart}>
          ❤️
        </Text>

        <Text style={styles.footerTeks}>
          {' '}Mendukung UMKM Lokal Indonesia
        </Text>

      </View>

    </ScrollView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({

  kontainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollKonten: {
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
  },

  sapaan: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  namaUMKM: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginTop: 2,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarTeks: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 13,
  },

  banner: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },

  bannerKonten: {
    flex: 1,
    marginRight: 8,
  },

  bannerJudul: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 6,
  },

  bannerDeskripsi: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
    marginBottom: 12,
  },

  bannerTombol: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  bannerTombolTeks: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },

  bannerIcon: {
    fontSize: 48,
  },

  statRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },

  statKotak: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  statAngka: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  sectionJudul: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  kategoriList: {
    paddingHorizontal: 16,
  },

  kategoriCard: {
    width: 78,
    height: 78,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  iconEmoji: {
    fontSize: 24,
  },

  kategoriTeks: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },

  tipsList: {
    marginHorizontal: 16,
  },

  tipsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bulb: {
    fontSize: 16,
  },

  arrow: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  tipsJudul: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginHorizontal: 8,
  },

  tipsIsi: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 8,
  },

  heart: {
    fontSize: 14,
  },

  footerTeks: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },

});
