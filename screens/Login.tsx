import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, Alert, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Icon} from 'react-native-elements';
import {useOvermind} from '../overmind';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../types';
import {Formik} from 'formik';
import {LoginSchema} from '../assets/validationSchemas';
import {WindMillLoading} from 'react-loadingg';

type NavProp = StackNavigationProp<AuthStackParamList, 'Login'>;


function Login({navigation}: {navigation: NavProp}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState('');

  const GlobalActions = useOvermind().actions.User;

  const setPasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const onLogin = async ({email, password}: {email: string, password: string}) => {
    setIsLoading(true);
    fetch("https://reqres.in/api/login", {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
      .then((response) => {
        if (response.status === 200) {
          AsyncStorage.setItem('isLoggedIn', 'true')
          AsyncStorage.setItem('email', email)
            .then(() => {GlobalActions.setLogin(email)})
        } else {
          setError('Invalid Login');
          setIsLoading(false);
        }
      })
  }

  const checkUserLogin = async () => {
    await AsyncStorage.getItem('isLoggedIn')
      .then(async isLoggedIn => {
        if (isLoggedIn === 'true') {
          await AsyncStorage.getItem('email')
            .then(email => {
              if (email && email.length > 0)
                GlobalActions.setLogin(email)
            });
        }
      });
  }


  useFocusEffect(
    React.useCallback(() => {
      checkUserLogin();
      setError('');
      setIsLoading(false);
    }, [])
  )

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={LoginSchema}
      onSubmit={values => {onLogin(values)}}
    >
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <KeyboardAvoidingView
          style={[
            {
              width: '100%',
              alignSelf: 'center',

            },
            styles.loginScreen,
          ]}
          behavior="padding"
        >
          {isLoading && <WindMillLoading />}
          <View style={[styles.loginForm, {opacity: isLoading ? 0 : 1}]}>
            <Text style={[styles.notice, {color: 'white', marginBottom: 10, opacity: error.length > 0 ? 0 : 1}]}>
              Login
            </Text>
            <Text style={[styles.notice, {color: 'red'}]}>
              {error.length > 0 && error}
              {error.length === 0 && touched.email && errors.email}
            </Text>
            <Text style={[styles.notice, {color: 'red'}]}>
              {error.length === 0 && touched.password && errors.password}
            </Text>
            <View style={{marginVertical: 20}}>
              <Input
                testID={'email'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Email"
                value={values.email}
                inputStyle={[
                  {fontSize: 16},
                  styles.input
                ]}
                placeholderTextColor="#999"
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Input
                  testID={'password'}
                  secureTextEntry={hidePassword}
                  onBlur={handleBlur('password')}
                  placeholder="Password"
                  inputStyle={[
                    styles.input,
                    {fontSize: 16}
                  ]}
                  placeholderTextColor="#999"
                  onChangeText={handleChange('password')}
                  value={values.password}
                  rightIcon={
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={setPasswordVisibility}
                    >
                      <Icon
                        size={25}
                        containerStyle={{
                          paddingHorizontal: 10,
                          opacity: hidePassword ? 0.5 : 1,
                        }}
                        name={hidePassword ? 'eye-slash' : 'eye'}
                        type="font-awesome"
                        color="black"
                      />
                    </TouchableOpacity>
                  }
                />
              </View>
            </View>
          </View>
          <View style={{marginVertical: 30}}>
            <TouchableOpacity
              style={[styles.loginBtn]}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  {paddingHorizontal: 20, paddingVertical: 10, color: 'white', fontSize: 20},

                ]}
              >
                Login
            </Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15
                }}
              >
                SignUp
            </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik >
  );
}

export default Login;

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