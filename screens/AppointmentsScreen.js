import React from 'react';
import { StyleSheet, Text, View, Calendar } from 'react-native';

export default function AppointmentsScreen() {
  return (
    <View style={styles.container}>
      <Text>Calendário de Consultas</Text>
      {/* Implementação do calendário de consultas aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
