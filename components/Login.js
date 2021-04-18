import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';


function Login({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="auto"/>
      <Text>Home Screen</Text>
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
}

export default Login;
