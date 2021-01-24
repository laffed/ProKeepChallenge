import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile';
import {AppStackParamList, AuthStackParamList, RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {useOvermind} from '../overmind';

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  const GlobalState = useOvermind().state.User;

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {GlobalState.isLoggedIn && <AppNavigator />}
      {!GlobalState.isLoggedIn && <AuthNavigator />}
      {/* <RootNavigator /> */}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

function AppNavigator() {

  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Profile' component={Profile} />
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

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}} />
    </RootStack.Navigator>
  );
}
