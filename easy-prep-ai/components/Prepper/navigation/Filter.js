import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from '@react-native-community/checkbox';

const Filter = () => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState([
    { label: 'Vegan', selected: false },
    { label: 'Vegetarian', selected: false },
    { label: 'Gluten-free', selected: false },
    { label: 'Dairy-free', selected: false },
    { label: 'Paleo', selected: false },
  ]);

  const handleDietaryRestrictionPress = (index) => {
    const updatedRestrictions = [...dietaryRestrictions];
    updatedRestrictions[index].selected = !updatedRestrictions[index].selected;
    setDietaryRestrictions(updatedRestrictions);
  };

  return (
    <View>
      <Text>Filter by dietary restrictions:</Text>
      {dietaryRestrictions.map((restriction, index) => (
        <TouchableOpacity key={index}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              style={{ marginRight: 10 }}
              checked={restriction.selected}
              onPress={() => handleDietaryRestrictionPress(index)}
            />
            <Text>{restriction.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Filter;