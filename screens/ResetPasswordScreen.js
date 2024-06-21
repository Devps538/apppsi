import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importe o Ionicons

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendLink = () => {
    // Aqui você pode adicionar a lógica para enviar o link de alteração de senha para o email do usuário
    // Por exemplo, fazer uma chamada de API para enviar o email
    setMessage(`Link de alteração de senha enviado para ${email}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendLink}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
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
    width: 100, // ajuste conforme necessário
    height: 100, // ajuste conforme necessário
    marginBottom: 32,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: '#000',
  },
  sendButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
