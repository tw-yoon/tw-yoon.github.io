// GLTF 3D Function
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

document.querySelectorAll(".gltf-viewer").forEach((container) => {
  let isHovered = false;
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const gltfFile = container.dataset.model;
  const scale = parseFloat(container.dataset.scale) || 35;
  const [camX, camY, camZ] = ['camx', 'camy', 'camz'].map((k) =>
    parseFloat(container.dataset[k]) || 0
  );

  camera.position.set(camX, camY, camZ);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.toneMappingExposure = 0.8;
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 10, 10).normalize();
  directionalLight.castShadow = true;
  directionalLight.shadow.bias = -0.001;
  scene.add(directionalLight);

  // Add enhanced backlight and point light for contrast
  const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
  backLight.position.set(-10, -10, -10);
  scene.add(backLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.3, 500);
  pointLight.position.set(0, 100, 100);
  scene.add(pointLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // HDR Environment Lighting
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  new RGBELoader()
    .setPath('hdr/')
    .load('studio_small_09_1k.hdr', function (hdrEquirect) {
      const envMap = pmremGenerator.fromEquirectangular(hdrEquirect).texture;
      scene.environment = envMap;
      scene.background = null;
      hdrEquirect.dispose();
      pmremGenerator.dispose();
    });

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  loader.setDRACOLoader(dracoLoader);
  let loadedObject = null;

  loader.load(
    gltfFile,
    (gltf) => {
      loadedObject = gltf.scene;
      loadedObject.scale.set(scale, scale, scale);
      const degToRad = (deg) => (deg * Math.PI) / 180;
      const [rotX, rotY, rotZ] = ['rotx', 'roty', 'rotz'].map((k) =>
        degToRad(parseFloat(container.dataset[k]) || 0)
      );
      loadedObject.rotation.set(rotX, rotY, rotZ);
      scene.add(loadedObject);

      const box = new THREE.Box3().setFromObject(loadedObject);
      const center = box.getCenter(new THREE.Vector3());

      controls.target.copy(center);
      camera.lookAt(center);
      controls.update();
    },
    undefined,
    (error) => {
      console.error("Error loading GLB:", error);
    }
  );

  container.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  container.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  function animate() {
    requestAnimationFrame(animate);
    if (loadedObject && isHovered) {
      loadedObject.rotation.y += 0.005;
    }
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    controls.update();
  });
});





// Time Function
function updateTime() {
  function updateTime() {
    const clockElement = document.getElementById('clock');
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    /*const milliseconds = now.getMilliseconds().toString().padStart(3, '0');*/

    clockElement.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    /*clockElement.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;*/
  }
  /*setInterval(updateTime, 10);*/
  setInterval(updateTime, 1000);

  updateTime();
}
updateTime();





// Open All Close All Function
document.addEventListener("DOMContentLoaded", () => {
  const openAllBtn = document.getElementById("open-all");
  const closeAllBtn = document.getElementById("close-all");
  const dropdowns = document.querySelectorAll(".dropdown");

  openAllBtn.addEventListener("click", () => {
    dropdowns.forEach(d => {
      d.classList.add("expanded");
      d.classList.remove("collapsed");
    });
  });

  closeAllBtn.addEventListener("click", () => {
    dropdowns.forEach(d => {
      d.classList.add("collapsed");
      d.classList.remove("expanded");
    });
  });
});





// Lightview Function
document.addEventListener('DOMContentLoaded', () => {
  const zoomables = document.querySelectorAll('.grid img, .grid-landscape img');
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.querySelector('.lightbox-close');

  function openLightbox(src, alt = '') {
    lbImg.src = src;
    lbImg.alt = alt;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent scroll behind
  }

  function closeLightbox() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  zoomables.forEach(img => {
    img.addEventListener('click', (e) => {
      // If the image sits inside a .grid with data-link, don’t navigate
      e.preventDefault();
      e.stopPropagation();
      openLightbox(img.src, img.alt || '');
    });
  });

  lbClose.addEventListener('click', closeLightbox);

  // Click outside the image closes
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  // Esc to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});