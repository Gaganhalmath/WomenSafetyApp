// app/screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
  });

  const handleEditProfile = () => {
    Alert.alert('Profile Updated', 'Your profile details have been successfully updated.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Profile Information</Text>
      <Text style={styles.label}>Name</Text>
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
      <TouchableOpacity style={styles.saveButton} onPress={handleEditProfile}>
        <Ionicons name="save" size={24} color="white" />
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F9F9F9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#007AFF' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  input: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderColor: '#007AFF', borderWidth: 1, marginTop: 5 },
  saveButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  buttonText: { color: 'white', fontSize: 18, marginLeft: 8 },
});
