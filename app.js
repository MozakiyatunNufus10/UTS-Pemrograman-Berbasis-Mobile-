import React, {
  useState,
  createContext,
} from 'react';

import {
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { Ionicons }
from '@expo/vector-icons';

// ─────────────────────────────────────────────
// SCREEN
// ─────────────────────────────────────────────
import HomeScreen
from './screens/HomeScreen';

import ProdukScreen
from './screens/ProdukScreen';

import KeranjangScreen
from './screens/KeranjangScreen';

import PesananScreen
from './screens/Pesananscreen';

import LoginScreen
from './screens/LoginScreen';

import ProfilScreen
from './screens/ProfileScreen';

import EditProfilScreen
from './screens/EditScreen';

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────
import {
  PesananProvider,
} from './context/Pesanancontext.js';

// ─────────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────────
import {
  COLORS,
} from './constants/colors';

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────
const Tab =
  createBottomTabNavigator();

const Stack =
  createNativeStackNavigator();

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────
export const KeranjangContext =
  createContext();

export const ProfilContext =
  createContext();

// ─────────────────────────────────────────────
// TAB NAVIGATOR
// ─────────────────────────────────────────────
function MainTabs() {

  return (

    <Tab.Navigator

      screenOptions={({

        route,

      }) => ({

        headerShown: false,

        tabBarActiveTintColor:
          COLORS.primary,

        tabBarInactiveTintColor:
          '#999',

        tabBarStyle: {

          height: 70,

          paddingBottom: 8,

          paddingTop: 8,

          borderTopWidth: 0,

          elevation: 10,

          backgroundColor:
            '#fff',

        },

        tabBarLabelStyle: {

          fontSize: 12,

          fontWeight: '600',

        },

        tabBarIcon: ({
          color,
          focused,
        }) => {

          let iconName;

          switch (
            route.name
          ) {

            case 'Beranda':
              iconName =
                focused
                  ? 'home'
                  : 'home-outline';
              break;

            case 'Produk':
              iconName =
                focused
                  ? 'grid'
                  : 'grid-outline';
              break;

            case 'Keranjang':
              iconName =
                focused
                  ? 'cart'
                  : 'cart-outline';
              break;

            case 'Pesanan':
              iconName =
                focused
                  ? 'receipt'
                  : 'receipt-outline';
              break;

            case 'Profil':
              iconName =
                focused
                  ? 'person'
                  : 'person-outline';
              break;

            default:
              iconName =
                'ellipse-outline';

          }

          return (

            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />

          );

        },

      })}
    >

      {/* BERANDA */}
      <Tab.Screen
        name="Beranda"
        component={HomeScreen}
      />

      {/* PRODUK */}
      <Tab.Screen
        name="Produk"
        component={ProdukScreen}
      />

      {/* KERANJANG */}
      <Tab.Screen
        name="Keranjang"
        component={KeranjangScreen}
      />

      {/* PESANAN */}
      <Tab.Screen
        name="Pesanan"
        component={PesananScreen}
      />

      {/* PROFIL */}
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
      />

    </Tab.Navigator>

  );

}

// ─────────────────────────────────────────────
// ROOT STACK
// ─────────────────────────────────────────────
function RootStack() {

  return (

    <Stack.Navigator>

      {/* TAB */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />

      {/* EDIT PROFIL */}
      <Stack.Screen
        name="EditProfil"
        component={
          EditProfilScreen
        }
        options={{
          title: 'Edit Profil',

          headerStyle: {
            backgroundColor:
              COLORS.primary,
          },

          headerTintColor:
            '#fff',

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

    </Stack.Navigator>

  );

}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
export default function App() {

  // ─────────────────────────
  // STATE
  // ─────────────────────────
  const [
    keranjang,
    setKeranjang,
  ] = useState([]);

  const [
    isLoggedIn,
    setIsLoggedIn,
  ] = useState(false);

  const [
    profil,
    setProfil,
  ] = useState({

    nama: 'Moza',

    email:
      'moza@gmail.com',

    telepon:
      '087854444768',

    kota:
      'Banyuwangi',

    bergabung:
      'Mei 2026',

    inisial: 'M',

  });

  // ─────────────────────────
  // LOGIN
  // ─────────────────────────
  const handleLogin = (
    dataUser
  ) => {

    setProfil({

      nama:
        dataUser?.nama ||
        'Moza',

      email:
        dataUser?.email ||
        'moza@gmail.com',

      telepon:
        dataUser?.telepon ||
        '087854444768',

      kota:
        dataUser?.kota ||
        'Banyuwangi',

      bergabung:
        'Mei 2026',

      inisial:
        dataUser?.nama

          ? dataUser.nama
              .charAt(0)
              .toUpperCase()

          : 'M',

    });

    setIsLoggedIn(true);

  };

  // ─────────────────────────
  // LOGOUT
  // ─────────────────────────
  const handleLogout =
    () => {

      setIsLoggedIn(false);

    };

  // ─────────────────────────
  // TAMBAH KERANJANG
  // ─────────────────────────
  const tambahKeKeranjang =
    (produk) => {

      setKeranjang(
        (prev) => {

          const existing =
            prev.find(
              (item) =>
                item.id ===
                produk.id
            );

          if (existing) {

            return prev.map(
              (item) =>

                item.id ===
                produk.id

                  ? {
                      ...item,
                      qty:
                        item.qty +
                        1,
                    }

                  : item

            );

          }

          return [

            ...prev,

            {
              ...produk,
              qty: 1,
            },

          ];

        }
      );

    };

  // ─────────────────────────
  // HAPUS KERANJANG
  // ─────────────────────────
  const hapusDariKeranjang =
    (id) => {

      setKeranjang(
        (prev) =>

          prev.filter(
            (item) =>
              item.id !== id
          )

      );

    };

  // ─────────────────────────
  // UBAH QTY
  // ─────────────────────────
  const ubahQty = (
    id,
    delta
  ) => {

    setKeranjang(
      (prev) =>

        prev
          .map((item) =>

            item.id === id

              ? {
                  ...item,
                  qty:
                    item.qty +
                    delta,
                }

              : item

          )
          .filter(
            (item) =>
              item.qty > 0
          )

    );

  };

  // ─────────────────────────
  // RENDER
  // ─────────────────────────
  return (

    <PesananProvider>

      <KeranjangContext.Provider
        value={{

          keranjang,

          tambahKeKeranjang,

          hapusDariKeranjang,

          ubahQty,

        }}
      >

        <ProfilContext.Provider
          value={{

            profil,

            setProfil,

            handleLogout,

          }}
        >

          <SafeAreaView
            style={{

              flex: 1,

              backgroundColor:
                COLORS.background,

              paddingTop:
                Platform.OS ===
                'android'

                  ? StatusBar.currentHeight

                  : 0,

            }}
          >

            <NavigationContainer>

              {isLoggedIn ? (

                <RootStack />

              ) : (

                <LoginScreen
                  onLogin={
                    handleLogin
                  }
                />

              )}

            </NavigationContainer>

          </SafeAreaView>

        </ProfilContext.Provider>

      </KeranjangContext.Provider>

    </PesananProvider>

  );

}
