import React from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Input, ListItem, Text } from 'react-native-elements';

const ChatScreen = () => {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const sendMessage = () => {
    setMessages([...messages, { message, sender: 'user' }]);
    setMessage('');
  };

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
    marginBottom: 20, // Add marginBottom to ensure space between messages and input
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
