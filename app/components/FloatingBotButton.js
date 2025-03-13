// app/components/FloatingBotButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FloatingBotButton() {
  const navigation = useNavigation();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const toggleBot = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      navigation.navigate('Bot'); // Navigate to BotScreen
    });
  };

  return (
    <Animated.View style={[styles.floatingButton, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity onPress={toggleBot}>
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
});
