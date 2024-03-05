import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';

const AnnouncementPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Announcement</Text>
      </View>
      <View style={styles.post}>
        <Image
          source={require('../images/prepper.png')} 
          style={styles.image}
        />
        <Text style={styles.caption}>
          Top meals of the day 
        </Text>
      </View>
      {/* Add more announcements as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  post: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  caption: {
    fontSize: 16,
  },
});

export default AnnouncementPage;
