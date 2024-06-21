import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Função fictícia para determinar o tipo de usuário
const getUserType = (username) => {
  // Adicione a lógica para determinar o tipo de usuário (psicólogo ou paciente)
  // Aqui estamos assumindo que usernames com "psicologo" são psicólogos
  return username.includes('psicologo') ? 'psychologist' : 'patient';
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Keyboard.dismiss();
    // Lógica de autenticação aqui (pode ser uma chamada de API para verificar as credenciais)
    // Para simplificação, estamos redirecionando diretamente com base no tipo de usuário
    const userType = getUserType(username);
    if (username && password) {
      if (userType === 'psychologist') {
        navigation.navigate('Psychologist');
      } else {
        navigation.navigate('Patient');
      }
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Text style={styles.buttonText}>Esqueci a senha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: '#000',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 0,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
