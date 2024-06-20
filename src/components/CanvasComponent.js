// CanvasComponent.js
import React, { useRef, useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';

const CanvasComponent = ({ onSceneReady, objects }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    const createMeshes = () => {
      const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
      const torus = BABYLON.MeshBuilder.CreateTorus("torus", { diameter: 3, thickness: 1 }, scene);

      // Create a dodecahedron using a different approach
      const dodecahedron = BABYLON.Mesh.CreatePolyhedron("dodecahedron", { type: 1, size: 2 }, scene);

      box.position.x = -5;
      torus.position.x = -1;
      dodecahedron.position.x = 5;

      return { box, torus, dodecahedron };
    };

    const { box, torus, dodecahedron } = createMeshes();

    onSceneReady(scene, { box, torus, dodecahedron });

    const updateMeshVisibility = () => {
      box.isVisible = objects.box.visible;
      torus.isVisible = objects.torus.visible;
      dodecahedron.isVisible = objects.dodecahedron.visible;
    };

    updateMeshVisibility();

    engine.runRenderLoop(() => {
      // Update rotation based on dynamic speed from props
      box.rotation.y += objects.box.speed;
      torus.rotation.y += objects.torus.speed;
      dodecahedron.rotation.y += objects.dodecahedron.speed;

      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [onSceneReady, objects]);

  return <canvas ref={canvasRef} style={{ width: '100vw', height: '75vh' }} />;
};

export default CanvasComponent;
