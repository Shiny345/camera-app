// frontend/src/components/PhotoList.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/photos');
        setPhotos(response.data);
      } catch (err) {
        console.error('Error fetching photos:', err);
      }
    };

    fetchPhotos();
  }, []);

  const handleDelete = async (id, filename) => {
    try {
      await axios.delete(`http://localhost:5000/api/photos/${id}`);
      setPhotos(photos.filter(photo => photo._id !== id));
      alert('Photo deleted successfully');
    } catch (err) {
      console.error('Error deleting photo:', err);
    }
  };

  const handleDownload = (filename) => {
    window.location.href = `http://localhost:5000/api/photos/download/${filename}`;
  };

  return (
    <div>
      <h2>Captured Photos</h2>
      <div className="photo-list">
        {photos.length === 0 ? (
          <p>No photos available. Capture some photos to see them here.</p>
        ) : (
          photos.map((photo) => (
            <div key={photo._id} className="photo-item">
              <img src={`http://localhost:5000/${photo.filepath}`} alt="Captured" />
              <p>{new Date(photo.date).toLocaleString()}</p>
              <button onClick={() => handleDownload(photo.filename)}>Download</button>
              <button onClick={() => handleDelete(photo._id, photo.filename)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PhotoList;
