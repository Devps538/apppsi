import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
      <Text style={styles.welcome}>Seja bem-vindo!</Text>
      <Text style={styles.appName}>apppsi</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
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
  logo: {
    width: 100, // ajuste conforme necessário
    height: 100, // ajuste conforme necessário
    marginBottom: 32,
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
  button: {
    backgroundColor: '#000', // fundo preto
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // texto branco
    fontSize: 18,
  },
});
