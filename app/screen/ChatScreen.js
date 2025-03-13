// app/screens/ChatScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = { id: Date.now().toString(), text: messageText, sender: 'me' };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.chatBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.sender}: {item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECE5DD', padding: 10 },
  chatBubble: { padding: 10, borderRadius: 8, marginVertical: 5, maxWidth: '70%' },
  myMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherMessage: { backgroundColor: '#FFF', alignSelf: 'flex-start' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  input: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 8 },
  sendButton: { backgroundColor: '#25D366', padding: 10, borderRadius: 50, marginLeft: 8 },
});
