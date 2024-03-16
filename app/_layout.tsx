import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#141414',
          },
        }}
      />
      <StatusBar style='light' backgroundColor='#111' translucent />
    </>
  );
}
