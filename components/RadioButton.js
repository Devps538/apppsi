// components/RadioButton.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ selected, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
      <View style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </View>
      <Text style={styles.radioButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export const RadioGroup = ({ options, selectedOption, onSelect }) => {
  return (
    <View>
      {options.map((option) => (
        <RadioButton
          key={option.id}
          selected={selectedOption === option.id}
          onPress={() => onSelect(option.id)}
        >
          {option.label}
        </RadioButton>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonIcon: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioButtonText: {
    fontSize: 16,
  },
});

export default RadioButton;
