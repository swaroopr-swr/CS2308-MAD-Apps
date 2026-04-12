import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }: any) {
  const { colors, isDarkMode } = useTheme();

  // Mock stats representing tasks
  const total = 12;
  const done = 8;
  const urgent = 2;
  const progress = Math.round((done / total) * 100);

  const mainTextColor = isDarkMode ? '#F0F0F8' : '#0F0F1A';

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Good morning,</Text>
          <Text style={[styles.name, { color: mainTextColor }]}>Swaroop</Text>
        </View>
        <TouchableOpacity style={[styles.profileBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Icon name="person" size={20} color={colors.tint} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: mainTextColor }]}>Dashboard</Text>

      <View style={[styles.statsRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.statCol}>
          <Text style={[styles.statNum, { color: colors.tint }]}>{total}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={[styles.statNum, { color: colors.tint }]}>{done}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Done</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={[styles.statNum, { color: '#FF6B6B' }]}>{urgent}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Urgent</Text>
        </View>
      </View>

      <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: mainTextColor }]}>Daily Progress</Text>
          <Text style={[styles.progressPct, { color: colors.tint }]}>{progress}%</Text>
        </View>
        <View style={[styles.progressBarBg, { backgroundColor: colors.background }]}>
          <View style={[styles.progressBarFill, { backgroundColor: colors.tint, width: `${progress}%` as any }]} />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: mainTextColor, marginTop: 20 }]}>Upcoming Tasks</Text>

      <View style={[styles.taskCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, { color: mainTextColor }]}>Read Chapter 7</Text>
          <View style={styles.taskMeta}>
            <Icon name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={[styles.taskMetaText, { color: colors.textSecondary }]}>Due Tomorrow</Text>
          </View>
        </View>
        <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>
      
      <View style={[styles.taskCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, { color: mainTextColor }]}>Math Problem Set</Text>
          <View style={styles.taskMeta}>
            <Icon name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={[styles.taskMetaText, { color: '#FF6B6B' }]}>Due Today</Text>
          </View>
        </View>
        <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  greeting: { fontSize: 16 },
  name: { fontSize: 28, fontWeight: 'bold' },
  profileBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  statsRow: { flexDirection: 'row', borderRadius: 16, borderWidth: 1, paddingVertical: 16, marginBottom: 24 },
  statCol: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { fontSize: 12, textTransform: 'uppercase' },
  divider: { width: 1, backgroundColor: 'rgba(150,150,150,0.2)' },
  progressCard: { borderRadius: 16, borderWidth: 1, padding: 20, marginBottom: 24 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  progressTitle: { fontSize: 16, fontWeight: '600' },
  progressPct: { fontSize: 16, fontWeight: 'bold' },
  progressBarBg: { height: 8, borderRadius: 4 },
  progressBarFill: { height: 8, borderRadius: 4 },
  taskCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12 },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  taskMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  taskMetaText: { fontSize: 12 }
});
