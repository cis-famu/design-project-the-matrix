import React, { useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation} from '@react-navigation/native';

const FloatingButton = ({ onPress }) => {
    const navigation = useNavigation();
    const animation = useRef(new Animated.Value(0)).current;
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        const toValue = open ? 0 : 1;

        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: true, // Correct property name
        }).start();
        setOpen(!open);
    };

    // Rotation
    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"], // Adjusted to 45 degrees for a clear visual effect
                }),
            },
        ],
    };

    const getAnimationStyle = (index) => {
        const angle = (index * (120 / 2) + 75);
        const radius = 90;

        const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -radius * Math.sin((angle * Math.PI) / 180)],
        });

        const translateX = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, radius * Math.cos((angle * Math.PI) / 180)],
        });

        return {
            position: 'absolute', // Ensure absolute positioning
            transform: [{ scale: animation }, { translateX }, { translateY }],
        };
    };

    return (
        <View style={{ position: 'absolute', right: 20, bottom: 20 }}>
          {
            open &&
            [...Array(3)].map((_, index) => (
                <Animated.View key={index} style={[styles.button, styles.second, getAnimationStyle(index)]}>
                {index === 0 && (
                  <>
                    <TouchableOpacity onPress>
                        <Icon name="user" size={24} color="#FFF" />
                    </TouchableOpacity>
                  </>
                )}
                {index === 1 && (
                  <>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateRecipe')}>
                        <Icon name="pencil" size={24} color="#FFF" />
                    </TouchableOpacity>
                  </>
                )}
                {index === 2 && (
                  <>
                    <TouchableOpacity onPress>
                        <Icon name="camera" size={24} color="#FFF" />
                    </TouchableOpacity>
                  </>
                )}
              </Animated.View>
            ))
          }
          <TouchableOpacity onPress={toggleMenu}>
            <Animated.View style={[styles.button, styles.menu, rotation]}>
              <Icon name="plus" size={24} color="white" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      );
};

const styles = StyleSheet.create({
    button: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28, // Half of width/height to ensure circular shape
        elevation: 4,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    menu: {
        backgroundColor: '#53B175',
    },
    second: {
        backgroundColor: '#53B175',
    },
});

export default FloatingButton;
