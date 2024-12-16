import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function FilmDetail({ route }) {
  const { url } = route.params;
  const [filmDetail, setFilmDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmDetail = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setFilmDetail(data);
      } catch (error) {
        console.error("Error fetching film detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetail();
  }, [url]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Loading details...</Text>
      </View>
    );
  }

  if (!filmDetail || !filmDetail.result) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>No details available.</Text>
      </View>
    );
  }

  const properties = filmDetail.result.properties;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{properties.title}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Episode:</Text>
        <Text style={styles.value}>{properties.episode_id}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Director:</Text>
        <Text style={styles.value}>{properties.director}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Producer:</Text>
        <Text style={styles.value}>{properties.producer}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Release Date:</Text>
        <Text style={styles.value}>{properties.release_date}</Text>
      </View>

      <Text style={styles.subTitle}>Opening Crawl</Text>
      <Text style={styles.value}>{properties.opening_crawl}</Text>

      <Text style={styles.subTitle}>Characters</Text>
      {properties.characters && properties.characters.length > 0 ? (
        properties.characters.map((charUrl, idx) => (
          <Text key={idx} style={styles.listItem}>
            {charUrl}
          </Text>
        ))
      ) : (
        <Text style={styles.value}>No characters listed.</Text>
      )}

      <Text style={styles.subTitle}>Planets</Text>
      {properties.planets && properties.planets.length > 0 ? (
        properties.planets.map((planetUrl, idx) => (
          <Text key={idx} style={styles.listItem}>
            {planetUrl}
          </Text>
        ))
      ) : (
        <Text style={styles.value}>No planets listed.</Text>
      )}

      {/* Similarly, you can list starships, species, and vehicles */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "midnightblue",
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginTop: 30,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    color: "lightblue",
    fontWeight: "600",
    width: 150,
    fontSize: 18,
  },
  value: {
    color: "white",
    fontSize: 18,
    flexShrink: 1,
  },
  listItem: {
    color: "white",
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 5,
  },
});
