import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

export default function StoryCard({ story }) {
  const renderMedia = () => {
    if (!story.mediaUrl) return null;

    if (story.mediaType === 'video') {
      return (
        <Video
          source={{ uri: story.mediaUrl }}
          style={styles.media}
          useNativeControls
          resizeMode="contain"
        />
      );
    }

    return (
      <Image
        source={{ uri: story.mediaUrl }}
        style={styles.media}
        resizeMode="cover"
      />
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.author}>By {story.author?.name || 'Anonymous'}</Text>
      </View>
      
      {renderMedia()}
      
      <Text style={styles.content}>{story.content}</Text>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton}>
          <Text>❤️ {story.likes?.length || 0}</Text>
        </TouchableOpacity>
        <Text style={styles.date}>
          {new Date(story.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  media: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  likeButton: {
    padding: 5,
  },
  date: {
    color: '#666',
  },
}); 