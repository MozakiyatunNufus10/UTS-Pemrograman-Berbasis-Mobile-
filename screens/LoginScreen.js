import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function LoginScreen({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [tampilPassword, setTampilPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simpan akun sementara
  const [akun, setAkun] = useState({
    email: 'admin@gmail.com',
    password: '123456',
    nama: 'Admin',
  });

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Gagal', 'Email dan password wajib diisi!');
      return;
    }

    // REGISTER
    if (isRegister) {
      if (!nama.trim()) {
        Alert.alert('Gagal', 'Nama wajib diisi!');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Gagal', 'Password minimal 6 karakter!');
        return;
      }

      setLoading(true);

      setTimeout(() => {
        setAkun({
          nama,
          email,
          password,
        });

        setLoading(false);

        Alert.alert(
          'Berhasil',
          'Akun berhasil dibuat, silakan login!'
        );

        setIsRegister(false);

        setNama('');
        setPassword('');
      }, 800);

      return;
    }

    // LOGIN
    if (
      email === akun.email &&
      password === akun.password
    ) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        onLogin({
          nama: akun.nama,
          email: akun.email,
          isGuest: false,
        });
      }, 800);
    } else {
      Alert.alert('Gagal', 'Email atau password salah!');
    }
  };

  // GUEST LOGIN
  const handleGuest = () => {
    onLogin({
      nama: 'Guest',
      email: '',
      isGuest: true,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.kontainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoArea}>
          <View style={styles.logoKotak}>
            <Ionicons
              name="storefront"
              size={48}
              color={COLORS.white}
            />
          </View>

          <Text style={styles.logoTeks}>
            UMKM Nusantara
          </Text>

          <Text style={styles.logoSubteks}>
            Platform Digital UMKM Lokal Indonesia
          </Text>
        </View>

        {/* FORM */}
        <View style={styles.kartuForm}>
          <Text style={styles.judulForm}>
            {isRegister ? 'Daftar Akun' : 'Masuk ke Akun'}
          </Text>

          <Text style={styles.subjudulForm}>
            {isRegister
              ? 'Buat akun baru ✨'
              : 'Selamat datang kembali 👋'}
          </Text>

          {/* Nama */}
          {isRegister && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nama</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />

                <TextInput
                  style={styles.input}
                  value={nama}
                  onChangeText={setNama}
                  placeholder="Masukkan nama"
                  placeholderTextColor="#bbb"
                />
              </View>
            </View>
          )}

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={16}
                color={COLORS.textSecondary}
              />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Masukkan email"
                placeholderTextColor="#bbb"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Password
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color={COLORS.textSecondary}
              />

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Masukkan password"
                placeholderTextColor="#bbb"
                secureTextEntry={!tampilPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setTampilPassword(!tampilPassword)
                }
              >
                <Ionicons
                  name={
                    tampilPassword
                      ? 'eye-outline'
                      : 'eye-off-outline'
                  }
                  size={16}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tombol */}
          <TouchableOpacity
            style={[
              styles.tombolLogin,
              loading && { opacity: 0.7 },
            ]}
            onPress={handleSubmit}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Ionicons
              name={
                isRegister
                  ? 'person-add-outline'
                  : 'log-in-outline'
              }
              size={18}
              color={COLORS.white}
            />

            <Text style={styles.tombolLoginT}>
              {loading
                ? 'Memproses...'
                : isRegister
                ? 'Daftar'
                : 'Masuk'}
            </Text>
          </TouchableOpacity>

          {/* Ganti Mode */}
          <TouchableOpacity
            style={styles.switchMode}
            onPress={() => setIsRegister(!isRegister)}
          >
            <Text style={styles.switchModeText}>
              {isRegister
                ? 'Sudah punya akun? Masuk'
                : 'Belum punya akun? Daftar'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.garisDivider} />
            <Text style={styles.dividerTeks}>
              atau
            </Text>
            <View style={styles.garisDivider} />
          </View>

          {/* Guest */}
          <TouchableOpacity
            style={styles.tombolDemo}
            onPress={handleGuest}
            activeOpacity={0.85}
          >
            <Ionicons
              name="flash-outline"
              size={16}
              color={COLORS.primary}
            />

            <Text style={styles.tombolDemoT}>
              Coba Tanpa Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons
            name="heart"
            size={14}
            color={COLORS.danger}
          />

          <Text style={styles.footerTeks}>
            {' '}
            Mendukung UMKM Lokal Indonesia
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kontainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center',
  },

  logoArea: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logoKotak: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    marginBottom: 12,
  },

  logoTeks: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },

  logoSubteks: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  kartuForm: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },

  judulForm: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },

  subjudulForm: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 14,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },

  tombolLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    elevation: 2,
    marginTop: 10,
  },

  tombolLoginT: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  switchMode: {
    marginTop: 16,
    alignItems: 'center',
  },

  switchModeText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 13,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 14,
  },

  garisDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },

  dividerTeks: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  tombolDemo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  tombolDemoT: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  footerTeks: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
});
