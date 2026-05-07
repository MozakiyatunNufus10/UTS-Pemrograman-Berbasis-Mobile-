import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { KeranjangContext } from '../App';

const { width } =
  Dimensions.get('window');

const CARD_WIDTH =
  (width - 44) / 2;

// ─────────────────────────────
// DATA PRODUK
// ─────────────────────────────
const DATA_PRODUK = [
  {
    id: '1',
    nama: 'Batik Tulis Solo',
    kategori: 'Fashion',
    harga: 250000,
    rating: 4.8,
    terjual: 120,
    emoji: '🪡',
    warna: '#1E88E5',
    penjual: 'Bu Sari - Solo',
  },

  {
    id: '2',
    nama: 'Keripik Tempe Renyah',
    kategori: 'Makanan',
    harga: 18000,
    rating: 4.9,
    terjual: 350,
    emoji: '🫘',
    warna: '#E65100',
    penjual: 'Pak Budi - Malang',
  },

  {
    id: '3',
    nama: 'Anyaman Bambu',
    kategori: 'Kerajinan',
    harga: 85000,
    rating: 4.7,
    terjual: 80,
    emoji: '🧺',
    warna: '#558B2F',
    penjual: 'Tasikmalaya',
  },

  {
    id: '4',
    nama: 'Kopi Arabika',
    kategori: 'Minuman',
    harga: 75000,
    rating: 4.9,
    terjual: 200,
    emoji: '☕',
    warna: '#4E342E',
    penjual: 'Flores',
  },

  {
    id: '5',
    nama: 'Madu Hutan',
    kategori: 'Makanan',
    harga: 120000,
    rating: 5.0,
    terjual: 95,
    emoji: '🍯',
    warna: '#F57F17',
    penjual: 'Kalimantan',
  },

  {
    id: '6',
    nama: 'Sabun Organik',
    kategori: 'Kosmetik',
    harga: 35000,
    rating: 4.6,
    terjual: 180,
    emoji: '🌿',
    warna: '#00695C',
    penjual: 'Bali',
  },
];

// ─────────────────────────────
// FILTER
// ─────────────────────────────
const KATEGORI_FILTER = [
  'Semua',
  'Makanan',
  'Fashion',
  'Kerajinan',
  'Minuman',
  'Kosmetik',
];

// ─────────────────────────────
// CARD PRODUK
// ─────────────────────────────
function KartuProduk({
  produk,
  onTambah,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
    >
      {/* IMAGE */}
      <View
        style={[
          styles.imageArea,
          {
            backgroundColor:
              produk.warna + '18',
          },
        ]}
      >
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                produk.warna,
            },
          ]}
        >
          <Text
            style={styles.badgeText}
          >
            {produk.kategori}
          </Text>
        </View>

        <Text style={styles.emoji}>
          {produk.emoji}
        </Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {produk.nama}
        </Text>

        <Text
          style={styles.seller}
          numberOfLines={1}
        >
          📍 {produk.penjual}
        </Text>

        <View
          style={styles.ratingRow}
        >
          <Ionicons
            name="star"
            size={13}
            color="#FFC107"
          />

          <Text style={styles.rating}>
            {produk.rating}
          </Text>

          <Text style={styles.sold}>
            • {produk.terjual} terjual
          </Text>
        </View>

        <View
          style={styles.bottomRow}
        >
          <Text style={styles.price}>
            Rp{' '}
            {produk.harga.toLocaleString(
              'id-ID'
            )}
          </Text>

          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor:
                  produk.warna,
              },
            ]}
            onPress={() =>
              onTambah(produk)
            }
          >
            <Ionicons
              name="add"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────
