import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../ThemeContext';

type Priority = "high" | "medium" | "low";
type Subject = "Math" | "Science" | "English" | "History" | "Art" | "CS" | "Other";
type FilterType = "all" | "active" | "done";

interface Task {
  id: string; title: string; subject: Subject; priority: Priority; dueDate: string; completed: boolean; createdAt: number; notes?: string;
}

const SUBJECTS: Subject[] = ["Math", "Science", "English", "History", "Art", "CS", "Other"];
const PRIORITIES: Priority[] = ["high", "medium", "low"];

const SUBJECT_COLORS: Record<Subject, string> = {
  Math: "#FF6B6B", Science: "#4ECDC4", English: "#FFE66D", History: "#A78BFA", Art: "#F97316", CS: "#22D3EE", Other: "#94A3B8",
};

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; icon: string }> = {
  high: { label: "High", color: "#FF4444", icon: "arrow-up-circle" },
  medium: { label: "Medium", color: "#FFB800", icon: "remove-circle" },
  low: { label: "Low", color: "#00CC88", icon: "arrow-down-circle" },
};

function generateId() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

const SAMPLE_TASKS: Task[] = [
  { id: "1", title: "Finish calculus problem set", subject: "Math", priority: "high", dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10), completed: false, createdAt: Date.now() - 3600000 },
  { id: "2", title: "Read Chapter 7 – Photosynthesis", subject: "Science", priority: "medium", dueDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10), completed: false, createdAt: Date.now() - 7200000 },
];

const DEFAULT_FORM = { title: "", subject: "Math" as Subject, priority: "medium" as Priority, dueDate: tomorrow, notes: "" };

