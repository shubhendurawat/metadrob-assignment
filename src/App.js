// App.js
import React, { useState, useCallback } from 'react';
import CanvasComponent from './components/CanvasComponent';

const App = () => {
  const [scene, setScene] = useState(null);
  const [objects, setObjects] = useState({
    box: { visible: true, speed: 0.01 },
    torus: { visible: true, speed: 0.01 },
    dodecahedron: { visible: true, speed: 0.01 },
  });

  const handleSceneReady = useCallback((scene, meshes) => {
    setScene(scene);
  }, []);

  const toggleVisibility = (objectKey) => {
    if (scene) {
      setObjects((prevObjects) => ({
        ...prevObjects,
        [objectKey]: { ...prevObjects[objectKey], visible: !prevObjects[objectKey].visible },
      }));
    }
  };

  const updateSpeed = (objectKey, speed) => {
    if (speed >= 0 && scene) {
      setObjects((prevObjects) => ({
        ...prevObjects,
        [objectKey]: { ...prevObjects[objectKey], speed },
      }));
    }
  };

  const handleSpeedChange = (objectKey, value) => {
    const speed = Math.max(0, parseFloat(value));
    updateSpeed(objectKey, speed);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mb-3">
      <h1 className="text-3xl font-bold mb-4">Metadrob Assignment </h1>
      <h2 className="text-3xl font-bold mb-4">Rotation/Visibility Controls </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {Object.keys(objects).map((key) => (
          <div key={key} className="p-4 border border-gray-300 rounded-lg shadow-md">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-2"
              onClick={() => toggleVisibility(key)}
            >
              Toggle {key}
            </button>
            <label htmlFor={`speed-${key}`} className="block mb-1">Rotation Speed:</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="0.1"
                step="0.01"
                id={`speed-${key}`}
                value={objects[key].speed}
                onChange={(e) => handleSpeedChange(key, e.target.value)}
                className="w-40 h-8 bg-gray-200 rounded-lg overflow-hidden appearance-none focus:outline-none"
              />
              <input
                type="number"
                id={`speed-value-${key}`}
                value={objects[key].speed}
                onChange={(e) => handleSpeedChange(key, e.target.value)}
                className="w-20 h-8 bg-gray-200 rounded-lg px-2 appearance-none focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
      <br />
      <CanvasComponent onSceneReady={handleSceneReady} objects={objects} />
    </div>
  );
};

export default App;
