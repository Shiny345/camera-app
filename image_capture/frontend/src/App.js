// frontend/src/App.js

import React, { useState } from 'react';
import './App.css';
import CameraCapture from './components/Cameracapture';
import PhotoList from './components/PhotoList';

function App() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  return (
    <div className="app-container">
      <header>
        <h1>Photo Capture App</h1>
      </header>
      <main>
        <section>
          <button onClick={() => setCameraOpen(!cameraOpen)}>
            {cameraOpen ? 'Close Camera' : 'Open Camera'}
          </button>
          {cameraOpen && <CameraCapture />}
        </section>
        <section>
          <button onClick={() => setShowPhotos(!showPhotos)}>
            {showPhotos ? 'Hide Photos' : 'Show Photos'}
          </button>
          {showPhotos && <PhotoList />}
        </section>
      </main>
    </div>
  );
}

export default App;
