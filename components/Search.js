import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function Search({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style="auto"/>
        <Text>Details Screen</Text>
        <Button
          title="Go back to Login screen"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  export default Search;
