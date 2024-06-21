import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

export default function PatientScreen() {
  const navigation = useNavigation();
  const [diary, setDiary] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('pt-BR');
    setDate(currentDate);
  }, []);

  const handleSend = () => {
    Keyboard.dismiss();
    Alert.alert('Diário enviado');
  };

  const handleDelete = () => {
    setDiary('');
    Keyboard.dismiss();
    Alert.alert('Diário deletado');
  };

  const handleOpenChat = () => {
    Keyboard.dismiss();
    navigation.navigate('Chat'); // Navega para a tela de chat
  };

  const handleLogout = () => {
    Keyboard.dismiss();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
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

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão para acessar a câmera foi negada.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
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
        { text: 'Câmera', onPress: takePhoto },
        { text: 'Galeria', onPress: pickImage },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const handleEmojiSelect = () => {
    setShowEmojiPicker(true);
  };

  const handleEmojiPick = (emoji) => {
    setDiary(diary + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={selectPhoto}>
            <Image
              style={styles.profileImage}
              source={image ? { uri: image } : { uri: 'https://via.placeholder.com/100' }}
            />
            <Text style={styles.addPhotoText}>Adicionar Foto</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.diaryContainer}>
          <Text style={styles.dateText}>{`Data: ${date}`}</Text>
          <TextInput
            style={styles.diaryInput}
            placeholder="Diário"
            value={diary}
            onChangeText={setDiary}
            maxLength={700}
            multiline
          />
          {showEmojiPicker && (
            <View style={styles.emojiPickerContainer}>
              <TouchableOpacity onPress={() => handleEmojiPick('😊')}>
                <Text style={styles.emoji}>😊</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEmojiPick('😢')}>
                <Text style={styles.emoji}>😢</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEmojiPick('💀')}>
                <Text style={styles.emoji}>💀</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.emojiButton} onPress={handleEmojiSelect}>
            <Text style={styles.emojiButtonText}>😊</Text>
          </TouchableOpacity>
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
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 33,
    left: 20,
    zIndex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    marginTop: 5,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  diaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dateText: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    fontSize: 16,
  },
  diaryInput: {
    height: 300,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    textAlignVertical: 'top',
    borderRadius: 10,
  },
  emojiPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 12,
  },
  emojiButton: {
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
  emojiButtonText: {
    fontSize: 20,
  },
  emoji: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
