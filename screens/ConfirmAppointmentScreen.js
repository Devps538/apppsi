import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configurar o calendário para português do Brasil
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function ConfirmAppointmentScreen() {
  const consultationDate = '2024-06-20'; // Substitua pela data da consulta marcada
  const [selectedDate, setSelectedDate] = useState(consultationDate);
  const [confirmed, setConfirmed] = useState(false);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleConfirm = () => {
    setConfirmed(true);
    Alert.alert('Consulta confirmada', `Sua consulta para ${formatDate(selectedDate)} foi confirmada.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirmar Consulta</Text>
      <Calendar
        markedDates={{
          [consultationDate]: {
            selected: true,
            marked: true,
            selectedColor: 'blue',
            disabled: true,
          },
        }}
        style={styles.calendar}
        disabledByDefault={true}
      />
      <Text style={styles.selectedDate}>Data da consulta: {formatDate(selectedDate)}</Text>
      <TouchableOpacity 
        style={styles.confirmButton} 
        onPress={handleConfirm} 
        disabled={confirmed}
      >
        <Text style={styles.confirmButtonText}>
          {confirmed ? 'Consulta Confirmada' : 'Confirmar Data'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 20,
  },
  selectedDate: {
    fontSize: 18,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
