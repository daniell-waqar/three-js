const canvas = document.querySelector('#canvas-container');

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a simple cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position camera
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Start animation
animate();
