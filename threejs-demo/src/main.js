import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './style.css';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);  //simulate sunlight
light.position.set(5, 5, 5)
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Camera position
camera.position.z = 5;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('lamp/textures/wood_floor_worn_diff_4k.jpg'); // Replace with your texture path

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(2, 2);

let model; // Declare model globally

const loader = new GLTFLoader();
loader.load(
    'lamp/model/lantern_lamppost_lam.glb', // Replace with your model path
    function (gltf) {
        model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Scale down if needed
        model.rotation.set(0, Math.PI / 4, 0); // Rotation
        model.position.set(0, -1.5, 0); // Adjust position if needed
        

        // Traverse the model and apply textures
       model.traverse((child) => {
    if (child.isMesh) {

      if (child.material.name.toLowerCase().includes('wood')) {
        child.material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.1,
            roughness: 0.5,
        });
      }
    
    }
});

      scene.add(model); // Add the model to the scene
    },

);

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}
animate();