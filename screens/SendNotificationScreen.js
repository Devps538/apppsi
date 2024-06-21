import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SendNotificationScreen() {
  return (
    <View style={styles.container}>
      <Text>Enviar Notificação</Text>
      {/* Adicione aqui o formulário ou a funcionalidade para enviar notificações */}
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
