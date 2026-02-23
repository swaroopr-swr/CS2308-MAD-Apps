import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import menu from './menu.json';

 type FoodItem = {
  id: number;
  name: string;
  category: 'Veg' | 'Non-Veg' | 'Beverage';
  price: number;
  rating: number;
 };

 const getCardColor = (category: FoodItem['category']) => {
  if (category === 'Veg') return '#d4f8d4';       // Light Green
  if (category === 'Non-Veg') return '#ffd6d6';   // Light Red
  if (category === 'Beverage') return '#d6eaff';  // Light Blue
  return '#f2f2f2';
 };

 export default function App() {
  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={[styles.card, { backgroundColor: getCardColor(item.category) }]}>
      <Text style={styles.name}>🍽 {item.name}</Text>
      <Text style={styles.text}>📂 {item.category}</Text>
      <Text style={styles.text}>💰 ₹{item.price}</Text>
      <Text style={styles.text}>⭐ {item.rating}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={menu as FoodItem[]}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<Text style={styles.header}>Restaurant Menu</Text>}
        ListFooterComponent={<Text style={styles.footer}>Thank You for Visiting</Text>}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        ListEmptyComponent={<Text style={styles.empty}>No food items available</Text>}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
 }

 const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  listContent: { alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginHorizontal: 10 },
  footer: { fontSize: 16, marginHorizontal: 10, color: '#666' },
  card: { width: 200, padding: 12, borderRadius: 12, marginVertical: 20, minHeight: 140, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  text: { fontSize: 14 },
  empty: { marginTop: 40, fontSize: 16, textAlign: 'center', color: '#666' }
 });