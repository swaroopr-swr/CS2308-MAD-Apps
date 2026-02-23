import React from 'react';
import { Text, Image, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hellowwwww !!!!!!</Text>
      <Text style={styles.text}>How are youuuuu!!!!</Text>

      <Image
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLat8bZvhXD3ChSXyzGsFVh6qgplm1KhYPKA&s" }}
        style={styles.image}
      />

      <Button title="Presss Meee" onPress={() => Alert.alert('Button pressed')} />

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => Alert.alert("Presssseddd Meeeeeee")}
        onLongPress={() => Alert.alert("Long press detected!")}
      >
        <Text style={styles.touchText}>Presss meeeee Buddyyyyy</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0052ccff",
    padding: 16,
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    height: 200,
    width: 200,
    marginVertical: 12,
  },
  touchable: {
    padding: 20,
    backgroundColor: 'red',
    marginTop: 16,
  },
  touchText: {
    color: 'white',
    textAlign: 'center',
  },
});