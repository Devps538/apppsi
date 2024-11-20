import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DataTable, TextInput, Modal, Portal, IconButton, Button } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://192.168.1.4:3000'; // Apenas a base URL

const GerencimentoUsuario = () => {
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
    tipoUsuario: 'paciente'
  });

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`, { timeout: 10000 });
      setUsers(response.data); // Atualiza o estado com os usuários
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      alert('Não foi possível carregar os usuários');
    }
  };

  // Função para adicionar um novo usuário
  const addUser = async () => {
    if (!newUser.nome || !newUser.email || !newUser.senha) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await axios.post(`${API_URL}/usuarios`, newUser);
      setNewUser({
        nome: '',
        senha: '',
        cpf: '',
        email: '',
        dataNascimento: '',
        sexo: '',
        tipoUsuario: 'paciente'
      });
      hideModal('addUser');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      alert('Não foi possível adicionar o usuário');
    }
  };

  // Função para atualizar um usuário
  const updateUser = async () => {
    if (currentUser?.id) {
      try {
        await axios.put(`${API_URL}/usuarios/${currentUser.id}`, currentUser);
        setCurrentUser(null);
        hideModal('editUser');
        fetchUsers();
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        alert('Não foi possível atualizar o usuário');
      }
    }
  };

  // Função para deletar um usuário
  const deleteUser = async () => {
    if (currentUser?.id) {
      try {
        await axios.delete(`${API_URL}/usuarios/${currentUser.id}`);
        setCurrentUser(null);
        hideModal('deleteUser');
        fetchUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert('Não foi possível excluir o usuário');
      }
    }
  };

  // Carrega os usuários quando o componente for montado
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const showModal = (type) => {
    setVisible({ ...visible, [type]: true });
  };

  const hideModal = (type) => {
    setVisible({ ...visible, [type]: false });
    if (type === 'editUser' || type === 'deleteUser') {
      setCurrentUser(null); // Resetando o usuário ao fechar o modal de edição ou exclusão
    }
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
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => {
                      setCurrentUser(user);
                      showModal('deleteUser');
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <DataTable.Row>
              <DataTable.Cell colSpan={3}>Nenhum usuário encontrado</DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>

        {/* Modal para Adicionar Usuário */}
        <Portal>
          <Modal visible={visible.addUser} onDismiss={() => hideModal('addUser')} contentContainerStyle={styles.modal}>
            <TextInput
              label="Nome"
              mode="outlined"
              value={newUser.nome}
              onChangeText={text => setNewUser(prev => ({ ...prev, nome: text }))}
            />
            <TextInput
              label="Email"
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
            <Button onPress={addUser}>Adicionar</Button>
            <Button onPress={() => hideModal('addUser')}>Cancelar</Button>
          </Modal>
        </Portal>

        {/* Modal para Editar Usuário */}
        <Portal>
          <Modal visible={visible.editUser} onDismiss={() => hideModal('editUser')} contentContainerStyle={styles.modal}>
            <TextInput
              label="Nome"
              mode="outlined"
              value={currentUser?.nome || ''}
              onChangeText={text => setCurrentUser(prev => ({ ...prev, nome: text }))}
            />
            <TextInput
              label="Email"
              mode="outlined"
              value={currentUser?.email || ''}
              onChangeText={text => setCurrentUser(prev => ({ ...prev, email: text }))}
            />
            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry
              value={currentUser?.senha || ''}
              onChangeText={text => setCurrentUser(prev => ({ ...prev, senha: text }))}
            />
            <Button onPress={updateUser}>Salvar</Button>
            <Button onPress={() => hideModal('editUser')}>Cancelar</Button>
          </Modal>
        </Portal>

        {/* Modal para Deletar Usuário */}
        <Portal>
          <Modal visible={visible.deleteUser} onDismiss={() => hideModal('deleteUser')} contentContainerStyle={styles.modal}>
            <Button onPress={deleteUser}>Excluir</Button>
            <Button onPress={() => hideModal('deleteUser')}>Cancelar</Button>
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});

export default GerencimentoUsuario;
