import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css'
// Create a scene
const scene = new THREE.Scene();


const aspectRatio = window.innerWidth / window.innerHeight;

// Create a camera

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio, 
//      1 * aspectRatio, 
//      1 * aspectRatio, 
//     -1 * aspectRatio,
//      0.1, 100);

const canvas = document.querySelector('#canvas');
// Create a renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
const cube = new THREE.Mesh(geometry, material);
// cube.position.y = -1;  // relative to group


// const cube1 = new THREE.Mesh(geometry, material);
// cube1.position.x = 2;

// const cube2 = new THREE.Mesh(geometry, material);
// cube2.position.x = -2;


// const group = new THREE.Group();
// group.add(cube,cube1, cube2);

// group.position.y = 2;
// group.scale.x = 2;
// group.scale.set(2, 2, 2);
scene.add(cube);

// cube.position.x = 1;
// cube.position.y = 1;
// scene.add(cube);

// cube.scale.x = 2;
// scene.add(cube)

// scene.scale.set(2, 2, 1);
// scene.add(cube);



// const axisHelper = new THREE.AxesHelper(2);
// scene.add(axisHelper);

// Set the camera position
camera.position.z = 5;

window.addEventListener('resize', () => {
     // Update the camera's aspect ratio
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix(); // Required after changing the aspect ratio
 
     // Update the renderer's size
     renderer.setSize(window.innerWidth, window.innerHeight);
});



// Initialize the Clock

const clock = new THREE.Clock();
let prevTime = 0;

const controls = new OrbitControls(camera, canvas);

// controls.autoRotate = true;
controls.enableDamping = true

function animate() {

    requestAnimationFrame(animate); // Call before updates

    // Time calculations
    let currentTime = clock.getElapsedTime();
    let delta = currentTime - prevTime;
    prevTime = currentTime;

    const amplitude = 2;  // Height of wave
    const frequency = 2;  // Speed of oscillation
    cube.scale.x =  Math.sin(currentTime) ;
    cube.position.y =  Math.sin(currentTime) ;

    // Update cube rotation using delta time
    cube.rotation.x += delta;
    cube.rotation.y += delta; // Additional rotation for effect

    // Update controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

animate();
