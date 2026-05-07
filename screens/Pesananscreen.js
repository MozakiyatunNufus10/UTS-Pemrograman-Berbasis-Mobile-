import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  usePesanan,
} from '../context/Pesanancontext';

const STATUS_COLOR = {

  Diproses:
    '#f39c12',

  Dikirim:
    '#3498db',

  Selesai:
    '#2ecc71',

};

export default function
PesananScreen() {

  const {
    daftarPesanan,
  } = usePesanan();

  const renderItem = ({
    item,
  }) => (

    <View style={styles.card}>

      {/* HEADER */}
      <View
        style={styles.header}
      >

        <View>

          <Text
            style={
              styles.orderId
            }
          >
            Pesanan #
            {item.id}
          </Text>

          <Text
            style={
              styles.date
            }
          >
            {item.tanggal}
          </Text>

        </View>

        <View
          style={[
            styles.badge,

            {
              backgroundColor:
                STATUS_COLOR[
                  item.status
                ],
            },
          ]}
        >

          <Text
            style={
              styles.badgeText
            }
          >
            {item.status}
          </Text>

        </View>

      </View>

      {/* PRODUK */}
      {item.produk.map(
        (produk) => (

          <View
            key={produk.id}
            style={
              styles.productRow
            }
          >

            <Text
              style={
                styles.productName
              }
            >
              {produk.nama}
            </Text>

            <Text
              style={
                styles.productQty
              }
            >
              {produk.qty}x
            </Text>

            <Text
              style={
                styles.productPrice
              }
            >
              Rp{' '}
              {(
                produk.qty *
                produk.harga
              ).toLocaleString(
                'id-ID'
              )}
            </Text>

          </View>

        )
      )}

      {/* TOTAL */}
      <View
        style={styles.footer}
      >

        <Text
          style={
            styles.totalLabel
          }
        >
          Total
        </Text>

        <Text
          style={
            styles.total
          }
        >
          Rp{' '}
          {item.total.toLocaleString(
            'id-ID'
          )}
        </Text>

      </View>

    </View>

  );

  return (

    <SafeAreaView
      style={styles.container}
    >

      <Text style={styles.title}>
        Pesanan Saya
      </Text>

      {daftarPesanan.length ===
      0 ? (

        <View
          style={
            styles.emptyContainer
          }
        >

          <Ionicons
            name="receipt-outline"
            size={80}
            color="#ccc"
          />

          <Text
            style={
              styles.emptyText
            }
          >
            Belum ada pesanan
          </Text>

        </View>

      ) : (

        <FlatList
          data={daftarPesanan}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 16,
          }}
        />

      )}

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      '#edf3e6',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    margin: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent:
      'center',
    alignItems: 'center',
  },

  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#999',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom: 18,
  },

  orderId: {
    fontSize: 18,
    fontWeight: '700',
  },

  date: {
    color: '#777',
    marginTop: 4,
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },

  productRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  productName: {
    flex: 1,
    fontSize: 15,
  },

  productQty: {
    width: 50,
    textAlign: 'center',
  },

  productPrice: {
    fontWeight: '700',
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 14,
    paddingTop: 14,

    flexDirection: 'row',
    justifyContent:
      'space-between',
  },

  totalLabel: {
    fontSize: 16,
    color: '#666',
  },

  total: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2f8f2f',
  },

});
