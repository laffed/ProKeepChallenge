import React from 'react'
import {View, StyleSheet, Image, StatusBar, Text} from 'react-native'
import {useOvermind} from '../overmind';

function Profile() {
  const GlobalState = useOvermind().state.User;

  return (
    <View style={styles.profileScreen}>
      <Text style={[styles.text]}>Welcome to Prokeep</Text>
      <Text style={styles.text}>
        {`${GlobalState.email} is Logged`}
      </Text>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  profileScreen: {
    backgroundColor: '#2B7990',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  text: {
    fontSize: 30,
    fontFamily: 'Barlow',
    margin: 10,
    color: 'white'
  }
});