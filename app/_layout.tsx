import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';

import UserContextProvider from '../src/context';

export default function RootLayout() {
  return (
    <UserContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#141414',
          },
        }}
      />
      <StatusBar style='light' backgroundColor='#141414' translucent />
    </UserContextProvider>
  );
}
