import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import PsychologistScreen from './screens/PsychologistScreen';
import DiaryListScreen from './screens/DiaryListScreen';
import PatientScreen from './screens/PatientScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ViewDiaryScreen from './screens/ViewDiaryScreen';
import SendNotificationScreen from './screens/SendNotificationScreen';
import ConfirmAppointmentScreen from './screens/ConfirmAppointmentScreen';
import ViewAppointmentsScreen from './screens/ViewAppointmentsScreen';
import ChatScreen from './screens/ChatScreen';
import UserScreen from './screens/UserScreen';

// Função para criar uma confirmação antes de sair
function handleLogout(navigation) {
  Alert.alert(
    'Sair',
    'Tem certeza que deseja sair?',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => navigation.navigate('Login') },
    ],
    { cancelable: true }
  );
}

const Drawer = createDrawerNavigator();

// Drawer único para todas as telas
function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Início"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#f5f5f5' },
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen name="Início" component={HomeScreen} />
      <Drawer.Screen name="Consultas" component={ViewAppointmentsScreen} />
      <Drawer.Screen name="Lista de Diário" component={DiaryListScreen} />
      <Drawer.Screen name="Usuários" component={UserScreen} />
      <Drawer.Screen name="Confirmar Consulta" component={ConfirmAppointmentScreen} />
      <Drawer.Screen
        name="Sair"
        component={LoginScreen}
        options={{
          title: 'Sair',
          drawerItemStyle: { backgroundColor: '#f8d7da' },
          drawerIcon: () => <Feather name="log-out" size={20} color="red" />,
          listeners: {
            drawerItemPress: (e) => {
              e.preventDefault();
              handleLogout(e.navigation);
            },
          },
        }}
      />
    </Drawer.Navigator>
  );
}

// Aplicação principal
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Psychologist" component={AppDrawer} />
        <Stack.Screen name="Patient" component={AppDrawer} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="DiaryView" component={ViewDiaryScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});
