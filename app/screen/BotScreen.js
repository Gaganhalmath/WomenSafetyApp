// app/screens/BotScreen.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function BotScreen() {
  // Replace with your Botpress chat widget URL
  const botUrl = 'Your Chat URL';
  
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: botUrl }}
        style={styles.webview}
        startInLoadingState
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});
