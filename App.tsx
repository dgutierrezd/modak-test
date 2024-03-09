/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  NativeModules,
} from 'react-native';
import MainScreen from './screens/MainScreen';
import 'react-native-gesture-handler'
import EventDetail from './screens/EventDetail';

const { CalendarManager } = NativeModules;

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} options={{ animation: 'simple_push' }} />
        <Stack.Screen name="EventDetail" component={EventDetail} options={{ animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  /* return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title="Click to invoke your native module!"
            color="#841584"
            onPress={() => {
              CalendarManager.addEvent('Meeting', new Date().valueOf(), new Date(Date.now() + 3600000).valueOf())
                .then((result) => {
                  Alert.alert('Event added successfully');
                })
                .catch((error) => {
                  Alert.alert('Failed to add event');
                });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  ); */
}

export default App;
