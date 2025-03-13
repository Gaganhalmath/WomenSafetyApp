// App.js (in project root)
import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your screens from the consistent folder path
import HomeScreen from './app/screen/HomeScreen';
import ChatArea from './app/screen/ChatScreen';
import CyberCentreScreen from './app/screen/CyberCentreScreen';
import ProfileScreen from './app/screen/ProfileScreen';
import BotScreen from './app/screen/BotScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const appTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={appTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Chat') iconName = 'chatbubbles-outline';
            else if (route.name === 'CyberCentre') iconName = 'newspaper-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
            else if (route.name === 'Bot') iconName = 'chatbubble-ellipses-outline';
            else if (route.name === 'Home') iconName = 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0078FF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chat" component={ChatArea} />
        <Tab.Screen name="CyberCentre" component={CyberCentreScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Bot" component={BotScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
