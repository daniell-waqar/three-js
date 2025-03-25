import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


const scene = new THREE.Scene();

const group = new THREE.Group();

const texture = new THREE.TextureLoader()

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 32);


const material = new THREE.MeshStandardMaterial({ color: 0xffffff });


const textureTest = texture.load('/whispy-grass-meadow-unity/wispy-grass-meadow_albedo.png')
material.map = textureTest

textureTest.repeat.set(2, 2)
textureTest.wrapS = THREE.RepeatWrapping
textureTest.wrapT = THREE.RepeatWrapping

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 2;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -2;
plane.rotation.x = -(Math.PI / 2);

plane.scale.set(100 , 100)

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.y = 2;

const cylinder = new THREE.Mesh(cylinderGeometry, material);
cylinder.position.y = -2;

group.add(mesh);
group.add(mesh2);
group.add(plane);
group.add(sphere);
group.add(cylinder);

scene.add(group);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(3, 3, 2);
scene.add(pointLight);


// initialize the camera
const camera = new THREE.PerspectiveCamera(
75,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});



// render the scene
const renderloop = () => {
    // group.children.forEach(child => {
    //     if (child instanceof THREE.Mesh) {
    //         child.rotation.y += 0.01;
    //     }
    //   });
    window.requestAnimationFrame(renderloop);

  controls.update();
  renderer.render(scene, camera);
};

renderloop();