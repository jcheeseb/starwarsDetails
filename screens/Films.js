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

function AnimatedFilmItem({ item, index, onSwipeLeft }) {
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
      <Animated.View style={[styles.filmContainer, animatedStyle]}>
        <Text style={styles.filmTitle}>{item.title}</Text>
        <Text style={styles.filmDetails}>Episode: {item.episode_id}</Text>
        <Text style={styles.filmDetails}>Release Date: {item.release_date}</Text>
      </Animated.View>
    </Swipeable>
  );
}

export default function Films({ navigation }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
        setFilms(data.results);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(inputText.toLowerCase())
  );

  const handleSwipeLeft = (item) => {
    navigation.navigate('FilmDetail', { url: item.url });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'movie-slate-film-reel-wood-clapper-wooden-backgorund-36502412.jpg.webp' }}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Films"
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
          data={filteredFilms}
          keyExtractor={(item) => item.episode_id.toString()}
          renderItem={({ item, index }) => (
            <AnimatedFilmItem
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
    backgroundColor: 'black',
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
  filmContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'darkgray',
    borderRadius: 8,
  },
  filmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  filmDetails: {
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
