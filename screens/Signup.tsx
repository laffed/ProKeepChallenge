import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import {useOvermind} from '../overmind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../types';
import {Formik} from 'formik';
import {SignUpSchema} from '../assets/validationSchemas';


type NavProp = StackNavigationProp<AuthStackParamList, 'Signup'>;
function Signup({navigation}: {navigation: NavProp}) {
  const GlobalActions = useOvermind().actions.User;


  const onSignup = async ({email, password}: {email: string; password: string}) => {
    await fetch("https://reqres.in/api/register", {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
      .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.setItem('isLoggedIn', 'true')
          await AsyncStorage.setItem('email', email)
            .then(() => {GlobalActions.setLogin(email)})
        }
      })
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={values => {onSignup(values)}}
    >
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View
          style={[
            {
              width: '100%',
              alignSelf: 'center',
            },
            styles.loginScreen,
          ]}
        >
          <View style={styles.loginForm}>
            <Text style={[styles.notice, {color: 'white'}]}>
              Signup into the Greatest App in the World!
            </Text>
            <Text style={[styles.notice, {color: 'red'}]}>
              {touched.email && errors.email}
            </Text>
            <Text style={[styles.notice, {color: 'red'}]}>
              {touched.password && errors.password}
            </Text>
            <Text style={[styles.notice, {color: 'red'}]}>
              {touched.confirmPassword && errors.confirmPassword}
            </Text>
            <View style={{marginVertical: 20}}>
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Email"
                value={values.email}
                inputStyle={[styles.input,
                {fontSize: 16}
                ]}
                placeholderTextColor="#999"
              />
              <Input
                placeholder="Password"
                onBlur={handleBlur('password')}
                inputStyle={[
                  styles.input,
                  {fontSize: 16}
                ]}
                placeholderTextColor="#999"
                onChangeText={handleChange('password')}
                value={values.password}
              />
              <Input
                placeholder="Confirm Password"
                onBlur={handleBlur('confirmPassword')}
                inputStyle={[
                  styles.input,
                  {fontSize: 16}
                ]}
                placeholderTextColor="#999"
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
              />
            </View>
          </View>
          <View style={{marginVertical: 20}}>
            <TouchableOpacity
              style={[styles.loginBtn]}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  {paddingHorizontal: 20, paddingVertical: 10, color: 'white', fontSize: 20},

                ]}
              >
                Sign Up
          </Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate('Login')}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15
                }}
              >
                Login
          </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik >
  );
}

export default Signup;

const styles = StyleSheet.create({
  notice: {
    textAlign: 'center',
    fontFamily: 'Barlow',
    fontSize: 20,
  },
  loginBtn: {
    backgroundColor: '#f3b64e',
    borderRadius: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  loginScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B7990',
  },
  loginForm: {
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
  },
  input: {
    color: 'white'
  },
});