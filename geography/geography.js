import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
window.THREE = THREE;
window.scene = new THREE.Scene();
window.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 2, 1000);
camera.position.setZ(5);
//scene.background = new THREE.Color(0xcbcbcb)
window.renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
const pointLight = new THREE.DirectionalLight(0xffffff, 0.8);
pointLight.position.set(10, 10, 10);
pointLight.shadow.mapSize.width = 512; // default
pointLight.shadow.mapSize.height = 512; // default
pointLight.shadow.camera.near = 0.5; // default
pointLight.shadow.camera.far = 500;
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/gltf/'); // use a full url path
loader.setDRACOLoader(dracoLoader);

window.loadAllGLTFAssets = async()=>{
    window.globe = await loadAsset("./gltf/globe.gltf");
    globe.scale.set(0.5, 0.5, 0.5)
    globe.position.z = -12;
    globe.position.y = -0.4;
    globe.position.x = 3;
    globe.rotation.y = THREE.MathUtils.degToRad(-10);
    scene.add(globe);

    console.log("Finsihed loading!");
}



async function loadAsset(gltfUrl) {
    return new Promise((resolve) => {
        loader.load(gltfUrl, gltf => resolve(gltf.scene));
    });
}






function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();