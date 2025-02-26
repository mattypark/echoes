import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  RefreshControl 
} from 'react-native';
import StoryCard from '../components/StoryCard';
import { fetchStories } from '../api/stories';

export default function HomeScreen() {
  const [stories, setStories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadStories = async (pageNum = 1) => {
    try {
      const newStories = await fetchStories(pageNum);
      if (pageNum === 1) {
        setStories(newStories);
      } else {
        setStories([...stories, ...newStories]);
      }
    } catch (error) {
      console.error('Error loading stories:', error);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStories(1);
    setRefreshing(false);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    loadStories(page + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        renderItem={({ item }) => <StoryCard story={item} />}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 