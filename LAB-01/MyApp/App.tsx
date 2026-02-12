import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Pressable
} from 'react-native';

const App = () => {
  return (
    <View style={{ alignItems: 'center', marginTop: 50 }}>

      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Hello Techhieesssss!
      </Text>

      <Image
        source={{ uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg' }}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />

      <Button
        title="Click Me"
        onPress={() => Alert.alert('Button Pressed!')}
      />

      {/* TouchableOpacity Button */}
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: '#4CAF50',
          padding: 10,
          borderRadius: 5
        }}
        onPress={() => Alert.alert('Touchable Pressed!')}
      >
        <Text style={{ color: 'white' }}>Me Touchable</Text>
      </TouchableOpacity>

      {/* Pressable Button */}
      <Pressable
        style={({ pressed }) => ({
          marginTop: 15,
          backgroundColor: pressed ? '#555' : '#2196F3',
          padding: 10,
          borderRadius: 5
        })}
        onPress={() => Alert.alert('Pressable Pressed!')}
      >
        <Text style={{ color: 'white' }}>Me Pressable</Text>
      </Pressable>

    </View>
  );
};

export default App;