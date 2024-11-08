// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../src/api'; // Importe o arquivo de configuração do Axios

export default function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        Keyboard.dismiss();
        try {
            const response = await api.post('/login', { username, password });
            const { tipoUsuario } = response.data;

            // Navegação com base no tipo de usuário retornado
            if (tipoUsuario === 'admin') {
                navigation.navigate('Usuarios');
            } else if (tipoUsuario === 'psychologist') {
                navigation.navigate('Psychologist');
            } else if (tipoUsuario === 'patient') {
                navigation.navigate('Patient');
            } else {
                alert('Tipo de usuário desconhecido.');
            }
        } catch (error) {
            alert('Erro ao fazer login. Verifique suas credenciais.');
            console.error('Erro no login:', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
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
                {/* Adicione outros botões conforme necessário */}
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
