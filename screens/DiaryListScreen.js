import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const initialDiaries = [
  { id: '1', patientName: 'Juliana', date: '17/05/2024', viewed: true },
  { id: '2', patientName: 'Patrick', date: '17/05/2024', viewed: true },
  // Adicione mais diários conforme necessário
];

export default function DiaryListScreen() {
  const navigation = useNavigation();
  const [diaries, setDiaries] = useState(initialDiaries);
  const [filter, setFilter] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [filteredDiaries, setFilteredDiaries] = useState(diaries);

  const toggleFilter = () => {
    setShowTextInput(!showTextInput);
    if (filter.trim().length === 0) {
      setFilteredDiaries(diaries);
      return;
    }
    const filtered = diaries.filter(diary =>
      diary.patientName.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredDiaries(filtered);
  };

  const handlePress = (id) => {
    const diary = diaries.find(d => d.id === id);
    if (diary) {
      navigation.navigate('DiaryView', { diary });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, item.viewed && styles.viewedItem]}
      onPress={() => handlePress(item.id)}
    >
      <Text>ID: {item.id}</Text>
      <Text>Nome do Paciente: {item.patientName}</Text>
      <Text>Data: {item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          {showTextInput && (
            <TextInput
              placeholder="Filtrar por nome"
              style={styles.input}
              value={filter}
              onChangeText={setFilter}
            />
          )}
        </View>
        <Image
          source={{ uri: 'https://example.com/profile-pic.png' }}
          style={styles.profilePic}
        />
      </View>
      <View style={styles.diaryListContainer}>
        <FlatList
          data={filter.trim().length === 0 ? diaries : filteredDiaries}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  filterButton: {
    marginRight: 20,
    marginLeft: 200,
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  diaryListContainer: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  viewedItem: {
    backgroundColor: '#d4edda',
  },
});
