import { View, Text, Button } from 'react-native';
import React from 'react';

const Details = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Product Name: Headphones</Text>
      <Text>Price: ₹2999</Text>
      <Text>Description: Wireless headphones</Text>

      <Button title="Add to Cart" onPress={() => navigation.navigate('Cart')} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Details;