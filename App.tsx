/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useEffect, useState } from 'react';
import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_STORAGE_ID, SAVED_STORAGE_ID } from './src/utils/constants';
import MainScreen from './src/screens/MainScreen';
import EventDetail from './src/screens/EventDetail';

const Stack = createNativeStackNavigator();

export const MyContext = createContext({});

function App(): React.JSX.Element {

  const [favorites, setFavorites] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_STORAGE_ID).then(res => {
      setFavorites(res ? JSON.parse(res) : []);
    })
    AsyncStorage.getItem(SAVED_STORAGE_ID).then(res => {
      setSaved(res ? JSON.parse(res) : []);
    })
  }, []);

  const onChangeFavorites = async (newFavorite: number, isFavorite: boolean) => {
    if (!isFavorite) {
      const tempFavorites = favorites?.length ? favorites : ''
      await AsyncStorage.setItem(FAVORITES_STORAGE_ID, JSON.stringify([...tempFavorites, newFavorite]));
      // @ts-ignore
      setFavorites([...tempFavorites, newFavorite])
    } else {
      const tempFavorites = favorites?.filter(f => f !== newFavorite);
      setFavorites(tempFavorites)
      await AsyncStorage.setItem(FAVORITES_STORAGE_ID, JSON.stringify(tempFavorites));
    }
  }

  const onScheduleEvent = async (newSave: number) => {
    const tempSaved = saved?.length ? saved : ''
    await AsyncStorage.setItem(SAVED_STORAGE_ID, JSON.stringify([...tempSaved, newSave]));
    // @ts-ignore
    setSaved([...tempSaved, newSave])
  }

  return (
    <NavigationContainer>
      <MyContext.Provider value={{ favorites, saved, onChangeFavorites, onScheduleEvent }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainScreen} options={{ animation: 'simple_push' }} />
          <Stack.Screen name="EventDetail" component={EventDetail} options={{ animation: 'slide_from_bottom' }} />
        </Stack.Navigator>
      </MyContext.Provider>
    </NavigationContainer>
  );
}

export default App;
