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

type NavProp = StackNavigationProp<AuthStackParamList, 'Login'>;


function Login({navigation}: {navigation: NavProp}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localLoggedIn, setLocalLoggedIn] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const GlobalState = useOvermind().state.User;
  const GlobalActions = useOvermind().actions.User;

  const setPasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const onLogin = ({email, password}: {email: string, password: string}) => {
    console.log(email)
  }

  const checkUserLogin = () => {
    AsyncStorage.getItem('isLoggedIn')
      .then(isLoggedIn => {
        if (isLoggedIn === 'true') {
          AsyncStorage.getItem('email')
            .then(email => {GlobalActions.setUserSession(JSON.parse(email))});
        }
      });
  }


  useFocusEffect(
    React.useCallback(() => {
      checkUserLogin();
    }, [localLoggedIn])
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
          <View style={styles.loginForm}>
            <Image
              style={{
                alignSelf: 'center',
                // width: 250,
                // height: 90,
                // marginVertical: 10,
              }}
              source={{uri: 'https://uploads-ssl.webflow.com/5e8630fc4ab55c2dd2699e05/5e86337294f87c645a70134a_prokeep-lockup-reversed.svg'}}
            />
            <Text style={[styles.notice, {color: 'white'}]}>
              {!errors.email && !errors.password && 'Login to the Greatest App in the World!'}
            </Text>
            <Text style={[styles.notice, {color: 'red'}]}>
              {touched.email && errors.email}
            </Text>
            <Text style={[styles.notice, {color: 'red'}]}>
              {touched.password && errors.password}
            </Text>

            <View style={{marginVertical: 20}}>
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Email"
                value={values.email}
                inputStyle={[
                  {fontSize: 16}
                ]}
                placeholderTextColor="#999"
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Input
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
              onPress={() => handleSubmit}
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
    fontSize: 18,
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
    paddingVertical: 10,
  },
});