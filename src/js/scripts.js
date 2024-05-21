// Importing all modules from 'three' library
import * as THREE from 'three';
// Importing OrbitControls from 'three' library which allows camera to orbit around a target
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import sky from '../img/sky.jpg';
import rock from '../img/rock.jpg';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const islandURL = new URL('../assets/floating-islands.glb', import.meta.url);
const airplaneURL = new URL('../assets/Airplane.glb', import.meta.url);

// Low poly floating islands by vanAchen [CC-BY] via Poly Pizza
// Airplane by Poly by Google [CC-BY] via Poly Pizza

// Creating a WebGL renderer
const renderer = new THREE.WebGLRenderer();
// adding shadows
renderer.shadowMap.enabled = true;
// Setting the size of the renderer to the window size
renderer.setSize( window.innerWidth, window.innerHeight );
// Appending the renderer to the body of the document
document.body.appendChild( renderer.domElement );

// Creating a new scene
const scene = new THREE.Scene();
// Creating a perspective camera with a field of view of 75, aspect ratio based on window size, and near and far clipping plane
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );

// Creating orbit controls for the camera
const orbit = new OrbitControls(camera, renderer.domElement);

// // Creating an axes helper with size 5 and adding it to the scene
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

// Setting the camera position
camera.position.set(-10,5,150);
// Updating the orbit controls
orbit.update();

// Creating a box geometry
const geometry = new THREE.OctahedronGeometry();
// Creating a basic material for the box with color grgit seen
const diamondMaterial = new THREE.MeshPhongMaterial( { 
    color: 0xadd8e6,
    transparent: true,
    opacity: 0.5,
    shininess: 100,
    specular: 0xffffff

} );
// Creating a mesh with the box geometry and material
const diamond = new THREE.Mesh( geometry, diamondMaterial );

// Scaling the diamond to make it bigger and skinnier
diamond.scale.set(2, 4, 2);
// Adding the box to the scene
scene.add( diamond );
// const planeGeometry = new THREE.PlaneGeometry( 30, 30 );
// const planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
// const plane = new THREE.Mesh( planeGeometry, planeMaterial );
// scene.add( plane );
// plane.rotation.x = - Math.PI / 2;
// plane.receiveShadow = true;

// const gridHelper = new THREE.GridHelper( 30, 30 );
// scene.add( gridHelper );

// const sphereGeometry = new THREE.SphereGeometry(2,4,4);
// const sphereMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF, wireframe: false});
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// scene.add(sphere);
// sphere.position.set(-10, 10,0);
// sphere.castShadow = true;

const sphereGeometry = new THREE.SphereGeometry(2, 4, 4);

// Load the texture
const textureLoader = new THREE.TextureLoader();
const rockTexture = textureLoader.load(rock); // Replace with your texture path

// Apply the texture to the material
const sphereMaterial = new THREE.MeshPhongMaterial({ map: rockTexture, wireframe: false });

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

// Create another sphere
const sphereGeometry2 = new THREE.SphereGeometry(2,4,4);
const sphereMaterial2 = new THREE.MeshPhongMaterial({color: 0xFFFF00, wireframe: false});
const sphere3 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
scene.add(sphere3);
sphere3.position.set(-10, 10,0);
sphere3.castShadow = true;

// adding skybox
let skyboxArray = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('../assets/Daylight Box_Right.bmp'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('../assets/Daylight Box_Left.bmp'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('../assets/Daylight Box_Top.bmp'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('../assets/Daylight Box_Bottom.bmp'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('../assets/Daylight Box_Front.bmp'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('../assets/Daylight Box_Back.bmp'), side: THREE.BackSide })
];

// Disable depth write for all materials to prevent z-fighting with other objects
skyboxArray.forEach(material => {
    material.depthWrite = false;
});

let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
let skybox = new THREE.Mesh(skyboxGeo, skyboxArray);
scene.add(skybox);


// // Create a target object and position it in the scene
// const targetGeometry = new THREE.SphereGeometry();
// const targetMaterial = new THREE.MeshStandardMaterial({color: 0xFF0000});
// const target = new THREE.Mesh(targetGeometry, targetMaterial);

// target.position.set(0, 0, 0);
// scene.add(target);


// adding an ambient light
const ambientLight = new THREE.AmbientLight(0xFFFFFF,2.0);
scene.add(ambientLight);

// adding a directional light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
scene.add(directionalLight);
directionalLight.position.set(0,10,10);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

//adding a point light
const pl = new THREE.PointLight(0xffffff, 1, 8, 2);
pl.castShadow = true; // Enable shadows for this light
pl.position.set(2, 2, 2); // Position the light above the scene
const plHelper = new THREE.PointLightHelper(pl, 0.5);
scene.add(pl, plHelper);
// const pl = new THREE.PointLight(0xffffff, 1, 100, 2); // Increased distance
// pl.position.set(0, 45, -5);
// const plHelper = new THREE.PointLightHelper(pl, 0.5);
// scene.add(pl, plHelper);


//scene.background = textureLoader.load(sky);


// Load the GLTF model
const assetLoader = new GLTFLoader();
assetLoader.load(islandURL.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    // Adjust the size of the model
    model.scale.set(0.1, 0.1, 0.1); // Adjust as needed

    // Adjust the position of the model
    model.position.set(40, 0, -20); // Adjust as needed

    model.traverse((object) => {
        console.log(object.name);
    });
}, undefined, function(error) {
    console.error(error);
});

// load the plane model 
// Load the GLTF model
let plane; 
assetLoader.load(airplaneURL.href, function(gltf) {
    plane = gltf.scene;
    scene.add(plane);
    // Adjust the size of the model
    plane.scale.set(0.08, 0.08, 0.08); // Adjust as needed

    // Adjust the position of the model
    plane.position.set(70, 20, 50); // Adjust as needed

}, undefined, function(error) {
    console.error(error);
});

const gui = new dat.GUI();
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01

}
gui.add(options, 'wireframe').onChange(() => {
    sphereMaterial.wireframe = options.wireframe;
});

gui.addColor(options, 'sphereColor').onChange(() => {
    sphereMaterial.color.set(options.sphereColor);
});

gui.add(options,'speed',0,0.1);

// // Rendering the scene with the camera
renderer.render( scene, camera );


let step = 0;

// Function to animate the box
function animate(time) {
    // Rotating the box in x and y direction based on time
    diamond.rotation.y = time / 1000;
    // Rendering the scene with the camera
    step += options.speed;
    // sphere.position.y = 10* Math.abs(Math.sin(step)) + 13;

    // making an orbit
    const radius = 80;
    sphere.position.x = radius * Math.cos(step);
    sphere.position.z = radius * Math.sin(step);

    const radius2 = 70;
    sphere3.position.x = radius2 * Math.cos(step);
    sphere3.position.z = radius2 * -Math.sin(step); // Note the negative sign

    if (plane) {
        const radius = 100;
        plane.position.x = radius * Math.cos(time / 2000);
        plane.position.z = radius * Math.sin(time / 2000);
        


    }


    renderer.render( scene, camera );
}

// Setting the animation loop to the animate function
renderer.setAnimationLoop( animate );

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});