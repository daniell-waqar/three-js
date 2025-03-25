import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#canvas');

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1); // Simulate sunlight
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Camera position
camera.position.z = 5;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/textures/chair.jpg'); // Ensure the path is correct

// GLTF Loader
const loader = new GLTFLoader();
let model; // Declare the model variable

loader.load(
    '/models/arm_chair__furniture.glb', // Ensure the path is correct
    function (gltf) {
        model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Scale down if needed
    
        // Traverse the model and apply textures
        model.traverse((child) => {
            if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: texture,
                        metalness: 0.1,
                        roughness: 0.5,
                    });
                }
            }
        );

        scene.add(model); 
    },
);

// Texture settings
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(2, 2);

// Window resize event
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();