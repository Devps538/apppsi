import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Switch, Image, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CadastroScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [dobText, setDobText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [crp, setCrp] = useState('');

  const handleRegister = () => {
    Keyboard.dismiss();
    if (isPsychologist && crp) {
      navigation.navigate('Psychologist');
    } else {
      navigation.navigate('Patient');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
    setDobText(format(currentDate, 'dd/MM/yyyy', { locale: ptBR }));
  };

  const handleDobTextChange = (text) => {
    setDobText(text);
    const [day, month, year] = text.split('/').map(Number);
    if (day && month && year) {
      const date = new Date(year, month - 1, day);
      if (!isNaN(date)) {
        setDob(date);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          value={dobText}
          onChangeText={handleDobTextChange}
          onFocus={() => setShowDatePicker(true)}
          keyboardType="numeric"
        />
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleDateChange}
            locale="pt-BR"
            maximumDate={new Date()}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        <View style={styles.switchContainer}>
          <Text>Psicólogo</Text>
          <Switch
            value={isPsychologist}
            onValueChange={(value) => setIsPsychologist(value)}
          />
        </View>
        {isPsychologist && (
          <TextInput
            style={styles.input}
            placeholder="CRP"
            value={crp}
            onChangeText={setCrp}
            keyboardType="numeric"
          />
        )}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Cadastrar</Text>
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
    color: '#000',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 1,
  },
  registerButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
