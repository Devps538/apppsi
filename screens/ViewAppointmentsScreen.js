import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ViewAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Aqui você pode buscar os dados das consultas marcadas do seu backend
    const fetchAppointments = async () => {
      // Substitua por sua lógica de busca de dados
      const data = [
        { id: '1', patientName: 'João', date: '01/06/2024', time: '14:00', status: 'marcada' },
        { id: '2', patientName: 'Maria', date: '02/06/2024', time: '15:00', status: 'cancelada' },
        { id: '3', patientName: 'Carlos', date: '03/06/2024', time: '16:00', status: 'chegou' },
        // Adicione mais pacientes conforme necessário
      ];
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const renderItem = ({ item }) => {
    let statusColor;
    if (item.status === 'marcada') {
      statusColor = 'green';
    } else if (item.status === 'cancelada') {
      statusColor = 'red';
    } else if (item.status === 'chegou') {
      statusColor = 'gray';
    }

    return (
      <View style={[styles.appointmentItem, { backgroundColor: statusColor }]}>
        <Text style={styles.appointmentText}>Paciente: {item.patientName}</Text>
        <Text style={styles.appointmentText}>Data: {item.date}</Text>
        <Text style={styles.appointmentText}>Hora: {item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign: 'center' }]}>Consultas Marcadas</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
    marginTop: 30,
  },
  appointmentItem: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
  },
  appointmentText: {
    fontSize: 16,
  },
});
