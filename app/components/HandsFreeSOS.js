import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PorcupineManager } from '@picovoice/porcupine-react-native';

export default function HandsFreeSOS() {
  const [porcupineManager, setPorcupineManager] = useState(null);
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    async function initPorcupine() {
      try {
        // Define the path to your custom wake word model.
        // If you have an iOS version, adjust the path accordingly.
        const keywordPaths = Platform.OS === 'web'
          ? [require('../../assets/models/Please-HELP_en_android_v3_0_0.ppn')]
          : [require('../../assets/models/Please-HELP_en_ios_v3_0_0.ppn')]; 

        // Callback that is called when a wake word is detected.
        const detectionCallback = (keywordIndex) => {
          // For one keyword model, keywordIndex will be 0 when detected.
          Alert.alert("SOS Triggered", "Emergency SOS activated via voice!");
          triggerSOS();
        };

        // Initialize Porcupine with your access key, model paths, detection callback, and sensitivity.
        let manager = await PorcupineManager.fromKeywordPaths('.........................., ')// Replace with your actual PicoVoice access key
          keywordPaths,
          detectionCallback,
          [0.5] // Sensitivity (adjust as needed)
        );
        setPorcupineManager(manager);
        await manager.start();
      } catch (error) {
        console.error('Error initializing Porcupine:', error);
      }
    }

    initPorcupine();

    // Cleanup: stop and release Porcupine when component unmounts
    return () => {
      if (porcupineManager) {
        porcupineManager.stop();
        porcupineManager.release();
      }
    };
  }, []);

  const triggerSOS = () => {
    // Insert your SOS logic here: send emergency message, location, notify contacts, etc.
    Alert.alert("SOS Triggered", "Emergency SOS activated!");
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true })
    ]).start();
  };

  // Optional manual toggle (for testing)
  const toggleListening = async () => {
    if (!porcupineManager) return;
    try {
      await porcupineManager.stop();
      await porcupineManager.start();
    } catch (error) {
      console.error("Error toggling listening", error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.micButton, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity onPress={toggleListening}>
          <Ionicons name="mic" size={28} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Position this as a floating button
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  micButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
});
