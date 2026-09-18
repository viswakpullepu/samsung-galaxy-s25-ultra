import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { PhoneColor, ViewMode } from '../types';
import { sounds } from '../utils/sound';
import { Eye, Layers, PenTool, Cpu, RotateCcw, Smartphone, Sparkles, Move3d } from 'lucide-react';

interface Phone3DCanvasProps {
  color: PhoneColor;
  viewMode: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  interactive?: boolean;
}

export const Phone3DCanvas: React.FC<Phone3DCanvasProps> = ({
  color,
  viewMode,
  onViewModeChange,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activePreset, setActivePreset] = useState<ViewMode>(viewMode);

  // References to keep across renders
  const stateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    phoneGroup: null as THREE.Group | null,
    titaniumMaterials: [] as THREE.MeshStandardMaterial[],
    backGlassMaterial: null as THREE.MeshStandardMaterial | null,
    cameraLensesGroup: null as THREE.Group | null,
    cameraParts: [] as { mesh: THREE.Object3D; baseZ: number; explodeZ: number }[],
    spenGroup: null as THREE.Group | null,
    xrayGroup: null as THREE.Group | null,
    screenCanvas: null as HTMLCanvasElement | null,
    screenTexture: null as THREE.CanvasTexture | null,
    // Animation targets
    targetRotation: { x: 0.15, y: -0.35, z: 0 },
    currentRotation: { x: 0.15, y: -0.35, z: 0 },
    targetPosition: { x: 0, y: 0, z: 0 },
    currentPosition: { x: 0, y: 0, z: 0 },
    targetScale: 1,
    currentScale: 1,
    explodedFactor: 0,
    targetExplodedFactor: 0,
    spenEjectFactor: 0,
    targetSpenEjectFactor: 0,
    xrayFactor: 0,
    targetXrayFactor: 0,
    // Mouse dragging state
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    dragVelocity: { x: 0, y: 0 },
  });

  // Helper to create lockscreen texture on canvas
  const createScreenCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const renderScreen = () => {
      // Background gradient - Deep space dark OLED with subtle cyan/violet nebula
      const bg = ctx.createLinearGradient(0, 0, 512, 1024);
      bg.addColorStop(0, '#0a0d18');
      bg.addColorStop(0.35, '#05070e');
      bg.addColorStop(0.65, '#0b1122');
      bg.addColorStop(1, '#05070c');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 512, 1024);

      // Galaxy AI dynamic energy rings
      const glow = ctx.createRadialGradient(256, 512, 40, 256, 512, 280);
      glow.addColorStop(0, 'rgba(0, 240, 255, 0.22)');
      glow.addColorStop(0.4, 'rgba(99, 102, 241, 0.15)');
      glow.addColorStop(0.8, 'rgba(236, 72, 153, 0.06)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 512, 1024);

      // Status Bar (Top)
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('10:49', 42, 60);

      // Icons: 5G, Battery
      ctx.textAlign = 'right';
      ctx.font = '500 20px sans-serif';
      ctx.fillText('5G  100%', 470, 60);

      // Large Ambient Clock
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = '300 110px "Space Grotesk", sans-serif';
      ctx.fillText(`${hours}:${minutes}`, 256, 320);

      // Date
      const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      ctx.font = '400 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fillText(dateStr, 256, 375);

      // Galaxy AI Notification Pill
      ctx.save();
      const pillY = 460;
      const pillX = 76;
      const pillW = 360;
      const pillH = 72;
      const r = 36;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, r);
      ctx.fill();
      ctx.stroke();

      // Pill content
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#00f0ff';
      ctx.textAlign = 'left';
      ctx.fillText('✨ Galaxy AI', 106, pillY + 44);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Tap to generate summary', 234, pillY + 44);
      ctx.restore();

      // Ultrasonic Fingerprint Area (Lower Center)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(256, 820, 36, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(256, 820, 22, 0, Math.PI * 2);
      ctx.stroke();

      // Swipe to unlock hint
      ctx.textAlign = 'center';
      ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('Swipe or S-Pen to unlock', 256, 920);

      // Bottom bar indicator
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.roundRect(176, 975, 160, 6, 3);
      ctx.fill();
    };

    renderScreen();
    return canvas;
  };

  // Sync color changes into Three.js materials
  useEffect(() => {
    const { titaniumMaterials, backGlassMaterial } = stateRef.current;
    if (titaniumMaterials.length > 0) {
      const colorVal = new THREE.Color(color.threeColor);
      titaniumMaterials.forEach((mat) => {
        mat.color.copy(colorVal);
        mat.needsUpdate = true;
      });
    }
    if (backGlassMaterial) {
      backGlassMaterial.color.copy(new THREE.Color(color.threeColor));
      backGlassMaterial.needsUpdate = true;
    }
  }, [color]);

  // Handle Preset View Modes
  const applyViewMode = useCallback((mode: ViewMode) => {
    setActivePreset(mode);
    sounds.playClick();
    if (onViewModeChange) onViewModeChange(mode);

    const s = stateRef.current;
    switch (mode) {
      case 'hero':
        s.targetRotation = { x: 0.12, y: -0.38, z: 0.02 };
        s.targetPosition = { x: 0, y: 0.1, z: 0 };
        s.targetScale = 1.0;
        s.targetExplodedFactor = 0;
        s.targetSpenEjectFactor = 0;
        s.targetXrayFactor = 0;
        break;
      case 'front':
        s.targetRotation = { x: 0, y: 0, z: 0 };
        s.targetPosition = { x: 0, y: 0, z: 0.5 };
        s.targetScale = 1.05;
        s.targetExplodedFactor = 0;
        s.targetSpenEjectFactor = 0;
        s.targetXrayFactor = 0;
        break;
      case 'back':
        s.targetRotation = { x: 0, y: Math.PI, z: 0 };
        s.targetPosition = { x: 0, y: 0, z: 0.5 };
        s.targetScale = 1.05;
        s.targetExplodedFactor = 0;
        s.targetSpenEjectFactor = 0;
        s.targetXrayFactor = 0;
        break;
      case 'exploded':
        sounds.playShutter();
        s.targetRotation = { x: 0.25, y: Math.PI - 0.45, z: -0.1 };
        s.targetPosition = { x: -0.3, y: 0, z: 0.3 };
        s.targetScale = 1.08;
        s.targetExplodedFactor = 1;
        s.targetSpenEjectFactor = 0.2;
        s.targetXrayFactor = 0;
        break;
      case 'spen':
        sounds.playSpenEject();
        s.targetRotation = { x: -0.1, y: -0.2, z: 0.2 };
        s.targetPosition = { x: 0.2, y: 0.3, z: 0.2 };
        s.targetScale = 1.05;
        s.targetExplodedFactor = 0;
        s.targetSpenEjectFactor = 1;
        s.targetXrayFactor = 0;
        break;
      case 'xray':
        sounds.playAIChime();
        s.targetRotation = { x: 0.05, y: Math.PI + 0.1, z: 0 };
        s.targetPosition = { x: 0, y: 0, z: 0.4 };
        s.targetScale = 1.06;
        s.targetExplodedFactor = 0;
        s.targetSpenEjectFactor = 0;
        s.targetXrayFactor = 1;
        break;
    }
  }, [onViewModeChange]);

  useEffect(() => {
    applyViewMode(viewMode);
  }, [viewMode, applyViewMode]);

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    stateRef.current.scene = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11);
    stateRef.current.camera = camera;

    // 3. Renderer with high-end Antialiasing & PBR Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 4. Lighting Rig
    // Key Light (Main soft white light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 7, 8);
    scene.add(keyLight);

    // Rim Light 1: Brilliant Cyan Edge Reflection
    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 3.0);
    cyanRim.position.set(-8, 3, -4);
    scene.add(cyanRim);

    // Rim Light 2: Warm Amber Accent
    const amberRim = new THREE.DirectionalLight(0xf59e0b, 1.8);
    amberRim.position.set(8, -4, -3);
    scene.add(amberRim);

    // Fill Light: Soft Front
    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 1.0);
    fillLight.position.set(0, -5, 6);
    scene.add(fillLight);

    // Ambient Sky / Ground Light
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0a0c16, 1.2);
    scene.add(hemiLight);

    // 5. Build Samsung Galaxy S25 Ultra 3D Procedural Model
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);
    stateRef.current.phoneGroup = phoneGroup;

    // S25 Ultra Dimensions
    const phoneW = 3.6;
    const phoneH = 7.6;
    const phoneD = 0.38;
    const cornerRadius = 0.28;

    // Create Titanium Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color.threeColor),
      metalness: 0.94,
      roughness: 0.28,
      envMapIntensity: 1.5,
    });
    stateRef.current.titaniumMaterials.push(titaniumMat);

    // Bezel & Frame Geometry
    const frameShape = new THREE.Shape();
    const halfW = phoneW / 2;
    const halfH = phoneH / 2;
    const cr = cornerRadius;

    frameShape.moveTo(-halfW + cr, halfH);
    frameShape.lineTo(halfW - cr, halfH);
    frameShape.quadraticCurveTo(halfW, halfH, halfW, halfH - cr);
    frameShape.lineTo(halfW, -halfH + cr);
    frameShape.quadraticCurveTo(halfW, -halfH, halfW - cr, -halfH);
    frameShape.lineTo(-halfW + cr, -halfH);
    frameShape.quadraticCurveTo(-halfW, -halfH, -halfW, -halfH + cr);
    frameShape.lineTo(-halfW, halfH - cr);
    frameShape.quadraticCurveTo(-halfW, halfH, -halfW + cr, halfH);

    const extrudeSettings = {
      depth: phoneD,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const frameGeo = new THREE.ExtrudeGeometry(frameShape, extrudeSettings);
    frameGeo.center();
    const phoneFrame = new THREE.Mesh(frameGeo, titaniumMat);
    phoneGroup.add(phoneFrame);

    // Front Screen (AMOLED Dynamic 2X)
    const screenCanvas = createScreenCanvas();
    stateRef.current.screenCanvas = screenCanvas;
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.anisotropy = 16;
    stateRef.current.screenTexture = screenTexture;

    const screenGeo = new THREE.PlaneGeometry(phoneW * 0.94, phoneH * 0.95);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = phoneD / 2 + 0.042;
    phoneGroup.add(screenMesh);

    // Corning Gorilla Armor Anti-Reflective Outer Glass Layer
    const glassGeo = new THREE.PlaneGeometry(phoneW * 0.96, phoneH * 0.96);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 1.52,
      reflectivity: 0.8,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.z = phoneD / 2 + 0.045;
    phoneGroup.add(glassMesh);

    // Front Camera Punch-hole
    const punchholeGeo = new THREE.CircleGeometry(0.09, 32);
    const punchholeMat = new THREE.MeshBasicMaterial({ color: 0x05070a });
    const punchholeMesh = new THREE.Mesh(punchholeGeo, punchholeMat);
    punchholeMesh.position.set(0, phoneH / 2 - 0.42, phoneD / 2 + 0.046);
    phoneGroup.add(punchholeMesh);

    // Back Plate (Satin Matte Finish)
    const backGlassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color.threeColor),
      metalness: 0.75,
      roughness: 0.32,
      transparent: true,
      opacity: 1.0,
    });
    stateRef.current.backGlassMaterial = backGlassMat;

    const backGeo = new THREE.PlaneGeometry(phoneW * 0.96, phoneH * 0.96);
    const backMesh = new THREE.Mesh(backGeo, backGlassMat);
    backMesh.rotation.y = Math.PI;
    backMesh.position.z = -phoneD / 2 - 0.042;
    phoneGroup.add(backMesh);

    // Samsung Metallic Logo on Back
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 512;
    logoCanvas.height = 128;
    const lctx = logoCanvas.getContext('2d');
    if (lctx) {
      lctx.fillStyle = 'rgba(0,0,0,0)';
      lctx.fillRect(0, 0, 512, 128);
      lctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      lctx.font = '700 36px "Space Grotesk", sans-serif';
      lctx.textAlign = 'center';
      lctx.letterSpacing = '10px';
      lctx.fillText('S A M S U N G', 256, 75);
    }
    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    const logoGeo = new THREE.PlaneGeometry(1.6, 0.4);
    const logoMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.8,
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.rotation.y = Math.PI;
    logoMesh.position.set(0, -phoneH / 2 + 0.95, -phoneD / 2 - 0.044);
    phoneGroup.add(logoMesh);

    // 6. Quad Camera Matrix System on Back
    const cameraLensesGroup = new THREE.Group();
    phoneGroup.add(cameraLensesGroup);
    stateRef.current.cameraLensesGroup = cameraLensesGroup;

    // Helper for creating floating camera rings
    const createCameraLens = (
      x: number,
      y: number,
      outerRadius: number,
      lensRadius: number,
      baseZOffset: number,
      maxExplodeZ: number,
      isPeriscope: boolean = false
    ) => {
      const lensGroup = new THREE.Group();
      lensGroup.position.set(x, y, -phoneD / 2 - 0.045);

      // Titanium Outer Bezel Ring
      const ringGeo = new THREE.CylinderGeometry(outerRadius, outerRadius, 0.12, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, titaniumMat);
      lensGroup.add(ringMesh);

      // Inner Lens Barrel
      const barrelGeo = new THREE.CylinderGeometry(outerRadius * 0.9, outerRadius * 0.9, 0.14, 32);
      barrelGeo.rotateX(Math.PI / 2);
      const barrelMat = new THREE.MeshStandardMaterial({
        color: 0x111317,
        roughness: 0.2,
        metalness: 0.9,
      });
      const barrelMesh = new THREE.Mesh(barrelGeo, barrelMat);
      lensGroup.add(barrelMesh);

      // Glass Element / Optics
      let glassLens: THREE.Mesh;
      if (isPeriscope) {
        // Periscope folded prism aperture (Square inside round ring)
        const prismGeo = new THREE.BoxGeometry(lensRadius * 1.3, lensRadius * 1.3, 0.05);
        const prismMat = new THREE.MeshPhysicalMaterial({
          color: 0x051b2c,
          roughness: 0.02,
          transmission: 0.9,
          reflectivity: 0.95,
        });
        glassLens = new THREE.Mesh(prismGeo, prismMat);
      } else {
        const lensGeo = new THREE.CylinderGeometry(lensRadius, lensRadius, 0.06, 32);
        lensGeo.rotateX(Math.PI / 2);
        const opticMat = new THREE.MeshPhysicalMaterial({
          color: 0x0a1a2f,
          roughness: 0.02,
          transmission: 0.92,
          reflectivity: 0.98,
          clearcoat: 1.0,
        });
        glassLens = new THREE.Mesh(lensGeo, opticMat);
      }
      glassLens.position.z = -0.05;
      lensGroup.add(glassLens);

      // Optical Anti-Reflective Coating Reflection Disk (Cyan/Violet Specular)
      const arGeo = new THREE.CircleGeometry(lensRadius * 0.85, 32);
      const arMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.35,
      });
      const arMesh = new THREE.Mesh(arGeo, arMat);
      arMesh.rotation.y = Math.PI;
      arMesh.position.z = -0.07;
      lensGroup.add(arMesh);

      cameraLensesGroup.add(lensGroup);

      stateRef.current.cameraParts.push({
        mesh: lensGroup,
        baseZ: -phoneD / 2 - 0.045 - baseZOffset,
        explodeZ: -phoneD / 2 - 0.045 - baseZOffset - maxExplodeZ,
      });
    };

    // 1. 200MP Wide Main Camera (Top Left)
    createCameraLens(-0.95, phoneH / 2 - 1.1, 0.44, 0.34, 0.02, 1.8);
    // 2. 50MP 5x Periscope Zoom (Middle Left)
    createCameraLens(-0.95, phoneH / 2 - 2.15, 0.44, 0.32, 0.02, 2.2, true);
    // 3. 50MP 3x Telephoto (Bottom Left)
    createCameraLens(-0.95, phoneH / 2 - 3.2, 0.42, 0.31, 0.02, 1.4);
    // 4. 50MP Ultra-Wide (Top Right)
    createCameraLens(-0.05, phoneH / 2 - 1.1, 0.36, 0.26, 0.01, 1.1);

    // Laser Auto Focus & LED Flash (Right Middle)
    const flashGroup = new THREE.Group();
    flashGroup.position.set(-0.05, phoneH / 2 - 1.9, -phoneD / 2 - 0.045);
    const flashRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.06, 24).rotateX(Math.PI / 2),
      titaniumMat
    );
    const flashBulb = new THREE.Mesh(
      new THREE.CircleGeometry(0.12, 16),
      new THREE.MeshBasicMaterial({ color: 0xfff3d0 })
    );
    flashBulb.rotation.y = Math.PI;
    flashBulb.position.z = -0.04;
    flashGroup.add(flashRing);
    flashGroup.add(flashBulb);
    phoneGroup.add(flashGroup);

    // 7. Modeled S-Pen Stylus
    const spenGroup = new THREE.Group();
    stateRef.current.spenGroup = spenGroup;

    const spenBodyGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.4, 16);
    const spenMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color.threeColor),
      metalness: 0.85,
      roughness: 0.3,
    });
    const spenBody = new THREE.Mesh(spenBodyGeo, spenMat);
    spenGroup.add(spenBody);

    // S-Pen Clicker Top Cap
    const spenCapGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.25, 16);
    const spenCapMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.2 });
    const spenCap = new THREE.Mesh(spenCapGeo, spenCapMat);
    spenCap.position.y = 2.25;
    spenGroup.add(spenCap);

    // S-Pen Precision Fine Tip
    const spenTipGeo = new THREE.ConeGeometry(0.07, 0.35, 16);
    spenTipGeo.rotateX(Math.PI);
    const spenTipMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    const spenTip = new THREE.Mesh(spenTipGeo, spenTipMat);
    spenTip.position.y = -2.35;
    spenGroup.add(spenTip);

    // Initial position of S-Pen: docked inside bottom-left silo
    spenGroup.position.set(-phoneW / 2 + 0.28, -phoneH / 2 + 1.2, 0);
    phoneGroup.add(spenGroup);

    // 8. Snapdragon 8 Elite X-Ray Core Engine
    const xrayGroup = new THREE.Group();
    xrayGroup.position.set(0, 0.4, 0);
    stateRef.current.xrayGroup = xrayGroup;

    // Copper Vapor Chamber Heat Sink
    const vaporGeo = new THREE.BoxGeometry(2.4, 3.8, 0.06);
    const vaporMat = new THREE.MeshStandardMaterial({
      color: 0xb86e3f,
      metalness: 0.92,
      roughness: 0.35,
    });
    const vaporMesh = new THREE.Mesh(vaporGeo, vaporMat);
    vaporMesh.position.z = -0.05;
    xrayGroup.add(vaporMesh);

    // Snapdragon 8 Elite SoC Core
    const chipGeo = new THREE.BoxGeometry(1.2, 1.2, 0.08);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x111520,
      metalness: 0.8,
      roughness: 0.2,
    });
    const chipMesh = new THREE.Mesh(chipGeo, chipMat);
    chipMesh.position.set(0, 0.4, 0);
    xrayGroup.add(chipMesh);

    // Snapdragon Dragon / Neural Core Ring Glow
    const ringGlowGeo = new THREE.RingGeometry(0.25, 0.42, 32);
    const ringGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ringGlowMesh = new THREE.Mesh(ringGlowGeo, ringGlowMat);
    ringGlowMesh.position.set(0, 0.4, 0.06);
    xrayGroup.add(ringGlowMesh);

    xrayGroup.visible = false;
    phoneGroup.add(xrayGroup);

    // 9. Floating Shadow / Studio Reflection Ground Plane
    const shadowGeo = new THREE.PlaneGeometry(12, 12);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020305,
      transparent: true,
      opacity: 0.6,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -phoneH / 2 - 0.7;
    scene.add(shadowPlane);

    // 10. Mouse Drag & Gesture Listeners for 360° Inspection
    let isDown = false;
    let startX = 0;
    let startY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDown = true;
      startX = e.clientX;
      startY = e.clientY;
      stateRef.current.isDragging = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !isDown) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      startX = e.clientX;
      startY = e.clientY;

      stateRef.current.targetRotation.y += deltaX * 0.012;
      stateRef.current.targetRotation.x += deltaY * 0.012;
      stateRef.current.dragVelocity = { x: deltaX * 0.005, y: deltaY * 0.005 };
    };

    const handleMouseUp = () => {
      isDown = false;
      stateRef.current.isDragging = false;
    };

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      isDown = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      stateRef.current.isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || !isDown || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;

      stateRef.current.targetRotation.y += deltaX * 0.014;
      stateRef.current.targetRotation.x += deltaY * 0.014;
    };

    const handleTouchEnd = () => {
      isDown = false;
      stateRef.current.isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 11. Window Resize Listener
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 12. Main 60FPS Animation Loop with Smooth Inertia Interpolation
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const s = stateRef.current;

      // Idle levitation float effect
      const levitation = Math.sin(elapsedTime * 1.5) * 0.08;

      // Smooth Lerp Rotations
      s.currentRotation.x += (s.targetRotation.x - s.currentRotation.x) * 0.08;
      s.currentRotation.y += (s.targetRotation.y - s.currentRotation.y) * 0.08;
      s.currentRotation.z += (s.targetRotation.z - s.currentRotation.z) * 0.08;

      // Smooth Lerp Position & Scale
      s.currentPosition.x += (s.targetPosition.x - s.currentPosition.x) * 0.08;
      s.currentPosition.y += (s.targetPosition.y + levitation - s.currentPosition.y) * 0.08;
      s.currentPosition.z += (s.targetPosition.z - s.currentPosition.z) * 0.08;
      s.currentScale += (s.targetScale - s.currentScale) * 0.08;

      phoneGroup.rotation.x = s.currentRotation.x;
      phoneGroup.rotation.y = s.currentRotation.y;
      phoneGroup.rotation.z = s.currentRotation.z;
      phoneGroup.position.set(s.currentPosition.x, s.currentPosition.y, s.currentPosition.z);
      phoneGroup.scale.setScalar(s.currentScale);

      // Camera Parts Exploded View Interpolation
      s.explodedFactor += (s.targetExplodedFactor - s.explodedFactor) * 0.08;
      s.cameraParts.forEach((part) => {
        const targetZ = THREE.MathUtils.lerp(part.baseZ, part.explodeZ, s.explodedFactor);
        part.mesh.position.z += (targetZ - part.mesh.position.z) * 0.1;
      });

      // S-Pen Ejection Interpolation
      s.spenEjectFactor += (s.targetSpenEjectFactor - s.spenEjectFactor) * 0.08;
      if (spenGroup) {
        if (s.spenEjectFactor > 0.01) {
          // Slide down and float outward
          const ejectY = -phoneH / 2 + 1.2 - s.spenEjectFactor * 3.6;
          const ejectX = -phoneW / 2 + 0.28 + s.spenEjectFactor * 1.8;
          const ejectZ = s.spenEjectFactor * 1.2;
          spenGroup.position.set(ejectX, ejectY, ejectZ);
          spenGroup.rotation.z = s.spenEjectFactor * 0.45;
          spenGroup.rotation.x = s.spenEjectFactor * 0.25;
        } else {
          spenGroup.position.set(-phoneW / 2 + 0.28, -phoneH / 2 + 1.2, 0);
          spenGroup.rotation.set(0, 0, 0);
        }
      }

      // X-Ray Mode Opacity & Core Reveal
      s.xrayFactor += (s.targetXrayFactor - s.xrayFactor) * 0.08;
      if (xrayGroup && backGlassMat) {
        if (s.xrayFactor > 0.02) {
          xrayGroup.visible = true;
          backGlassMat.opacity = THREE.MathUtils.lerp(1.0, 0.18, s.xrayFactor);
          ringGlowMesh.rotation.z = elapsedTime * 2.0;
        } else {
          xrayGroup.visible = false;
          backGlassMat.opacity = 1.0;
        }
      }

      // Dynamic studio rim light oscillation
      cyanRim.position.x = -8 + Math.sin(elapsedTime * 0.8) * 1.5;
      amberRim.position.x = 8 + Math.cos(elapsedTime * 0.8) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Interactivity Prompt Badge */}
      <div className={`absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
        <Move3d className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Drag to inspect 360°</span>
      </div>

      {/* Floating 3D Preset Camera Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel border border-white/10 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => applyViewMode('hero')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activePreset === 'hero'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Overview Hero View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Overview</span>
        </button>

        <button
          onClick={() => applyViewMode('front')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activePreset === 'front'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Dynamic AMOLED 2X Display"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Screen</span>
        </button>

        <button
          onClick={() => applyViewMode('back')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activePreset === 'back'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Titanium Armor Backplate"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <button
          onClick={() => applyViewMode('exploded')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activePreset === 'exploded'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Exploded 200MP Quad Camera Matrix"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-cyan-300">Exploded</span>
        </button>

        <button
          onClick={() => applyViewMode('spen')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activePreset === 'spen'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Detachable S-Pen"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">S-Pen</span>
        </button>

        <button
          onClick={() => applyViewMode('xray')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activePreset === 'xray'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Snapdragon 8 Elite Neural Core"
        >
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Snapdragon</span>
        </button>
      </div>

      {/* Floating Galaxy AI Spec Badge */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-medium text-indigo-200 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        <span>Grade 5 Titanium</span>
      </div>
    </div>
  );
};
