import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function DiaryViewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { diary } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.patientInfo}>
          <Text style={styles.infoText}>ID do Paciente: {diary.patientId}</Text>
          <Text style={styles.infoText}>Nome do Paciente: {diary.patientName}</Text>
          <Text style={styles.infoText}>Data: {diary.date}</Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={styles.commentLabel}>Comentário:</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Digite seu comentário aqui"
            multiline
            numberOfLines={5}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 40,
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientInfo: {
    marginBottom: 200,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentContainer: {
    marginBottom: 20,
    marginTop: 20,
    width: '80%',
  },
  commentLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
