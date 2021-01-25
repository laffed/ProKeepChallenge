import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet, Image, StatusBar, Text, TouchableOpacity} from 'react-native'
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile';
import {AppStackParamList, AuthStackParamList, RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useOvermind} from '../overmind';

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  const GlobalState = useOvermind().state.User;
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {GlobalState.isLoggedIn && <AppNavigator />}
      {!GlobalState.isLoggedIn && <AuthNavigator />}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

function AppNavigator() {
  const GlobalActions = useOvermind().actions.User;

  const onLogout = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    await AsyncStorage.setItem('email', '')
      .then(() => {
        GlobalActions.resetUserState();
      })
  }

  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Profile' component={Profile}
        options={{
          headerRight: (props) => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => {
                onLogout();
              }}>
                <Text
                  style={[
                    {
                      color: 'white',
                      marginRight: 30,
                      fontWeight: 'bold',
                      borderBottomWidth: 0,
                      fontFamily: 'Barlow'
                    },
                  ]}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#132c41',
            justifyContent: 'center'
          },
          headerTitleStyle: {color: 'white', fontFamily: 'Barlow'}
        }}
      />
    </AppStack.Navigator>
  );
}

function AuthNavigator() {

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name='Signup' component={Signup} />
      <AuthStack.Screen name='Login' component={Login} />
    </AuthStack.Navigator>
  );
}

