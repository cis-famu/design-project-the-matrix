import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Input, ListItem, Text, Image } from 'react-native-elements';
import axios from 'axios';
import {Configuration, OpenAIApi} from 'openai'; 




const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [imageURL, setImageURL] = useState('');

  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.messageContainer} inverted>
        {messages.map((msg, i) => (
          <View key={i} style={msg.sender === 'user' ? styles.userMessage : styles.partnerMessage}>
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        ))}
      </ScrollView>
      {imageURL && <Image source={{ uri: imageURL }} style={{ width: 200, height: 200 }} />}
      {recipe && <Text>{recipe}</Text>}
      <View style={styles.inputContainer}>
        <Input
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          containerStyle={styles.input}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    maxWidth: '70%',
  },
  partnerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatScreen;
