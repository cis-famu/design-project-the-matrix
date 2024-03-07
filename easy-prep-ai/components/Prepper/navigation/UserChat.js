import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, Pressable } from 'react-native';
import { useNavigation} from '@react-navigation/native';

const Messaging = ({ route }) => {
  const navigation = useNavigation();
  const { name, id } = route.params || {};
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const addMessage = () => {
    setChatMessages(prevChatMessages => [
      ...prevChatMessages,
      {
        id: Date.now(),
        text: newMessage,
        createdAt: new Date(),
        senderId: '123',
      },
    ]);
    setNewMessage('');
  };

  return (
    <View>
      {name && <Text>{name}</Text>}
      <FlatList
        data={chatMessages}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type a message"
      />
      <Pressable onPress={addMessage}>
        <Text>Send</Text>
      </Pressable>
    </View>
  );
};

export default Messaging;