import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function PsychologistScreen() {
  const navigation = useNavigation();
  const [mention, setMention] = useState('');
  const [image, setImage] = useState(null);

  const handleSend = () => {
    Keyboard.dismiss();
    Alert.alert('Menção enviada');
    // Lógica para enviar a menção
  };

  const handleDelete = () => {
    Keyboard.dismiss();
    Alert.alert('Menção deletada');
    // Lógica para deletar a menção
  };

  const handleOpenChat = () => {
    Keyboard.dismiss();
    navigation.navigate('Chat'); // Navega para a tela de chat
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão para acessar a galeria foi negada.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const selectPhoto = () => {
    Alert.alert(
      'Adicionar Foto',
      'Escolha uma opção',
      [
        { text: 'Galeria', onPress: pickImage },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.profileContainer} onPress={selectPhoto}>
          <Image
            style={styles.profileImage}
            source={image ? { uri: image } : { uri: 'https://via.placeholder.com/100' }}
          />
          <Text style={styles.addPhotoText}>Adicionar Foto</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Menções</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.dateText}>Data: {new Date().toLocaleDateString()}</Text>
          <TextInput
            style={styles.input}
            placeholder="Escreva sua menção aqui"
            value={mention}
            onChangeText={setMention}
            maxLength={700}
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleOpenChat}>
            <Text style={styles.buttonText}>Abrir Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginTop: 40,
  },
  addPhotoText: {
    marginTop: 5,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff', // Texto branco
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
