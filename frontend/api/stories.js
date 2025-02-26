const API_URL = 'http://192.168.1.XXX:3000/api';

export const fetchStories = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_URL}/stories?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};

export const uploadStory = async (storyData) => {
  try {
    const response = await fetch(`${API_URL}/stories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyData),
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error uploading story:', error);
    throw error;
  }
}; 