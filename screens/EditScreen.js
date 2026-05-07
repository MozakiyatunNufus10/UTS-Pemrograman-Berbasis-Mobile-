import React, {
  useContext,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  ProfilContext,
} from '../App';

import {
  COLORS,
} from '../constants/colors';

export default function ProfileScreen() {

  const {
    profil,
    setProfil,
    handleLogout,
  } = useContext(ProfilContext);

  // ─────────────────────────
  // STATE
  // ─────────────────────────
  const [isEdit, setIsEdit] =
    useState(false);

  const [nama, setNama] =
    useState(
      profil?.nama || ''
    );

  const [
    telepon,
    setTelepon,
  ] = useState(
    profil?.telepon || ''
  );

  const [kota, setKota] =
    useState(
      profil?.kota || ''
    );

  // ─────────────────────────
  // SIMPAN
  // ─────────────────────────
  const handleSimpan = () => {

    if (
      !nama ||
      !telepon ||
      !kota
    ) {

      Alert.alert(
        'Oops',
        'Semua data wajib diisi'
      );

      return;

    }

    setProfil({

      ...profil,

      nama,
      telepon,
      kota,

    });

    setIsEdit(false);

    Alert.alert(
      'Berhasil 🎉',
      'Profil berhasil diperbarui'
    );

  };

  return (

    <SafeAreaView
      style={styles.safeArea}
    >

      <StatusBar
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <View style={styles.avatar}>

            <Text
              style={styles.avatarText}
            >

              {nama
                ?.charAt(0)
                ?.toUpperCase()}

            </Text>

          </View>

          <Text style={styles.nama}>

            {nama}

          </Text>

          <Text style={styles.email}>

            user@gmail.com

          </Text>

        </View>

        {/* CARD */}
        <View style={styles.card}>

          {/* HEADER CARD */}
          <View
            style={styles.cardHeader}
          >

            <Text
              style={styles.cardTitle}
            >
              Data Profil
            </Text>

            {/* EDIT BUTTON */}
            <Pressable

              android_ripple={{
                color:
                  '#ffffff44',
                borderless: true,
              }}

              style={({ pressed }) => [

                styles.editBtn,

                pressed && {
                  opacity: 0.8,
                },

              ]}

              onPress={() => {

                setIsEdit(
                  (prev) => !prev
                );

              }}
            >

              <Ionicons
                name={
                  isEdit
                    ? 'close'
                    : 'create-outline'
                }
                size={20}
                color="#fff"
              />

            </Pressable>

          </View>

          {/* NAMA */}
          <Text style={styles.label}>
            Nama Lengkap
          </Text>

          <View
            style={styles.inputBox}
          >

            <Ionicons
              name="person-outline"
              size={22}
              color="#777"
            />

            <TextInput
              value={nama}
              editable={isEdit}
              onChangeText={
                setNama
              }
              style={styles.input}
              placeholder="Nama lengkap"
              placeholderTextColor="#999"
            />

          </View>

          {/* TELEPON */}
          <Text style={styles.label}>
            Nomor Telepon
          </Text>

          <View
            style={styles.inputBox}
          >

            <Ionicons
              name="call-outline"
              size={22}
              color="#777"
            />

            <TextInput
              value={telepon}
              editable={isEdit}
              keyboardType="phone-pad"
              onChangeText={
                setTelepon
              }
              style={styles.input}
              placeholder="Nomor telepon"
              placeholderTextColor="#999"
            />

          </View>

          {/* KOTA */}
          <Text style={styles.label}>
            Kota
          </Text>

          <View
            style={styles.inputBox}
          >

            <Ionicons
              name="location-outline"
              size={22}
              color="#777"
            />

            <TextInput
              value={kota}
              editable={isEdit}
              onChangeText={
                setKota
              }
              style={styles.input}
              placeholder="Kota"
              placeholderTextColor="#999"
            />

          </View>

          {/* BUTTON SIMPAN */}
          {isEdit && (

            <Pressable

              android_ripple={{
                color:
                  '#ffffff33',
              }}

              style={({ pressed }) => [

                styles.saveBtn,

                pressed && {
                  opacity: 0.85,
                },

              ]}

              onPress={
                handleSimpan
              }
            >

              <Ionicons
                name="save-outline"
                size={22}
                color="#fff"
              />

              <Text
                style={styles.saveText}
              >
                Simpan Perubahan
              </Text>

            </Pressable>

          )}

        </View>

        {/* MENU */}
        <View style={styles.menuCard}>

          <Pressable
            style={styles.menuItem}
          >

            <Ionicons
              name="receipt-outline"
              size={22}
              color={
                COLORS.primary ||
                '#2f8f2f'
              }
            />

            <Text
              style={styles.menuText}
            >
              Riwayat Pesanan
            </Text>

          </Pressable>

          <Pressable
            style={styles.menuItem}
          >

            <Ionicons
              name="heart-outline"
              size={22}
              color={
                COLORS.primary ||
                '#2f8f2f'
              }
            />

            <Text
              style={styles.menuText}
            >
              Favorit
            </Text>

          </Pressable>

        </View>

        {/* LOGOUT */}
        <Pressable

          android_ripple={{
            color:
              '#ffffff33',
          }}

          style={({ pressed }) => [

            styles.logoutBtn,

            pressed && {
              opacity: 0.85,
            },

          ]}

          onPress={handleLogout}
        >

          <Ionicons
            name="log-out-outline"
            size={22}
            color="#fff"
          />

          <Text
            style={styles.logoutText}
          >
            Logout
          </Text>

        </Pressable>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles =
  StyleSheet.create({

    safeArea: {
      flex: 1,
      backgroundColor:
        '#f4f7f1',
      paddingTop:
        Platform.OS ===
        'android'

          ? StatusBar.currentHeight

          : 0,
    },

    header: {
      backgroundColor:
        COLORS.primary ||
        '#2f8f2f',

      paddingTop: 40,

      paddingBottom: 40,

      alignItems: 'center',

      borderBottomLeftRadius: 30,

      borderBottomRightRadius: 30,
    },

    avatar: {
      width: 95,
      height: 95,

      borderRadius: 50,

      backgroundColor:
        '#ffffff33',

      justifyContent:
        'center',

      alignItems: 'center',

      marginBottom: 14,
    },

    avatarText: {
      fontSize: 38,
      fontWeight: 'bold',
      color: '#fff',
    },

    nama: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },

    email: {
      marginTop: 6,
      color: '#e9ffe9',
      fontSize: 14,
    },

    card: {
      backgroundColor:
        '#fff',

      marginHorizontal: 20,

      marginTop: -20,

      borderRadius: 26,

      padding: 20,

      elevation: 5,

      shadowColor: '#000',

      shadowOpacity: 0.08,

      shadowRadius: 10,

      shadowOffset: {
        width: 0,
        height: 4,
      },
    },

    cardHeader: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      marginBottom: 10,
    },

    cardTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#222',
    },

    editBtn: {

      width: 44,
      height: 44,

      borderRadius: 22,

      justifyContent:
        'center',

      alignItems: 'center',

      backgroundColor:
        COLORS.primary ||
        '#2f8f2f',

      elevation: 8,

      zIndex: 999,
    },

    label: {
      fontSize: 14,

      color: '#666',

      marginTop: 16,

      marginBottom: 8,

      fontWeight: '600',
    },

    inputBox: {

      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor:
        '#f5f5f5',

      borderRadius: 16,

      paddingHorizontal: 14,

      height: 58,
    },

    input: {
      flex: 1,

      marginLeft: 12,

      fontSize: 15,

      color: '#222',
    },

    saveBtn: {

      marginTop: 26,

      height: 56,

      borderRadius: 18,

      backgroundColor:
        COLORS.primary ||
        '#2f8f2f',

      justifyContent:
        'center',

      alignItems: 'center',

      flexDirection: 'row',
    },

    saveText: {

      color: '#fff',

      fontSize: 16,

      fontWeight: 'bold',

      marginLeft: 10,
    },

    menuCard: {

      backgroundColor:
        '#fff',

      marginHorizontal: 20,

      marginTop: 20,

      borderRadius: 24,

      overflow: 'hidden',

      elevation: 3,
    },

    menuItem: {

      flexDirection: 'row',

      alignItems: 'center',

      paddingVertical: 18,

      paddingHorizontal: 20,

      borderBottomWidth: 1,

      borderBottomColor:
        '#f0f0f0',
    },

    menuText: {

      marginLeft: 14,

      fontSize: 15,

      fontWeight: '600',

      color: '#222',
    },

    logoutBtn: {

      marginHorizontal: 20,

      marginTop: 24,

      backgroundColor:
        '#e74c3c',

      height: 56,

      borderRadius: 18,

      justifyContent:
        'center',

      alignItems: 'center',

      flexDirection: 'row',
    },

    logoutText: {

      color: '#fff',

      fontSize: 16,

      fontWeight: 'bold',

      marginLeft: 10,
    },

  });
