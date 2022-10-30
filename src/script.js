import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DoubleSide, PointLight } from "three";
import * as dat from 'dat.gui';

/**
 * GUI
 */
const gui=new dat.GUI();

/**
 * Textures
 */

const textureloader = new THREE.TextureLoader();

const lavaColorTexture = textureloader.load(
  "/textures/Lava/Lava_001_COLOR.png"
);
const lavaNormalTexture = textureloader.load("/textures/Lava/Lava_001_NRM.png");
const lavaHeightTexture = textureloader.load(
  "/textures/Lava/Lava_001_DISP.png"
);
const lavaAmbientOcclusionTexture = textureloader.load(
  "/textures/Lava/Lava_001_OCC.png"
);
const lavaReflectionTexture = textureloader.load(
  "/textures/Lava/Lava_001_SPEC.png"
);

const rockColorTexture = textureloader.load(
  "/textures/Rock/Dried_Soil_001_COLOR.jpg"
);
const rockNormalTexture = textureloader.load(
  "/textures/Rock/Dried_Soil_001_NRM.jpg"
);
const rockHeightTexture = textureloader.load(
  "/textures/Rock/Dried_Soil_001_DISP.png"
);
const rockAmbientOcclusionTexture = textureloader.load(
  "/textures/Rock/Dried_Soil_001_OCC.jpg"
);
const rockReflectionTexture = textureloader.load(
  "/textures/Rock/Dried_Soil_001_SPEC.jpg"
);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const material = new THREE.MeshStandardMaterial();
material.map = rockColorTexture;
material.displacementMap = rockHeightTexture;
material.displacementScale = 0.45;
material.normalMap = rockNormalTexture;
material.aoMap = rockAmbientOcclusionTexture;


addEventListener('mousemove',(event)=>{
material.displacementScale=0.45+event.clientY*0.0003
})


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("blue", 0.5);
const pointLight = new THREE.PointLight("cyan",0.5);
const pointLight2=new THREE.PointLight('purple',1.5);
// gui.add(pointLight2.position,'x').min(-5).max(10).step(0.001).name('pointLight2X');
// gui.add(pointLight2.position,'y').min(-5).max(10).step(0.001).name('pointLight2Y');
// gui.add(pointLight2.position,'z').min(-5).max(10).step(0.001).name('pointLight2Z');
pointLight.position.set(2, 3, 4);
pointLight2.position.set(-1.7,2.4,1.4);
scene.add(pointLight,pointLight2);
scene.add(ambientLight);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 100, 100), material);
plane.rotation.x=-Math.PI*0.5;
plane.position.set(0.915,0.188,-0.4);

gui.add(plane.position,'y').min(-5).max(10).step(0.001);
gui.add(plane.position,'x').min(-5).max(10).step(0.001);
gui.add(plane.position,'z').min(-5).max(10).step(0.001);


scene.add(plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 2;
camera.position.y = 1;

scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //update objects
  // sphere.rotation.y = 0.1 * elapsedTime;
  // plane.rotation.y = 0.1 * elapsedTime;
  // torus.rotation.y = 0.1 * elapsedTime;

  // sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.z= 0.2 * elapsedTime;
  // torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  // controls.update();

  // camera.lookAt(plane.position)

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
