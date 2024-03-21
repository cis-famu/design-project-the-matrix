import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AdminAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');

  const postAnnouncement = async () => {
    if (!announcement.trim()) {
      Alert.alert('Please enter an announcement');
      return;
    }

    try {
      await firestore().collection('Announcements').add({
        text: announcement,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Announcement posted successfully');
      setAnnouncement(''); // Clear the input after posting
    } catch (error) {
      console.log(error);
      Alert.alert('Error posting announcement');
    }
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
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    minHeight: 100, // Adjust based on your needs
    textAlignVertical: 'top', // Align text to top for multiline input
  },
});

export default AdminAnnouncement;
