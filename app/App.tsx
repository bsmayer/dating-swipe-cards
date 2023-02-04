import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from './screens/Home';
import { UsersProvider } from './hooks';
import { Routes } from '@constants/routes';
import { ProfileDetailsScreen } from '@screens/ProfileDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UsersProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Routes.HOME}>
            <Stack.Screen name={Routes.HOME} component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={Routes.PROFILE_DETAILS}
              component={ProfileDetailsScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UsersProvider>
    </GestureHandlerRootView>
  );
}
