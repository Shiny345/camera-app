// frontend/src/components/CameraCapture.js

import axios from 'axios';
import React, { useRef } from 'react';

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    canvasRef.current.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'photo.png');

      try {
        await axios.post('http://localhost:5000/api/photos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Photo uploaded successfully');
      } catch (err) {
        console.error('Error uploading photo:', err);
      }
    });
  };

  return (
    <div>
      <video ref={videoRef} width="400" height="300" autoPlay></video>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={takePhoto}>Take Photo</button>
      <canvas ref={canvasRef} width="400" height="300" style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default CameraCapture;
