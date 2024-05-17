import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Switch } from 'react-native';

export default function CadastroScreen({ navigation }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [crp, setCrp] = useState(''); // CRP is the field for Psychologists

  const handleRegister = () => {
    if (isPsychologist && crp) {
      navigation.navigate('Psychologist');
    } else {
      alert('Cadastro realizado!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
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
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          value={birthdate}
          onChangeText={setBirthdate}
        />
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
        />
        <View style={styles.switchContainer}>
          <Text>Psicólogo</Text>
          <Switch
            value={isPsychologist}
            onValueChange={setIsPsychologist}
          />
        </View>
        {isPsychologist && (
          <TextInput
            style={styles.input}
            placeholder="CRP"
            value={crp}
            onChangeText={setCrp}
          />
        )}
        <View style={styles.switchContainer}>
          <Text>Paciente</Text>
          <Switch
            value={isPatient}
            onValueChange={setIsPatient}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleRegister} />
      </View>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
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
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
