import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { saveCart, loadCart } from '../utils/storage.js';

export default function CartScreen({ route }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    initCart();
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    if (route.params?.item) {
      setCart(prev => [...prev, route.params.item]);
    }
  }, [route.params]);

  const initCart = async () => {
    const data = await loadCart();
    setCart(data);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Keranjang</Text>

      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} - Rp {item.price}</Text>
        )}
      />

      <Text style={styles.total}>Total: Rp {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold' },
  item: { padding: 10, backgroundColor: '#fff', marginVertical: 5 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 10 }
});
