import React from 'react';
import { API_URL } from '@env';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const ArticleGrid = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.mainArticle}>
        <Image source={{ uri: `${API_URL}/api/article/image/${articles[0].id}` }} style={styles.mainImage} />
        <View style={styles.textOverlay}>
          <Text style={styles.mainTitle}>{articles[0].title}</Text>
        </View>
      </View>

      <FlatList
        data={articles.slice(1)}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.article}>
            <Image source={{ uri: `${API_URL}/api/article/image/${item.id}` }} style={styles.articleImage} />
            <View style={styles.textOverlaySmall}>
              <Text style={styles.articleText}>{item.title}</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>Cargar Más</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: '65%',
  },
  mainArticle: {
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(248, 245, 248, 0.5)',
    padding: 10,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    color: '#000',
  },
  row: {
    justifyContent: 'space-between',
    gap: 15,
  },
  article: {
    width: '48%',
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  articleImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  textOverlaySmall: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(248, 245, 248, 0.5)',
    padding: 5,
  },
  articleText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  loadMoreButton: {
    marginTop: 60,
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ArticleGrid;
