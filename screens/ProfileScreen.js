import React, { useState, useContext } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Switch, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProfilContext } from '../App';
import { COLORS } from '../constants/colors';

// ─────────────────────────────────────────────
//  Sub-komponen
// ─────────────────────────────────────────────
function MenuItem({ ikon, label, nilai, onPress, warna, tampilSwitch, switchNilai, onSwitch }) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={tampilSwitch ? undefined : onPress}
      activeOpacity={tampilSwitch ? 1 : 0.7}
    >
      <View style={[styles.menuIkon, { backgroundColor: (warna || COLORS.primary) + '20' }]}>
        <Ionicons name={ikon} size={18} color={warna || COLORS.primary} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      {tampilSwitch ? (
        <Switch
          value={switchNilai}
          onValueChange={onSwitch}
          trackColor={{ false: '#ddd', true: '#81C784' }}
          thumbColor={switchNilai ? COLORS.primary : '#f4f3f4'}
        />
      ) : (
        <View style={styles.menuKanan}>
          {nilai ? <Text style={styles.menuNilai}>{nilai}</Text> : null}
          <Ionicons name="chevron-forward" size={15} color="#ccc" />
        </View>
      )}
    </TouchableOpacity>
  );
}

function StatKartu({ label, nilai, ikon, warna }) {
  return (
    <View style={[styles.statKartu, { borderLeftColor: warna }]}>
      <Ionicons name={ikon} size={20} color={warna} />
      <Text style={[styles.statNilai, { color: warna }]}>{nilai}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────
//  Screen
// ─────────────────────────────────────────────
export default function ProfilScreen({ navigation }) {
  const { profil, handleLogout } = useContext(ProfilContext);
  const [notifikasi, setNotifikasi] = useState(true);
  const [modeMalam, setModeMalam] = useState(false);
  const [promoEmail, setPromoEmail] = useState(true);

  const STATISTIK = [
    { label: 'Pesanan', nilai: '24', ikon: 'bag-handle-outline', warna: COLORS.primary },
    { label: 'Favorit',  nilai: '12', ikon: 'heart-outline',       warna: COLORS.danger },
    { label: 'Review',   nilai: '8',  ikon: 'star-outline',         warna: '#F57F17' },
  ];

  const INFO_AKUN = [
    { ikon: 'person-outline',   label: 'Nama Lengkap', key: 'nama' },
    { ikon: 'mail-outline',     label: 'Email',        key: 'email' },
    { ikon: 'call-outline',     label: 'Telepon',      key: 'telepon' },
    { ikon: 'location-outline', label: 'Kota',         key: 'kota' },
    { ikon: 'calendar-outline', label: 'Bergabung',    key: 'bergabung' },
  ];

  const konfirmasiKeluar = () => {
    Alert.alert(
      'Keluar Akun',
      'Apakah Anda yakin ingin keluar dari akun ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: () => handleLogout(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.kontainer} showsVerticalScrollIndicator={false}>
      {/* Header Profil */}
      <View style={styles.headerProfil}>
        <View style={styles.avatarBesar}>
          <Text style={styles.avatarInisial}>{profil.inisial}</Text>
        </View>
        <Text style={styles.namaPengguna}>{profil.nama}</Text>
        <Text style={styles.emailPengguna}>{profil.email}</Text>
        <View style={styles.badgeMember}>
          <Ionicons name="star" size={13} color="#FFC107" />
          <Text style={styles.badgeMemberT}>Member UMKM Gold</Text>
        </View>
        <TouchableOpacity
          style={styles.tombolEdit}
          onPress={() => navigation.navigate('EditProfil')}
          activeOpacity={0.85}
        >
          <Ionicons name="pencil-outline" size={14} color={COLORS.primary} />
          <Text style={styles.tombolEditT}>Edit Profil</Text>
        </TouchableOpacity>
      </View>

      {/* Statistik */}
      <View style={styles.statGrid}>
        {STATISTIK.map((item) => (
          <StatKartu key={item.label} {...item} />
        ))}
      </View>

      {/* Info Akun */}
      <View style={styles.section}>
        <Text style={styles.sectionJudul}>Informasi Akun</Text>
        <View style={styles.kartuInfo}>
          {INFO_AKUN.map((item, idx) => (
            <React.Fragment key={item.key}>
              {idx > 0 && <View style={styles.garis} />}
              <View style={styles.infoRow}>
                <Ionicons name={item.ikon} size={15} color={COLORS.textSecondary} />
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoNilai}>{profil[item.key]}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Pengaturan */}
      <View style={styles.section}>
        <Text style={styles.sectionJudul}>Pengaturan</Text>
        <View style={styles.kartuMenu}>
          <MenuItem ikon="notifications-outline" label="Notifikasi" warna="#1E88E5" tampilSwitch switchNilai={notifikasi} onSwitch={setNotifikasi} />
          <View style={styles.garis} />
          <MenuItem ikon="moon-outline" label="Mode Malam" warna="#7B1FA2" tampilSwitch switchNilai={modeMalam} onSwitch={setModeMalam} />
          <View style={styles.garis} />
          <MenuItem ikon="mail-outline" label="Email Promo" warna="#00897B" tampilSwitch switchNilai={promoEmail} onSwitch={setPromoEmail} />
        </View>
      </View>

      {/* Lainnya */}
      <View style={styles.section}>
        <Text style={styles.sectionJudul}>Lainnya</Text>
        <View style={styles.kartuMenu}>
          <MenuItem ikon="help-circle-outline" label="Bantuan & FAQ" warna="#F57F17"
            onPress={() => Alert.alert('Bantuan', 'Hubungi kami di support@umkmnusantara.id')}
          />
          <View style={styles.garis} />
          <MenuItem ikon="document-text-outline" label="Syarat & Ketentuan" warna="#555"
            onPress={() => Alert.alert('Info', 'Halaman Syarat & Ketentuan')}
          />
          <View style={styles.garis} />
          <MenuItem ikon="shield-checkmark-outline" label="Kebijakan Privasi" warna="#1E88E5"
            onPress={() => Alert.alert('Info', 'Halaman Kebijakan Privasi')}
          />
          <View style={styles.garis} />
          <MenuItem ikon="information-circle-outline" label="Versi Aplikasi" nilai="1.0.0" warna={COLORS.textSecondary} />
        </View>
      </View>

      {/* Tombol Keluar */}
      <TouchableOpacity
        style={styles.tombolKeluar}
        onPress={konfirmasiKeluar}
        activeOpacity={0.85}
      >
        <Ionicons name="log-out-outline" size={18} color={COLORS.danger} />
        <Text style={styles.tombolKeluarT}>Keluar dari Akun</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerVersi}>UMKM Nusantara v1.0.0</Text>
        <Text style={styles.footerSlogan}>💚 Bangga Produk Lokal Indonesia</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  kontainer: { flex: 1, backgroundColor: COLORS.background },
  headerProfil: {
    backgroundColor: COLORS.primary,
    paddingTop: 28, paddingBottom: 28,
    alignItems: 'center', gap: 4,
  },
  avatarBesar: {
    width: 78, height: 78, borderRadius: 39,
    backgroundColor: COLORS.white,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 8, elevation: 3,
  },
  avatarInisial: { fontSize: 26, fontWeight: 'bold', color: COLORS.primary },
  namaPengguna: { fontSize: 20, fontWeight: 'bold', color: COLORS.white },
  emailPengguna: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 6 },
  badgeMember: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 20, marginBottom: 10,
  },
  badgeMemberT: { color: COLORS.white, fontSize: 12, fontWeight: '600' },
  tombolEdit: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: COLORS.white, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  },
  tombolEditT: { color: COLORS.primary, fontWeight: '600', fontSize: 13 },
  statGrid: { flexDirection: 'row', marginHorizontal: 16, marginTop: -14, gap: 8 },
  statKartu: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: 14,
    padding: 14, alignItems: 'center', gap: 4,
    elevation: 3, borderLeftWidth: 3,
  },
  statNilai: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 11, color: COLORS.textSecondary },
  section: { marginTop: 20, marginHorizontal: 16 },
  sectionJudul: { fontSize: 14, fontWeight: 'bold', color: COLORS.primaryDark, marginBottom: 8 },
  kartuInfo: { backgroundColor: COLORS.white, borderRadius: 14, paddingHorizontal: 14, elevation: 1 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  infoLabel: { flex: 1, fontSize: 13, color: COLORS.textSecondary },
  infoNilai: { fontSize: 13, fontWeight: '500', color: COLORS.textPrimary },
  garis: { height: 1, backgroundColor: '#f5f5f5' },
  kartuMenu: { backgroundColor: COLORS.white, borderRadius: 14, paddingVertical: 4, elevation: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, gap: 12 },
  menuIkon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: 14, color: COLORS.textPrimary },
  menuKanan: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  menuNilai: { fontSize: 13, color: COLORS.textSecondary },
  tombolKeluar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.white, marginHorizontal: 16, marginTop: 20,
    borderRadius: 14, padding: 14,
    borderWidth: 1.5, borderColor: '#FFCDD2', elevation: 1,
  },
  tombolKeluarT: { color: COLORS.danger, fontWeight: 'bold', fontSize: 15 },
  footer: { alignItems: 'center', paddingVertical: 28, gap: 4 },
  footerVersi: { fontSize: 12, color: '#aaa' },
  footerSlogan: { fontSize: 13, color: COLORS.textSecondary },
});
