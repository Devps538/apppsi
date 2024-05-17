import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

export default function PsychologistScreen() {
  const navigation = useNavigation();
  const [mentions, setMentions] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    setDate(currentDate);
  }, []);

  const handleSend = () => {
    alert('Menção enviada');
  };

  const handleDelete = () => {
    setMentions('');
    alert('Menção deletada');
  };

  const handleOpenChat = () => {
    alert('Abrindo chat');
  };

  const handleOpenMenu = () => {
    alert('Abrindo menu');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={handleOpenMenu}>
        <Text style={styles.menuText}>Menu</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image
        />
      </View>
      <TextInput
        style={styles.mentionsInput}
        placeholder="Menções"
        value={mentions}
        onChangeText={setMentions}
        maxLength={700}
        multiline
      />
      <Text style={styles.dateText}>{`Data: ${date}`}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Enviar" onPress={handleSend} />
        <Button title="Deletar" onPress={handleDelete} />
        <Button title="Abrir Chat" onPress={handleOpenChat} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  menuButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#0066cc',
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
  },
  mentionsInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
