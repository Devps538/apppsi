import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Picker } from 'emoji-mart-native';

export default function ChatScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length.toString(), text: message }]);
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.emojiButton} onPress={() => setShowEmojiPicker(true)}>
            <Text style={styles.emojiButtonText}>😊</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua mensagem..."
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Feather name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Modal
        visible={showEmojiPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEmojiPicker(false)}
      >
        <View style={styles.modalContainer}>
          <Picker onSelect={handleEmojiSelect} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowEmojiPicker(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 100, // Ajuste este valor para criar espaço para o botão de voltar
  },
  messagesList: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
  },
  emojiButton: {
    marginRight: 10,
  },
  emojiButtonText: {
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
