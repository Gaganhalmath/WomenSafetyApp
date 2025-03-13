import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ScrollView, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function CyberCentreScreen() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91your phone no.',
    details: '',
  });

  // Store the selected image URI from the camera roll
  const [evidenceUri, setEvidenceUri] = useState(null);

  // Function to open the camera roll (gallery) for picking evidence
  const pickEvidenceFromGallery = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your camera roll to attach evidence.');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    // Check if the user canceled
    if (!result.canceled) {
      // For older versions of expo-image-picker, check `result.cancelled` instead
      setEvidenceUri(result.assets[0].uri);
    }
  };

  // Submit or save the updated profile + evidence
  const handleSubmitProfile = () => {
    // For demonstration, we just alert the user
    // Replace with your API call to save data to the backend
    Alert.alert(
      'Profile & Evidence Submitted',
      `Name: ${userData.name}\nEmail: ${userData.email}\nPhone: ${userData.phone}\nDetails: ${userData.details}\nEvidence URI: ${evidenceUri || 'No file selected'}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>File a Cyber-Bullying Complaint</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={userData.name}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={userData.email}
        keyboardType="email-address"
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={userData.phone}
        keyboardType="phone-pad"
        onChangeText={(text) => setUserData({ ...userData, phone: text })}
      />

      <Text style={styles.label}>Incident Details</Text>
      <TextInput
        style={styles.input}
        value={userData.details}
        onChangeText={(text) => setUserData({ ...userData, details: text })}
        multiline
      />

      <Text style={styles.label}>Evidence (Optional)</Text>
      <TouchableOpacity style={styles.evidenceButton} onPress={pickEvidenceFromGallery}>
        <Text style={styles.evidenceButtonText}>Pick from Gallery</Text>
      </TouchableOpacity>

      {evidenceUri && (
        <Image source={{ uri: evidenceUri }} style={styles.evidencePreview} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitProfile}>
        <Ionicons name="save" size={24} color="white" />
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F9F9F9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#007AFF' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  input: { 
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderColor: '#007AFF',
    borderWidth: 1,
    marginTop: 5
  },
  evidenceButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  evidenceButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  evidencePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: 'center'
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: { color: 'white', fontSize: 18, marginLeft: 8 },
});
