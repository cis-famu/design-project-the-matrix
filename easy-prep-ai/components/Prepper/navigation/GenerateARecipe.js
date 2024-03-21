import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform,Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { Button, Input, ListItem,} from 'react-native-elements';
import axios from 'axios';
import {Configuration, OpenAIApi} from 'openai'; 


const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [imageURL, setImageURL] = useState('');



  const sendMessage = async () => {
    setMessages(prevMessages => [...prevMessages, { message, sender: 'user' }]);
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ${process.env.REACT_APP_OPENAI_API_KEY}'
      },
      body: JSON.stringify({
        messages: [{"role": "user", "content": message}],
        model: "gpt-3.5-turbo",
      })
    });
    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const reply = data.choices[0].message.content;
      setMessages(prevMessages => [...prevMessages, { message: reply, sender: 'ai' }]);
      fetchImage(message); // Call fetchImage here with the original message
    }
  };

  const fetchImage = async (prompt) => {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":'Bearer ${process.env.REACT_APP_OPENAI_API_KEY}' 
      },
      body: JSON.stringify({
        "prompt": prompt,
        "n": 1,
        "model": "dalle-2", 
        "size":"360x360"
      })
    });
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      setImageURL(data.data[0].url); // Update the state with the fetched image URL
    }
  };

  const saveToFirebase = async (aiReply) => {
    try {
      const db = firebase.firestore();
      await db.collection('Recipe').add({
        userMessage: message,
        aiReply,
        ...userData, // Spread user data here
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log('Data saved to Firestore successfully!');
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };
  
  const deleteText = (itemID)=>{
    TextInput(()=>addInput.filter(todo=>todo.id !=itemID))   
 }
  

  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust the offset on iOS
    >
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps='handled' // Important for tapping buttons when keyboard is open
      >
        {messages.map((msg, i) => (
          <View key={i} style={msg.sender === 'user' ? styles.userMessage : styles.partnerMessage}>
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        ))}
        {imageURL && <Image source={{ uri: imageURL }} style={styles.image} />}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
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
