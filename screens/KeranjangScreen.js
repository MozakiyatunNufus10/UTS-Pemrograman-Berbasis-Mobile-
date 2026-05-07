import React, {
  useContext,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

import { Ionicons }
from '@expo/vector-icons';

import {
  KeranjangContext,
  ProfilContext,
} from '../App';

import {
  usePesanan,
} from '../context/Pesanancontext';

export default function
KeranjangScreen({
  navigation,
}) {

  // ─────────────────────────
  // CONTEXT
  // ─────────────────────────
  const {
    keranjang,
    hapusDariKeranjang,
    ubahQty,
  } = useContext(
    KeranjangContext
  );

  const {
    profil,
  } = useContext(
    ProfilContext
  );

  const {
    tambahPesanan,
  } = usePesanan();

  // ─────────────────────────
  // STATE
  // ─────────────────────────
  const [
    metodePengiriman,
    setMetodePengiriman,
  ] = useState({

    id: 1,

    nama: 'Reguler',

    estimasi: '3-5 Hari',

    harga: 12000,

  });

  // ─────────────────────────
  // ONGKIR
  // ─────────────────────────
  const ongkirList = [

    {
      id: 1,
      nama: 'Reguler',
      estimasi: '3-5 Hari',
      harga: 12000,
    },

    {
      id: 2,
      nama: 'Ekspres',
      estimasi: '1-2 Hari',
      harga: 25000,
    },

  ];

  // ─────────────────────────
  // TOTAL
  // ─────────────────────────
  const subtotal =
    keranjang.reduce(

      (sum, item) =>

        sum +
        item.harga *
          item.qty,

      0

    );

  const total =
    subtotal +
    metodePengiriman.harga;

  // ─────────────────────────
  // CHECKOUT
  // ─────────────────────────
  const handleCheckout = () => {

    if (
      keranjang.length === 0
    ) {

      Alert.alert(
        'Keranjang kosong'
      );

      return;

    }

    // DATA PESANAN
    const pesananBaru = {

      id: Date.now(),

      tanggal:
        new Date().toLocaleDateString(
          'id-ID'
        ),

      produk:
        keranjang,

      total,

      status:
        'Diproses',

      pengiriman:
        metodePengiriman,

    };

    // SIMPAN KE CONTEXT
    tambahPesanan(
      pesananBaru
    );

    Alert.alert(
      'Checkout Berhasil 🎉'
    );

    // PINDAH KE PESANAN
    navigation.navigate(
      'Pesanan'
    );

  };

  // ─────────────────────────
  // ITEM
  // ─────────────────────────
  const renderItem = ({
    item,
  }) => (

    <View style={styles.card}>

      <View
        style={styles.imageBox}
      >

        <Text
          style={styles.image}
        >
          🫘
        </Text>

      </View>

      <View style={styles.info}>

        <Text
          style={styles.nama}
        >
          {item.nama}
        </Text>

        <Text
          style={styles.harga}
        >
          Rp{' '}
          {item.harga.toLocaleString(
            'id-ID'
          )}
        </Text>

        <Text
          style={
            styles.subtotal
          }
        >
          Subtotal: Rp{' '}
          {(
            item.harga *
            item.qty
          ).toLocaleString(
            'id-ID'
          )}
        </Text>

      </View>

      <View
        style={styles.right}
      >

        <TouchableOpacity
          onPress={() =>
            hapusDariKeranjang(
              item.id
            )
          }
        >

          <Ionicons
            name="trash-outline"
            size={24}
            color="#d9534f"
          />

        </TouchableOpacity>

        <View
          style={
            styles.qtyContainer
          }
        >

          <TouchableOpacity
            onPress={() =>
              ubahQty(
                item.id,
                -1
              )
            }
          >

            <Text
              style={
                styles.qtyBtn
              }
            >
              −
            </Text>

          </TouchableOpacity>

          <Text
            style={
              styles.qtyText
            }
          >
            {item.qty}
          </Text>

          <TouchableOpacity
            onPress={() =>
              ubahQty(
                item.id,
                1
              )
            }
          >

            <Text
              style={
                styles.qtyBtn
              }
            >
              +
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </View>

  );

  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >

        <Text
          style={styles.jumlah}
        >
          {keranjang.length}{' '}
          produk dalam keranjang
        </Text>

        <FlatList
          data={keranjang}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={renderItem}
          scrollEnabled={false}
        />

        {/* DATA */}
        <View style={styles.box}>

          <Text
            style={styles.boxTitle}
          >
            Data Pengiriman
          </Text>

          <View
            style={styles.inputBox}
          >

            <Ionicons
              name="person-outline"
              size={24}
              color="#777"
            />

            <TextInput
              value={
                profil?.nama
              }
              style={styles.input}
            />

          </View>

          <View
            style={styles.inputBox}
          >

            <Ionicons
              name="call-outline"
              size={24}
              color="#777"
            />

            <TextInput
              value={
                profil?.telepon
              }
              style={styles.input}
            />

          </View>

          <View
            style={[
              styles.inputBox,

              {
                height: 100,
                alignItems:
                  'flex-start',
              },
            ]}
          >

            <Ionicons
              name="location-outline"
              size={24}
              color="#777"
              style={{
                marginTop: 8,
              }}
            />

            <TextInput
              multiline
              value={
                profil?.kota
              }
              style={styles.input}
            />

          </View>

        </View>

        {/* ONGKIR */}
        <View style={styles.box}>

          <Text
            style={styles.boxTitle}
          >
            Metode Pengiriman
          </Text>

          {ongkirList.map(
            (item) => (

              <TouchableOpacity
                key={item.id}
                style={[
                  styles.ongkirBox,

                  metodePengiriman.id ===
                    item.id && {

                    borderColor:
                      '#2f8f2f',

                    backgroundColor:
                      '#eef7ee',

                  },
                ]}
                onPress={() =>
                  setMetodePengiriman(
                    item
                  )
                }
              >

                <View>

                  <Text
                    style={
                      styles.ongkirNama
                    }
                  >
                    {item.nama}
                  </Text>

                  <Text
                    style={
                      styles.ongkirHarga
                    }
                  >
                    Rp{' '}
                    {item.harga.toLocaleString(
                      'id-ID'
                    )}
                  </Text>

                </View>

                {metodePengiriman.id ===
                  item.id && (

                  <Ionicons
                    name="checkmark-circle"
                    size={28}
                    color="#2f8f2f"
                  />

                )}

              </TouchableOpacity>

            )
          )}

        </View>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>

        <View>

          <Text
            style={
              styles.totalLabel
            }
          >
            Total Pembayaran
          </Text>

          <Text
            style={styles.total}
          >
            Rp{' '}
            {total.toLocaleString(
              'id-ID'
            )}
          </Text>

        </View>

        <TouchableOpacity
          style={
            styles.checkoutBtn
          }
          onPress={
            handleCheckout
          }
        >

          <Ionicons
            name="bag-check-outline"
            size={22}
            color="#fff"
          />

          <Text
            style={
              styles.checkoutText
            }
          >
            CHECKOUT
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor:
        '#edf3e6',
    },

    jumlah: {
      fontSize: 18,
      fontWeight: '700',
      margin: 16,
      color: '#555',
    },

    card: {
      flexDirection: 'row',
      backgroundColor:
        '#fff',
      marginHorizontal: 16,
      borderRadius: 24,
      padding: 16,
      marginBottom: 16,
    },

    imageBox: {
      width: 90,
      height: 90,
      borderRadius: 20,
      backgroundColor:
        '#f8e7df',
      justifyContent:
        'center',
      alignItems: 'center',
    },

    image: {
      fontSize: 42,
    },

    info: {
      flex: 1,
      marginLeft: 16,
    },

    nama: {
      fontSize: 18,
      fontWeight: '700',
    },

    harga: {
      marginTop: 4,
      color: '#777',
    },

    subtotal: {
      marginTop: 8,
      fontWeight: '700',
      color: '#d2691e',
    },

    right: {
      justifyContent:
        'space-between',
      alignItems: 'flex-end',
    },

    qtyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:
        '#edf3e6',
      borderRadius: 18,
      paddingHorizontal: 12,
    },

    qtyBtn: {
      fontSize: 28,
      width: 30,
      textAlign: 'center',
    },

    qtyText: {
      fontSize: 20,
      fontWeight: '700',
      marginHorizontal: 12,
    },

    box: {
      backgroundColor:
        '#fff',
      marginHorizontal: 16,
      borderRadius: 24,
      padding: 18,
      marginBottom: 20,
    },

    boxTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
    },

    inputBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:
        '#f5f5f5',
      borderRadius: 20,
      paddingHorizontal: 16,
      marginBottom: 16,
      height: 72,
    },

    input: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
    },

    ongkirBox: {
      borderWidth: 2,
      borderColor: '#eee',
      borderRadius: 20,
      padding: 16,
      marginBottom: 14,
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'center',
    },

    ongkirNama: {
      fontSize: 17,
    },

    ongkirHarga: {
      marginTop: 6,
      color: '#2f8f2f',
      fontWeight: '700',
      fontSize: 18,
    },

    footer: {
      position: 'absolute',
      bottom: 80,
      left: 0,
      right: 0,
      backgroundColor:
        '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'center',
    },

    totalLabel: {
      color: '#777',
    },

    total: {
      marginTop: 4,
      fontSize: 24,
      fontWeight: '800',
      color: '#2f8f2f',
    },

    checkoutBtn: {
      backgroundColor:
        '#2f8f2f',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 28,
      paddingVertical: 18,
      borderRadius: 20,
    },

    checkoutText: {
      color: '#fff',
      fontWeight: '800',
      fontSize: 18,
      marginLeft: 10,
    },

  });
