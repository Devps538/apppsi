import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Seja bem-vindo!</Text>
      <Text style={styles.appName}>apppsi</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Cadastre-se" onPress={() => navigation.navigate('Cadastro')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  welcome: {
    fontSize: 24,
    marginBottom: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
