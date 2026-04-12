import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingsScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.tint }]}>Settings</Text>
      
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name={isDarkMode ? "moon" : "sunny"} size={24} color={colors.tint} />
            <Text style={[styles.settingText, { color: isDarkMode ? '#F0F0F8' : '#0F0F1A' }]}>Dark Mode</Text>
          </View>
          <TouchableOpacity 
            style={[styles.toggleBtn, { backgroundColor: isDarkMode ? colors.tint : colors.border }]}
            onPress={toggleTheme}
          >
            <View style={[styles.toggleCircle, { transform: [{ translateX: isDarkMode ? 20 : 2 }] }]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  toggleBtn: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFF',
    position: 'absolute',
  }
});
