import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadStory } from '../api/stories';

export default function UploadScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaType, setMediaType] = useState('text');

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUrl(result.uri);
      setMediaType(result.type === 'video' ? 'video' : 'image');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!title || !content) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      const storyData = {
        title,
        content,
        mediaType,
        mediaUrl,
      };

      await uploadStory(storyData);
      Alert.alert('Success', 'Your story has been uploaded!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload story');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Share your story..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.mediaButton} onPress={pickMedia}>
        <Text style={styles.buttonText}>Add Media</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Share Story</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  contentInput: {
    height: 200,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  mediaButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
}); 