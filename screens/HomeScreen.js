import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DataTable, TextInput, Modal, Portal, IconButton, Button } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://172.16.6.220:3000'; // Use o IP da sua máquina

const HomeScreen = () => {
  const [visible, setVisible] = React.useState({
    addUser: false,
    editUser: false,
    deleteUser: false
  });
  const [currentUser, setCurrentUser] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [newUser, setNewUser] = React.useState({ 
    nome: '', 
    senha: '', 
    cpf: '', 
    email: '', 
    dataNascimento: '', 
    sexo: '', 
    tipoUsuario: 'paciente' // Valor padrão
  });

  const fetchUsers = async () => {
    try {
      console.log('Fetching users from:', `${API_URL}/usuarios`);
      const response = await axios.get(`${API_URL}/usuarios`);
      console.log('Users fetched:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.message);
    }
  };

  const addUser = async () => {
    try {
      await axios.post(`${API_URL}/usuarios`, newUser);
      setNewUser({ nome: '', senha: '', cpf: '', email: '', dataNascimento: '', sexo: '', tipoUsuario: 'paciente' });
      hideModal('addUser');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error.message);
    }
  };

  const updateUser = async () => {
    if (currentUser?.id) {
      try {
        await axios.put(`${API_URL}/usuario/atualizar/${currentUser.id}`, currentUser);
        setCurrentUser(null);
        hideModal('editUser');
        fetchUsers();
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
      }
    }
  };

  const deleteUser = async () => {
    if (currentUser?.id) {
      try {
        await axios.delete(`${API_URL}/usuario/deletar/${currentUser.id}`);
        setCurrentUser(null);
        hideModal('deleteUser');
        fetchUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário:', error.message);
      }
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const showModal = (type) => {
    setVisible({ ...visible, [type]: true });
  };

  const hideModal = (type) => {
    setVisible({ ...visible, [type]: false });
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <IconButton icon="plus" size={24} onPress={() => showModal('addUser')} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Nome</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Ações</DataTable.Title>
          </DataTable.Header>
          {users.length > 0 ? (
            users.map(user => (
              <DataTable.Row key={user.id}>
                <DataTable.Cell>{user.nome}</DataTable.Cell>
                <DataTable.Cell>{user.email}</DataTable.Cell>
                <DataTable.Cell>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => {
                      setCurrentUser(user);
                      showModal('editUser');
                    }}
                  />
                  <IconButton icon="delete" size={20} onPress={() => {
                    setCurrentUser(user);
                    showModal('deleteUser');
                  }} />
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <DataTable.Row>
              <DataTable.Cell>Nenhum usuário encontrado</DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>

        {/* Modais */}
        <Portal>
          <Modal visible={visible.addUser} onDismiss={() => hideModal('addUser')} contentContainerStyle={styles.modal}>
            <TextInput
              label="Nome"
              mode="outlined"
              value={newUser.nome}
              onChangeText={text => setNewUser(prev => ({ ...prev, nome: text }))}
            />
            <TextInput
              label="E-mail"
              mode="outlined"
              value={newUser.email}
              onChangeText={text => setNewUser(prev => ({ ...prev, email: text }))}
            />
            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry
              value={newUser.senha}
              onChangeText={text => setNewUser(prev => ({ ...prev, senha: text }))}
            />
            <TextInput
              label="CPF"
              mode="outlined"
              value={newUser.cpf}
              onChangeText={text => setNewUser(prev => ({ ...prev, cpf: text }))}
              maxLength={11} // Limita a 11 caracteres
            />
            <TextInput
              label="Data de Nascimento"
              mode="outlined"
              value={newUser.dataNascimento}
              onChangeText={text => setNewUser(prev => ({ ...prev, dataNascimento: text }))}
              placeholder="YYYY-MM-DD" // Formato da data
            />
            <TextInput
              label="Sexo"
              mode="outlined"
              value={newUser.sexo}
              onChangeText={text => setNewUser(prev => ({ ...prev, sexo: text }))}
              placeholder="masculino, feminino ou outro"
            />
            <Button mode="contained" onPress={addUser}>Adicionar</Button>
            <IconButton icon="cancel" size={24} onPress={() => hideModal('addUser')} />
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.editUser} onDismiss={() => hideModal('editUser')} contentContainerStyle={styles.modal}>
            <TextInput
              label="Nome"
              mode="outlined"
              value={currentUser?.nome || ''}
              onChangeText={text => setCurrentUser(prev => prev ? { ...prev, nome: text } : null)}
            />
            <TextInput
              label="E-mail"
              mode="outlined"
              value={currentUser?.email || ''}
              onChangeText={text => setCurrentUser(prev => prev ? { ...prev, email: text } : null)}
            />
            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry
              value={currentUser?.senha || ''}
              onChangeText={text => setCurrentUser(prev => prev ? { ...prev, senha: text } : null)}
            />
            <TextInput
              label="CPF"
              mode="outlined"
              value={currentUser?.cpf || ''}
              onChangeText={text => setCurrentUser(prev => prev ? { ...prev, cpf: text } : null)}
              maxLength={11} // Limita a 11 caracteres
            />
            <TextInput
              label="Data de Nascimento"
              mode="outlined"
              value={currentUser?.dataNascimento || ''}
              onChangeText={text => setCurrentUser(prev => prev ? { ...prev, dataNascimento: text } : null)}
              placeholder="YYYY-MM-DD" // Formato da data
            />
            <TextInput
              label="Sexo"
              mode="outlined"
              value={currentUser?.sexo || ''}
              onChangeText={text => setCurrentUser(prev => prev ? { ...prev, sexo: text } : null)}
              placeholder="masculino, feminino ou outro"
            />
            <Button mode="contained" onPress={updateUser}>Salvar</Button>
            <IconButton icon="cancel" size={24} onPress={() => hideModal('editUser')} />
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.deleteUser} onDismiss={() => hideModal('deleteUser')} contentContainerStyle={styles.modal}>
            <TextInput label="Nome" mode="outlined" value={currentUser?.nome || ''} disabled />
            <Button mode="contained" onPress={deleteUser}>Deletar</Button>
            <IconButton icon="cancel" size={24} onPress={() => hideModal('deleteUser')} />
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
});

export default HomeScreen;
