import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AboutScreen({ navigation }: any) {
  const { colors, isDarkMode } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.tint }]}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings-outline" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.avatar, { backgroundColor: colors.tint + '22', borderColor: colors.tint }]}>
          <Icon name="person" size={40} color={colors.tint} />
        </View>
        <Text style={[styles.name, { color: isDarkMode ? '#F0F0F8' : '#0F0F1A' }]}>Swaroop R</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Computer Science Major</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: isDarkMode ? '#F0F0F8' : '#0F0F1A' }]}>Statistics Summary</Text>

      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Icon name="checkmark-circle" size={32} color={colors.tint} />
          <Text style={[styles.statNumber, { color: isDarkMode ? '#F0F0F8' : '#0F0F1A' }]}>42</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tasks Done</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Icon name="time" size={32} color="#FFB800" />
          <Text style={[styles.statNumber, { color: isDarkMode ? '#F0F0F8' : '#0F0F1A' }]}>5</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Hours Saved</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: colors.tint }]}
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="options" size={20} color="#0F0F1A" />
        <Text style={styles.btnText}>Open Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  btnText: {
    color: '#0F0F1A',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
