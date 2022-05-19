import * as THREE from "https://unpkg.com/three@0.120.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.120.0/examples/jsm/controls/OrbitControls";

let container, scene, camera, renderer, card, controls;

var CardFrontURL = 'CardFront.jpg'; // Assign this from Product object
var CardBackURL = 'CardBack.jpg'; // Assign this from Product object

function init(){
    container = document.getElementById("world");

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.update();
    container.appendChild(renderer.domElement);

    //create shape
    const geometry = new THREE.BoxGeometry(2, 3, 0);
    const loader = new THREE.TextureLoader();
    const cardMaterials = [
        , //Left
        , //Right
        , //Top
        , //Bottom
        new THREE.MeshBasicMaterial({ map: loader.load(CardFrontURL), side:THREE.doubleSide }), // Front
        new THREE.MeshBasicMaterial({ map: loader.load(CardBackURL), side:THREE.doubleSide }), // Back
    ];

    //create material, color, or image texture
    card = new THREE.Mesh(geometry, cardMaterials);
    scene.add(card);

    camera.position.z = 5;
}

function animate(){
    requestAnimationFrame(animate);
    // card.rotation.x += 0.01;
    card.rotation.y += 0.001;
    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();