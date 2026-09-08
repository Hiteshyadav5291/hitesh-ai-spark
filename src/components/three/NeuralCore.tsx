import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Futuristic "AI neural core":
 *  - a set of nodes distributed on a sphere (the neurons)
 *  - thin lines connecting nearby nodes (the synapses)
 *  - an ambient particle field for depth
 * The whole group rotates slowly and drifts with the pointer.
 */

type SceneConfig = { nodeCount: number; particleCount: number; maxLinks: number };

/** Evenly distribute points on a sphere (Fibonacci sphere). */
function sphereNodes(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius),
    );
  }
  return points;
}

function Nodes({ config }: { config: SceneConfig }) {
  const group = useRef<THREE.Group>(null);
  const instances = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const basePoints = useMemo(
    () => sphereNodes(config.nodeCount, 1.75),
    [config.nodeCount],
  );

  // Precompute the synapse geometry once — connect each node to its close neighbours.
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    let links = 0;
    for (let i = 0; i < basePoints.length && links < config.maxLinks; i++) {
      for (let j = i + 1; j < basePoints.length && links < config.maxLinks; j++) {
        if (basePoints[i]!.distanceTo(basePoints[j]!) < 1.05) {
          positions.push(...basePoints[i]!.toArray(), ...basePoints[j]!.toArray());
          links++;
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [basePoints, config.maxLinks]);

  // Dispose generated geometry when the scene unmounts.
  useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += dt * 0.12;
      // Gentle pointer parallax
      group.current.rotation.x +=
        (state.pointer.y * 0.25 - group.current.rotation.x) * 0.05;
      group.current.position.x +=
        (state.pointer.x * 0.3 - group.current.position.x) * 0.05;
    }
    if (instances.current) {
      basePoints.forEach((p, i) => {
        const wobble = 1 + Math.sin(t * 0.9 + i) * 0.03;
        dummy.position.copy(p).multiplyScalar(wobble);
        const s = 0.045 + Math.sin(t * 1.4 + i * 0.7) * 0.012;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        instances.current!.setMatrixAt(i, dummy.matrix);
      });
      instances.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <instancedMesh ref={instances} args={[undefined, undefined, basePoints.length]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#7c3aed"
          emissiveIntensity={0.45}
          roughness={0.25}
          metalness={0.35}
        />
      </instancedMesh>

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </lineSegments>

      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#2563eb"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(delta, 0.05) * 0.03;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.035} color="#2563eb" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/** Keeps the renderer light on small screens / high-DPI phones. */
function PixelRatioGuard() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  }, [gl]);
  return null;
}

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export function NeuralCore() {
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);
  const [config, setConfig] = useState<SceneConfig>({
    nodeCount: 90,
    particleCount: 320,
    maxLinks: 260,
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    setSupported(webglAvailable() && !reduced);
    setConfig(
      small
        ? { nodeCount: 45, particleCount: 110, maxLinks: 110 }
        : { nodeCount: 90, particleCount: 320, maxLinks: 260 },
    );
    setReady(true);
  }, []);

  // Graceful fallback: an animated gradient stands in for the 3D scene.
  if (!ready || !supported) {
    return (
      <div
        aria-hidden="true"
        className="float-soft h-full w-full rounded-3xl"
        style={{ background: "var(--gradient-brand)", opacity: 0.18, filter: "blur(28px)" }}
      />
    );
  }

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 5.4], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <PixelRatioGuard />
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <pointLight position={[-4, -2, 3]} intensity={2} color="#06b6d4" />
      <Nodes config={config} />
      <Particles count={config.particleCount} />
    </Canvas>
  );
}
