import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PlanetDetail({ route }) {
  const { url } = route.params;
  const [planetDetail, setPlanetDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanetDetail = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPlanetDetail(data);
      } catch (error) {
        console.error('Error fetching planet detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanetDetail();
  }, [url]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Loading details...</Text>
      </View>
    );
  }

  if (!planetDetail || !planetDetail.result) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>No details available.</Text>
      </View>
    );
  }

  const properties = planetDetail.result.properties;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{properties.name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Climate:</Text>
        <Text style={styles.value}>{properties.climate}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Population:</Text>
        <Text style={styles.value}>{properties.population}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Terrain:</Text>
        <Text style={styles.value}>{properties.terrain}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Diameter:</Text>
        <Text style={styles.value}>{properties.diameter}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Rotation Period:</Text>
        <Text style={styles.value}>{properties.rotation_period}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Orbital Period:</Text>
        <Text style={styles.value}>{properties.orbital_period}</Text>
      </View>

      {/* Add more fields as needed, SWAPI returns a number of details. */}
      
      <Text style={styles.subTitle}>Residents</Text>
      {properties.residents && properties.residents.length > 0 ? (
        properties.residents.map((resident, idx) => (
          <Text key={idx} style={styles.listItem}>{resident}</Text>
        ))
      ) : (
        <Text style={styles.value}>No known residents.</Text>
      )}

      <Text style={styles.subTitle}>Films</Text>
      {properties.films && properties.films.length > 0 ? (
        properties.films.map((film, idx) => (
          <Text key={idx} style={styles.listItem}>{film}</Text>
        ))
      ) : (
        <Text style={styles.value}>No films available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'midnightblue',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 30,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    color: 'lightblue',
    fontWeight: '600',
    width: 150,
    fontSize: 18,
  },
  value: {
    color: 'white',
    fontSize: 18,
    flexShrink: 1,
  },
  listItem: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 5,
  },
});
