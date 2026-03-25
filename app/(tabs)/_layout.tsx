import { Tabs } from 'expo-router';
import { Text } from 'react-native';

// Couleurs définies directement ici pour éviter tout problème d'import
const TERRE = '#C85A1E';
const MIEL  = '#B89A6A';
const CREME = '#FDF8F2';
const BORDURE = '#E8D9C5';

function TabIcon({ emoji }: { emoji: string }) {
  return <Text style={{ fontSize: 20 }}>{emoji}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TERRE,
        tabBarInactiveTintColor: MIEL,
        tabBarStyle: {
          backgroundColor: CREME,
          borderTopColor: BORDURE,
          borderTopWidth: 0.5,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: () => <TabIcon emoji="🏠" />,
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          title: 'Explorer',
          tabBarIcon: () => <TabIcon emoji="🌍" />,
        }}
      />
      <Tabs.Screen
        name="recherche"
        options={{
          title: 'Recherche',
          tabBarIcon: () => <TabIcon emoji="🔍" />,
        }}
      />
      <Tabs.Screen
        name="favoris"
        options={{
          title: 'Favoris',
          tabBarIcon: () => <TabIcon emoji="❤️" />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: () => <TabIcon emoji="👤" />,
        }}
      />
    </Tabs>
  );
}