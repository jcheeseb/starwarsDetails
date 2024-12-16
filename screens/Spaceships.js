import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

function AnimatedSpaceshipItem({ item, index, onSwipeLeft }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, index]);

  const animatedStyle = {
    opacity: animatedValue,
    transform: [{
      translateY: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
      }),
    }],
  };

  const renderRightActions = () => (
    <View style={styles.rightAction}>
      <Text style={styles.actionText}>Details</Text>
    </View>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={() => onSwipeLeft(item)}
      rightThreshold={40}
    >
      <Animated.View style={[styles.shipContainer, animatedStyle]}>
        <Text style={styles.shipName}>{item.name}</Text>
        <Text style={styles.shipDetails}>Model: {item.model}</Text>
        <Text style={styles.shipDetails}>Manufacturer: {item.manufacturer}</Text>
      </Animated.View>
    </Swipeable>
  );
}

export default function Spaceships({ navigation }) {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchSpaceships = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/starships/');
        const data = await response.json();
        setSpaceships(data.results);
      } catch (error) {
        console.error('Error fetching spaceships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceships();
  }, []);

  const filteredSpaceships = spaceships.filter((ship) =>
    ship.name.toLowerCase().includes(inputText.toLowerCase())
  );

  const handleSwipeLeft = (item) => {
    navigation.navigate('SpaceshipDetail', { url: item.url });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: './360_F_272511766_sI572Qc9PrDowwVQKu8UXTxVk1aEdccM.jpg' }}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Spaceships"
          placeholderTextColor="gray"
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Search" onPress={() => {}} />
      </View>

      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredSpaceships}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <AnimatedSpaceshipItem
              item={item}
              index={index}
              onSwipeLeft={handleSwipeLeft}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkred',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    marginRight: 10,
  },
  shipContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  shipName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  shipDetails: {
    fontSize: 14,
    color: 'lightgray',
  },
  rightAction: {
    backgroundColor: 'darkorange',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
