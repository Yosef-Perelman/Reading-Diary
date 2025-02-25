import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { I18nManager } from 'react-native';

// Enable RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: { 
          direction: 'rtl',
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F2F2F7',
          height: 60,
        },
        tabBarActiveTintColor: '#FF9500',
        tabBarInactiveTintColor: '#8E8E93',
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          color: '#000000',
          fontSize: 28,
          fontWeight: '700',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ספרים שלי',
          tabBarLabel: 'ספרים',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}