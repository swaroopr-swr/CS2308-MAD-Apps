import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Animated, Easing } from 'react-native';

const App = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Gentle pulse for profile picture
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        {/* Header */}
        <View style={styles.header}>
          <Animated.Image 
            source={require('./assets/profile.png')} 
            style={[styles.profilePic, { transform: [{ scale: pulseAnim }] }]} 
          />
          <Text style={styles.name}>SWAROOP R</Text>
          <Text style={styles.role}>Student | Mobile App Developer</Text>
          <Text style={styles.tagline}>"Building apps, one bug at a time."</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.text}>
            I am a student learning Mobile Application Development. I enjoy building simple and useful mobile apps.
          </Text>

          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillRow}>
            <Text style={styles.skill}>JavaScript</Text>
            <Text style={styles.skill}>React Native</Text>
            <Text style={styles.skill}>Android</Text>
          </View>

          {/* Animated Button */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              style={styles.button}
              onPress={() => Alert.alert('Contact', 'Email: yourname@gmail.com')}
            >
              <Text style={styles.buttonText}>Contact Me</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF0FF',
    paddingVertical: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '92%',
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: '#6C63FF',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  role: {
    fontSize: 14,
    color: '#EDEBFF',
    marginTop: 4,
  },
  tagline: {
    fontSize: 12,
    color: '#EDEBFF',
    marginTop: 6,
    fontStyle: 'italic',
  },
  content: {
    padding: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C54',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skill: {
    backgroundColor: '#EFEFFF',
    color: '#6C63FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginTop: 6,
    fontSize: 12,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 28,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default App;