export default function TaskScreen() {
  const { colors, isDarkMode } = useTheme();
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [filter, setFilter] = useState<FilterType>("all");
  const [subjectFilter, setSubjectFilter] = useState<Subject | "All">("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [form, setForm] = useState(DEFAULT_FORM);

  const mainTextColor = isDarkMode ? '#F0F0F8' : '#0F0F1A';

  const openAddForm = () => { setEditTask(null); setForm(DEFAULT_FORM); setShowForm(true); };
  const openEditForm = (task: Task) => { setEditTask(task); setForm({ title: task.title, subject: task.subject, priority: task.priority, dueDate: task.dueDate, notes: task.notes || "" }); setShowForm(true); };
  
  const handleSubmit = () => {
    if (!form.title.trim()) return;
    if (editTask) {
      setTasks(prev => prev.map(t => t.id === editTask.id ? { ...t, ...form } : t));
    } else {
      setTasks(prev => [{ id: generateId(), ...form, completed: false, createdAt: Date.now() }, ...prev]);
    }
    setShowForm(false); setEditTask(null);
  };

  const toggleComplete = (id: string) => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

  const filtered = tasks.filter(t => {
    if (filter === "active" && t.completed) return false;
    if (filter === "done" && !t.completed) return false;
    if (subjectFilter !== "All" && t.subject !== subjectFilter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Text style={[styles.headerTitle, { color: colors.tint }]}>Tasks</Text>

      <View style={[styles.searchWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Icon name="search" size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
        <TextInput
          style={[styles.searchInput, { color: mainTextColor }]}
          placeholder="Search tasks..."
          placeholderTextColor={colors.textSecondary}
          value={search} onChangeText={setSearch}
        />
      </View>

      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.controlRow}>
          <View style={[styles.filterGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {(["all", "active", "done"] as FilterType[]).map(f => (
              <TouchableOpacity key={f} style={[styles.filterBtn, filter === f && { backgroundColor: colors.tint }]} onPress={() => setFilter(f)}>
                <Text style={[styles.filterBtnText, { color: filter === f ? '#0F0F1A' : colors.textSecondary }, filter === f && { fontWeight: 'bold' }]}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll} contentContainerStyle={styles.chipRow}>
          {(["All", ...SUBJECTS] as const).map(subj => {
            const active = subjectFilter === subj;
            const color = subj === "All" ? colors.tint : SUBJECT_COLORS[subj as Subject];
            return (
              <TouchableOpacity key={subj} style={[styles.chip, { backgroundColor: active ? color : colors.card, borderColor: active ? color : colors.border }]} onPress={() => setSubjectFilter(subj as any)}>
                <Text style={[styles.chipText, { color: active ? "#0F0F1A" : colors.textSecondary }]}>{subj}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.tint }]} onPress={openAddForm}>
          <Icon name="add" size={20} color="#0F0F1A" />
          <Text style={styles.addBtnText}>Add Task</Text>
        </TouchableOpacity>

        <View style={styles.taskList}>
          {filtered.length === 0 && (
            <View style={styles.empty}>
              <Icon name="document-text-outline" size={48} color={colors.border} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No tasks found</Text>
            </View>
          )}
          {filtered.map(task => {
            const subColor = SUBJECT_COLORS[task.subject];
            return (
              <View key={task.id} style={[styles.taskCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: task.completed ? 0.6 : 1, borderLeftColor: subColor, borderLeftWidth: 4 }]}>
                <View style={styles.taskTop}>
                  <TouchableOpacity style={[styles.checkbox, { borderColor: task.completed ? colors.tint : colors.border, backgroundColor: task.completed ? colors.tint : "transparent" }]} onPress={() => toggleComplete(task.id)}>
                    {task.completed && <Icon name="checkmark" size={16} color="#0F0F1A" />}
                  </TouchableOpacity>

                  <View style={styles.taskInfo}>
                    <Text style={[styles.taskTitle, { color: mainTextColor }, task.completed && { textDecorationLine: 'line-through', color: colors.textSecondary }]}>{task.title}</Text>
                    <View style={styles.taskMeta}>
                      <View style={[styles.subjectTag, { backgroundColor: `${subColor}22`, borderColor: `${subColor}55` }]}>
                        <Text style={[styles.subjectTagText, { color: subColor }]}>{task.subject}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                         <Icon name={PRIORITY_CONFIG[task.priority].icon} size={14} color={PRIORITY_CONFIG[task.priority].color} />
                         <Text style={{ fontSize: 11, color: colors.textSecondary }}>{PRIORITY_CONFIG[task.priority].label}</Text>
                      </View>
                      <Text style={[styles.dueText, { color: colors.textSecondary }]}><Icon name="calendar" size={10} /> {task.dueDate}</Text>
                    </View>
                  </View>

                  <View style={styles.taskActions}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => openEditForm(task)}>
                      <Icon name="pencil" size={18} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => deleteTask(task.id)}>
                      <Icon name="trash" size={18} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Modal visible={showForm} transparent animationType="slide" onRequestClose={() => setShowForm(false)}>
        <View style={styles.overlay}>
          <View style={[styles.formCard, { backgroundColor: isDarkMode ? '#13131F' : '#FFFFFF', borderColor: colors.border }]}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: colors.tint }]}>{editTask ? "Edit Task" : "New Task"}</Text>
              <TouchableOpacity onPress={() => setShowForm(false)}><Icon name="close" size={24} color={colors.textSecondary} /></TouchableOpacity>
            </View>

            <TextInput style={[styles.formInput, { backgroundColor: colors.background, borderColor: colors.border, color: mainTextColor }]} placeholder="Task title..." placeholderTextColor={colors.textSecondary} value={form.title} onChangeText={v => setForm(f => ({ ...f, title: v }))} />
            <TextInput style={[styles.formInput, { backgroundColor: colors.background, borderColor: colors.border, color: mainTextColor }]} placeholder="Due date (YYYY-MM-DD)" placeholderTextColor={colors.textSecondary} value={form.dueDate} onChangeText={v => setForm(f => ({ ...f, dueDate: v }))} />

            <Text style={[styles.formLabel, { color: colors.textSecondary }]}>Subject</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }} contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
              {SUBJECTS.map(subj => {
                const active = form.subject === subj; const color = SUBJECT_COLORS[subj];
                return (
                  <TouchableOpacity key={subj} style={[styles.chip, { backgroundColor: active ? color : colors.card, borderColor: active ? color : colors.border }]} onPress={() => setForm(f => ({ ...f, subject: subj }))}>
                    <Text style={[styles.chipText, { color: active ? "#0F0F1A" : colors.textSecondary }]}>{subj}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={[styles.formLabel, { color: colors.textSecondary }]}>Priority</Text>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
              {PRIORITIES.map(p => {
                const active = form.priority === p; const conf = PRIORITY_CONFIG[p];
                return (
                  <TouchableOpacity key={p} style={[styles.priorityBtn, { borderColor: active ? conf.color : colors.border, backgroundColor: active ? `${conf.color}22` : colors.card }]} onPress={() => setForm(f => ({ ...f, priority: p }))}>
                    <Icon name={conf.icon} size={14} color={active ? conf.color : colors.textSecondary} style={{ marginRight: 4 }} />
                    <Text style={[styles.priorityBtnText, { color: active ? conf.color : colors.textSecondary }]}>{conf.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity style={[styles.cancelBtn, { borderColor: colors.border }]} onPress={() => setShowForm(false)}><Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.tint }]} onPress={handleSubmit}><Text style={styles.submitBtnText}>{editTask ? "Save Changes" : "Add Task"}</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 50 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 20, marginBottom: 16 },
  scroll: { flex: 1 },
  searchWrap: { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 16, borderRadius: 12, borderWidth: 1, paddingHorizontal: 14 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 14 },
  controlRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginBottom: 16 },
  filterGroup: { flexDirection: "row", borderRadius: 10, padding: 4, borderWidth: 1, flex: 1 },
  filterBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  filterBtnText: { fontSize: 12 },
  chipScroll: { marginBottom: 16 },
  chipRow: { paddingHorizontal: 20, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 12, fontWeight: "600" },
  addBtn: { marginHorizontal: 20, marginBottom: 16, borderRadius: 12, paddingVertical: 14, alignItems: "center", flexDirection: 'row', justifyContent: 'center', gap: 8 },
  addBtnText: { fontSize: 14, fontWeight: "700", color: "#0F0F1A" },
  taskList: { paddingHorizontal: 20, gap: 10, paddingBottom: 30 },
  taskCard: { borderRadius: 12, borderWidth: 1, overflow: "hidden", marginBottom: 10 },
  taskTop: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  checkbox: { width: 22, height: 22, borderRadius: 7, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 15, fontWeight: "600", marginBottom: 6 },
  taskMeta: { flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center" },
  subjectTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, borderWidth: 1 },
  subjectTagText: { fontSize: 10, fontWeight: "700" },
  dueText: { fontSize: 11 },
  taskActions: { gap: 8, flexDirection: 'row' },
  iconBtn: { padding: 4 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.65)", justifyContent: "flex-end" },
  formCard: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, borderWidth: 1 },
  formHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  formTitle: { fontSize: 18, fontWeight: "700" },
  formLabel: { fontSize: 11, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8 },
  formInput: { borderRadius: 10, borderWidth: 1, padding: 14, fontSize: 14, marginBottom: 14 },
  priorityBtn: { flex: 1, borderRadius: 10, borderWidth: 1, paddingVertical: 10, alignItems: "center", flexDirection: 'row', justifyContent: 'center' },
  priorityBtnText: { fontSize: 12, fontWeight: "600" },
  formActions: { flexDirection: "row", gap: 12, marginTop: 8 },
  cancelBtn: { flex: 1, borderRadius: 10, borderWidth: 1, paddingVertical: 14, alignItems: "center" },
  cancelBtnText: { fontSize: 14 },
  submitBtn: { flex: 2, borderRadius: 10, paddingVertical: 14, alignItems: "center" },
  submitBtnText: { color: "#0F0F1A", fontSize: 14, fontWeight: "700" },
  empty: { alignItems: "center", paddingVertical: 60 },
  emptyText: { marginTop: 12, fontSize: 14 },
});
