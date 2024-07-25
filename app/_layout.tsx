import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FavoritesProvider from './services/Favorites';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const client = new QueryClient();
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <QueryClientProvider client={client}>
    <FavoritesProvider>
    <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
    </FavoritesProvider>
    </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
