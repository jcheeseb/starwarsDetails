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

function AnimatedPlanetItem({ item, index, onSwipeLeft }) {
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
      <Animated.View style={[styles.planetContainer, animatedStyle]}>
        <Text style={styles.planetName}>{item.name}</Text>
        <Text style={styles.planetDetails}>Population: {item.population}</Text>
        <Text style={styles.planetDetails}>Climate: {item.climate}</Text>
      </Animated.View>
    </Swipeable>
  );
}

export default function Planets({ navigation }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(inputText.toLowerCase())
  );

  const handleSwipeLeft = (item) => {
    const planetUrl = item.url;
    navigation.navigate('PlanetDetail', { url: planetUrl });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./premium_photo-1717563132740-6903bac2cf85.jpeg')}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Planets"
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
          data={filteredPlanets}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <AnimatedPlanetItem
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
    backgroundColor: 'darkblue',
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
  planetContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'navy',
    borderRadius: 8,
  },
  planetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  planetDetails: {
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