// SCREEN
// ─────────────────────────────
export default function ProdukScreen({
  route,
}) {
  const kategoriDariHome =
    route?.params?.kategori ||
    'Semua';

  const [cari, setCari] =
    useState('');

  const [
    kategoriAktif,
    setKategoriAktif,
  ] = useState(
    kategoriDariHome
  );

  const { tambahKeKeranjang } =
    useContext(
      KeranjangContext
    );

  // FILTER
  const produkTerfilter =
    DATA_PRODUK.filter((item) => {
      const cocokCari =
        item.nama
          .toLowerCase()
          .includes(
            cari.toLowerCase()
          );

      const cocokKategori =
        kategoriAktif ===
          'Semua' ||
        item.kategori ===
          kategoriAktif;

      return (
        cocokCari &&
        cocokKategori
      );
    });

  // TAMBAH
  const handleTambah = (
    produk
  ) => {
    tambahKeKeranjang(produk);

    Alert.alert(
      'Berhasil ✅',
      `${produk.nama} ditambahkan ke keranjang`
    );
  };

  return (
    <View style={styles.container}>
      {/* SEARCH */}
      <View style={styles.searchBar}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#999"
        />

        <TextInput
          value={cari}
          onChangeText={setCari}
          placeholder="Cari produk UMKM..."
          placeholderTextColor="#AAA"
          style={styles.searchInput}
        />

        {cari.length > 0 && (
          <TouchableOpacity
            onPress={() =>
              setCari('')
            }
          >
            <Ionicons
              name="close-circle"
              size={20}
              color="#AAA"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* FILTER */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.categoryContainer
        }
      >
        {KATEGORI_FILTER.map(
          (item) => {
            const aktif =
              kategoriAktif ===
              item;

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={
                  0.8
                }
                style={[
                  styles.categoryButton,

                  aktif &&
                    styles.categoryButtonActive,
                ]}
                onPress={() =>
                  setKategoriAktif(
                    item
                  )
                }
              >
                <Text
                  style={[
                    styles.categoryText,

                    aktif &&
                      styles.categoryTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </ScrollView>

      {/* INFO */}
      <Text style={styles.totalText}>
        Menampilkan{' '}
        {
          produkTerfilter.length
        }{' '}
        produk
      </Text>

      {/* LIST */}
      <FlatList
        data={produkTerfilter}
        keyExtractor={(item) =>
          item.id
        }
        numColumns={2}
        showsVerticalScrollIndicator={
          false
        }
        columnWrapperStyle={
          styles.row
        }
        contentContainerStyle={
          styles.listContainer
        }
        ListEmptyComponent={
          <View
            style={{
              alignItems:
                'center',
              marginTop: 80,
            }}
          >
            <Ionicons
              name="cube-outline"
              size={70}
              color="#CCC"
            />

            <Text
              style={{
                marginTop: 14,
                fontSize: 16,
                color: '#888',
                fontWeight:
                  '600',
              }}
            >
              Produk tidak
              ditemukan
            </Text>
          </View>
        }
        renderItem={({
          item,
        }) => (
          <KartuProduk
            produk={item}
            onTambah={
              handleTambah
            }
          />
        )}
      />
    </View>
  );
}

// ─────────────────────────────
// STYLE
// ─────────────────────────────
const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F4F6F1',
    },

    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',

      backgroundColor:
        '#FFF',

      marginHorizontal: 16,
      marginTop: 14,

      height: 52,

      borderRadius: 18,

      paddingHorizontal: 14,

      elevation: 2,

      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 5,
    },

    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 15,
      color: '#222',
    },

    categoryContainer: {
      paddingHorizontal: 16,
      paddingTop: 14,
      paddingBottom: 6,
    },

    categoryButton: {
      height: 42,

      minWidth: 100,

      paddingHorizontal: 18,

      borderRadius: 24,

      backgroundColor:
        '#FFF',

      justifyContent:
        'center',

      alignItems: 'center',

      marginRight: 10,

      borderWidth: 1,
      borderColor:
        '#E3E3E3',
    },

    categoryButtonActive: {
      backgroundColor:
        '#2E7D32',

      borderColor:
        '#2E7D32',
    },

    categoryText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#666',
    },

    categoryTextActive: {
      color: '#FFF',
    },

    totalText: {
      marginHorizontal: 16,
      marginTop: 8,
      marginBottom: 10,

      fontSize: 13,
      color: '#777',
    },

    listContainer: {
      paddingHorizontal: 16,
      paddingTop: 6,
      paddingBottom: 140,
      flexGrow: 1,
    },

    row: {
      justifyContent:
        'space-between',
      marginBottom: 16,
    },

    card: {
      width: CARD_WIDTH,

      backgroundColor:
        '#FFF',

      borderRadius: 22,

      overflow: 'hidden',

      elevation: 3,

      shadowColor: '#000',
      shadowOpacity: 0.06,

      shadowOffset: {
        width: 0,
        height: 2,
      },

      shadowRadius: 5,
    },

    imageArea: {
      height: 145,

      justifyContent:
        'center',

      alignItems: 'center',
    },

    emoji: {
      fontSize: 58,
    },

    badge: {
      position: 'absolute',

      top: 10,
      right: 10,

      paddingHorizontal: 10,
      paddingVertical: 5,

      borderRadius: 10,
    },

    badgeText: {
      color: '#FFF',
      fontSize: 10,
      fontWeight: '700',
    },

    content: {
      padding: 13,
    },

    title: {
      fontSize: 16,
      fontWeight: '700',

      color: '#222',

      lineHeight: 22,

      minHeight: 48,
    },

    seller: {
      marginTop: 4,

      fontSize: 11,
      color: '#888',
    },

    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',

      marginTop: 8,
    },

    rating: {
      marginLeft: 4,

      fontSize: 12,
      fontWeight: '600',

      color: '#333',
    },

    sold: {
      marginLeft: 5,

      fontSize: 11,
      color: '#999',
    },

    bottomRow: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      marginTop: 12,
    },

    price: {
      flex: 1,

      fontSize: 15,
      fontWeight: 'bold',

      color: '#2E7D32',

      marginRight: 6,
    },

    addButton: {
      width: 44,
      height: 44,

      borderRadius: 14,

      justifyContent:
        'center',

      alignItems: 'center',
    },
  });
