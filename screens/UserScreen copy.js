import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Modal, Button } from 'react-native';

const initialUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', type: 'patient' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', type: 'psychologist' },
];

export default function UserScreen() {
  const [users, setUsers] = useState(initialUsers);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', type: '' });

  const handleAddUser = () => {
    setUsers((prev) => [...prev, { id: Date.now().toString(), ...newUser }]);
    setNewUser({ name: '', email: '', type: '' });
    setModalVisible(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser(user);
    setModalVisible(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleUpdateUser = () => {
    setUsers((prev) =>
      prev.map((user) => (user.id === selectedUser.id ? newUser : user))
    );
    setSelectedUser(null);
    setNewUser({ name: '', email: '', type: '' });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.type}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEditUser(item)} style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Usuário</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Nome"
            value={newUser.name}
            onChangeText={(text) => setNewUser({ ...newUser, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={newUser.email}
            onChangeText={(text) => setNewUser({ ...newUser, email: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Tipo (patient/psychologist)"
            value={newUser.type}
            onChangeText={(text) => setNewUser({ ...newUser, type: text })}
            style={styles.input}
          />
          <Button title={selectedUser ? 'Atualizar' : 'Adicionar'} onPress={selectedUser ? handleUpdateUser : handleAddUser} />
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 4,
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
