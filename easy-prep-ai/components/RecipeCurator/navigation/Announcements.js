import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

const AdminAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const postAnnouncement = () => {
    if (!announcement.trim()) {
      Alert.alert('Please enter an announcement');
      return;
    }

    setAnnouncements(prevAnnouncements => [
      ...prevAnnouncements,
      { id: Math.random().toString(), text: announcement },
    ]);
    setAnnouncement(''); // Clear the input after posting
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={announcement}
        onChangeText={setAnnouncement}
        placeholder="Enter your announcement here..."
        multiline
      />
      <Button title="Post Announcement" onPress={postAnnouncement} />
      {announcements.map(item => (
        <View key={item.id} style={styles.announcementContainer}>
          <Text style={styles.announcementText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  announcementContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  announcementText: {
    fontSize: 16,
  },
});

export default AdminAnnouncement;

