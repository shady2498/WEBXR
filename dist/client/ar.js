import { Mesh, MeshPhongMaterial, HemisphereLight, PerspectiveCamera, TextureLoader, Scene, SphereGeometry, WebGLRenderer } from "/build/three.module.js";
import { ARButton } from '/jsm/webxr/ARbutton';
// Scene
const canvas = document.getElementById("canvas");
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new Scene();
// Renderer
const renderer = new WebGLRenderer({
    //smooths the edges -- not make it look like edgy -- less pixalated
    antialias: true,
    canvas: canvas,
});
const texture = new TextureLoader().load("assets/images/globe/earthmap4k.jpg");
const bumpMap = new TextureLoader().load("assets/images/globe/earthbump4k.jpg");
const material = new MeshPhongMaterial({
    specular: 0x222222,
    shininess: 25,
    bumpMap: bumpMap,
    bumpScale: 10,
    map: texture,
});
// Geometry radius, width segment, height segment
//this sets up the object that we want to show or see
const geometry = new SphereGeometry(0.5, 14, 14).translate(0, 0.1, 0);
// const material = new MeshBasicMaterial( {
//   color: 0xffff00 * Math.random(),
//   //make it look like its made of wires
//   wireframe: true
// } )
const earth = new Mesh(geometry, material);
init();
animate();
function init() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] }));
    const light = new HemisphereLight(0xffffff, 0xbbbbfff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);
    window.addEventListener("resize", onWindowResize, false);
    earth.position.z = -2;
    scene.add(earth);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
function animate() {
    //requestAnimationFrame(animate);
    renderer.setAnimationLoop(animate);
    earth.rotation.y += 0.02;
    earth.rotation.x += 0.02;
    render();
}
function render() {
    renderer.render(scene, camera);
}
