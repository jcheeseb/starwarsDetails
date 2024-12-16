import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SpaceshipDetail({ route }) {
  const { url } = route.params;
  const [shipDetail, setShipDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipDetail = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setShipDetail(data);
      } catch (error) {
        console.error('Error fetching spaceship detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipDetail();
  }, [url]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Loading details...</Text>
      </View>
    );
  }

  if (!shipDetail || !shipDetail.result) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>No details available.</Text>
      </View>
    );
  }

  const properties = shipDetail.result.properties;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{properties.name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Model:</Text>
        <Text style={styles.value}>{properties.model}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Manufacturer:</Text>
        <Text style={styles.value}>{properties.manufacturer}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cost (credits):</Text>
        <Text style={styles.value}>{properties.cost_in_credits}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Length:</Text>
        <Text style={styles.value}>{properties.length}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Crew:</Text>
        <Text style={styles.value}>{properties.crew}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Passengers:</Text>
        <Text style={styles.value}>{properties.passengers}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Hyperdrive Rating:</Text>
        <Text style={styles.value}>{properties.hyperdrive_rating}</Text>
      </View>

      
      <Text style={styles.subTitle}>Films</Text>
      {properties.films && properties.films.length > 0 ? (
        properties.films.map((filmUrl, idx) => (
          <Text key={idx} style={styles.listItem}>{filmUrl}</Text>
        ))
      ) : (
        <Text style={styles.value}>No films listed.</Text>
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
