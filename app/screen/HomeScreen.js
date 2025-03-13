import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, 
  Image, TextInput, Alert, Modal, Animated, Platform 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import MapView, { Marker } from "react-native-maps";
import HandsFreeSOS from '../components/HandsFreeSOS';

export default function HomeScreen() {
  const [contacts, setContacts] = useState([
    { id: "1", name: "user1", phone: "your no." },
    { id: "2", name: "user2", phone: "numbee" }
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [region, setRegion] = useState(null);
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Get user's location for the map tile
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required for map display.");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleAddContact = () => {
    const newEntry = { id: Date.now().toString(), ...newContact };
    setContacts([...contacts, newEntry]);
    setModalVisible(false);
  };

  const sendSOSAlert = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access is required for SOS alerts.");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    const message = `I am in danger! My current location is:\nLatitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`;
    contacts.forEach((contact) => {
      const whatsappURL = `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;
      Linking.openURL(whatsappURL).catch(() =>
        Alert.alert("Failed to Send", `Could not send SOS alert to ${contact.name}.`)
      );
    });
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true })
    ]).start();
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactText}>{item.name}</Text>
      <View style={styles.icons}>
        <TouchableOpacity>
          <Ionicons name="call" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.profileImage} />
        <Text style={styles.profileName}>Welcome User!</Text>
      </View>
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
  <HandsFreeSOS />
</View>

      {/* Community Section */}
      <View style={styles.communitySection}>
        <Text style={styles.heading}>Community</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
        <FlatList data={contacts} keyExtractor={(item) => item.id} renderItem={renderItem} />
      </View>

      {/* Live Location Tile (only for native platforms) */}
      {Platform.OS !== 'web' && region && (
        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={region}>
            <Marker coordinate={region} title="You are here" />
          </MapView>
        </View>
      )}

      {/* Modal for Adding Contacts */}
      <Modal visible={isModalVisible} transparent>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Name"
            value={newContact.name}
            onChangeText={(text) => setNewContact({ ...newContact, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={newContact.phone}
            onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleAddContact}>
            <Text style={styles.modalButtonText}>Add Contact</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* SOS Button with Animation */}
      <Animated.View style={[styles.sosButtonWrapper, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity style={styles.sosButton} onPress={sendSOSAlert}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 20 },
  profileSection: { alignItems: "center", marginVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  profileName: { fontSize: 20, fontWeight: "bold" },
  communitySection: { backgroundColor: "#f9f9f9", padding: 10, borderRadius: 10 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#333", marginVertical: 10 },
  contactItem: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 15, marginVertical: 5, borderRadius: 10, elevation: 2 },
  contactText: { fontSize: 18 },
  icons: { flexDirection: "row", gap: 15 },
  addButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 30, alignSelf: "center", marginTop: 10 },
  mapContainer: {
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden"
  },
  map: { flex: 1 },
  sosButtonWrapper: { 
    position: "absolute", 
    bottom: 50, 
    alignSelf: "center",
    shadowColor: "#FF0000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8 
  },
  sosButton: { backgroundColor: "red", paddingVertical: 20, paddingHorizontal: 40, borderRadius: 50 },
  sosText: { color: "white", fontSize: 22, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  input: { backgroundColor: "#fff", width: 300, padding: 10, marginVertical: 10, borderRadius: 10 },
  modalButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5 },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
});
