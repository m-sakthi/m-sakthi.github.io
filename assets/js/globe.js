import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  TextureLoader,
  ShaderMaterial,
  SphereGeometry,
  AdditiveBlending,
  BackSide,
  Group,
  BufferGeometry,
  PointsMaterial,
  Float32BufferAttribute,
  Points,
} from 'three';

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import earthImage from '/assets/images/earth-map.jpeg';
import earthImageNight from '/assets/images/earth-night.jpeg';

import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl';

const canvasContainer = document.getElementById('canvas-container');
const canvasWidth = Math.max(600, canvasContainer.offsetWidth);
const canvasHeight = Math.max(600, canvasContainer.offsetHeight);

const scene = new Scene();
const camera = new PerspectiveCamera(75, canvasWidth / canvasHeight, 1, 500);
const renderer = new WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas: document.querySelector('canvas')
});

renderer.setSize(canvasWidth, canvasHeight);
renderer.setPixelRatio(devicePixelRatio);
// container.appendChild(renderer.domElement);

// Create a movement along orbits
// new OrbitControls(camera, renderer.domElement)


const sphereSize = Math.min(Math.max(canvasWidth / 100, 3), 6.6);
const hourNow = (new Date()).getHours();
const isDayTime = hourNow < 6 && hourNow > 18;

// Create a sphere
const sphere = new Mesh(
  new SphereGeometry(sphereSize, 50, 50),
  // new MeshBasicMaterial({
  //   // color: 0xFF0000,
  //   map: new TextureLoader().load('/images/earth-map.jpeg')
  // })
  new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new TextureLoader().load(isDayTime ? earthImage : earthImageNight)
      }
    }
  })
);
// scene.add(sphere);
// END sphere

// Create a atmosphere
const atmosphere = new Mesh(
  new SphereGeometry(sphereSize, 50, 50),
  new ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: AdditiveBlending,
    side: BackSide
  })
);
atmosphere.scale.set(1.2, 1.2, 1.2);
// scene.add(atmosphere);
// END atmosphere

const group = new Group();
group.add(sphere);
group.add(atmosphere);
scene.add(group);

// Starts
function generateStarts(front = false) {
  const starGeometry = new BufferGeometry();
  const starMaterial = new PointsMaterial({
    color: 0xffffff,
  });

  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = Math.random() * 2000;
    starVertices.push(x, y, front ? z : -z);
  }

  starGeometry.setAttribute('position', new Float32BufferAttribute(starVertices, 3))

  return new Points(starGeometry, starMaterial);
}

const stars = generateStarts();
// const starsFront = generateStarts(true);

// scene.add(stars);
// scene.add(starsFront);

// END Starts



// Place a camera with light to make the object visible
camera.position.z = 15;

const mouse = {
  x: 0,
  y: 0
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sphere.rotation.y += 0.002;
  // group.rotation.y = mouse.x * 0.5;
  gsap.to(group.rotation, {
    x: -mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2
  });
}

animate();

addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
});
