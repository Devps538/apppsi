import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuIcon({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
      <Feather name="menu" size={30} color="black" />
    </TouchableOpacity>
  );
}

function PsychologistScreenWithMenu({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MenuIcon navigation={navigation} />
      <PsychologistScreen />
    </View>
  );
}

function DiaryListScreenWithMenu({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MenuIcon navigation={navigation} />
      <DiaryListScreen />
    </View>
  );
}

function SendNotificationScreenWithMenu({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MenuIcon navigation={navigation} />
      <SendNotificationScreen />
    </View>
  );
}

function ConfirmAppointmentScreenWithMenu({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MenuIcon navigation={navigation} />
      <ConfirmAppointmentScreen />
    </View>
  );
}
function ViewAppointmentsScreenWithMenu({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MenuIcon navigation={navigation} />
      <ViewAppointmentsScreen />
    </View>
  );
}

function PatientScreenWithMenu({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MenuIcon navigation={navigation} />
      <PatientScreen />
    </View>
  );
}

function PsychologistDrawer() {
  return (
    <Drawer.Navigator initialRouteName="PsychologistHome" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Início" component={PsychologistScreenWithMenu} />
      <Drawer.Screen name="Lista de Diário" component={DiaryListScreenWithMenu} />
      <Drawer.Screen name="Consultas" component={ViewAppointmentsScreenWithMenu} />
      <Drawer.Screen name="Sair" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

function PatientDrawer() {
  return (
    <Drawer.Navigator initialRouteName="PatientHome" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Início" component={PatientScreenWithMenu} />
      <Drawer.Screen name="Confirmar Consulta" component={ConfirmAppointmentScreenWithMenu} />
      <Drawer.Screen name="Sair" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Psychologist" component={PsychologistDrawer} />
        <Stack.Screen name="DiaryList" component={DiaryListScreen} />
        <Stack.Screen name="Patient" component={PatientDrawer} />
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
