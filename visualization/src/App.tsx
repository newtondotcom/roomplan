import { useEffect, useRef, useState } from "react";
import { Canvas} from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, PerspectiveCameraProps } from "@react-three/drei";
import { CoreModel } from "./types/coreModel";
import { Door, Floor, Wall, Window } from "./lib/mesh";

function App() {
  const [room, setRoom] = useState<CoreModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch("/bedroom3.json");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: CoreModel = await response.json();
        setRoom(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const getCutoutsForWall = (wall: Wall) => {
    const cutouts = [];
    room?.doors.forEach((door) => {
      if (door.parentIdentifier === wall.identifier) {
        cutouts.push({
          dimensions : door.dimensions,
          transform : door.transform
        });
      }
    });
    room?.windows.forEach((window) => {
      if (window.parentIdentifier === wall.identifier) {
        cutouts.push({
          dimensions : window.dimensions,
          transform : window.transform
        });
      }
    });
    room?.openings.forEach((opening) => {
      if (opening.parentIdentifier === wall.identifier) {
        cutouts.push({
          dimensions : opening.dimensions,
          transform : opening.transform
        });
      }
    });
    return cutouts;
  };

  return (
    <div className="p-4">
      <Canvas style={{ height: "100vh" }}>
        <PerspectiveCamera ref={cameraRef} makeDefault position={[5, 10, 25]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls camera={cameraRef.current} />
        {room?.floors.map((floor) => (
          <Floor
            key={floor.identifier}
            dimensions={[floor.dimensions[0], floor.dimensions[1],0]}
            transform={floor.transform}
          />
        ))}
        {room?.walls.map((wall) => (
          <Wall
            key={wall.identifier}
            dimensions={wall.dimensions}
            transform={wall.transform}
            cutouts={getCutoutsForWall(wall)}
          />
        ))}
        {room?.doors.map((door) => (
          <Door
            key={door.identifier}
            dimensions={door.dimensions}
            transform={door.transform}
            isOpen={door.category.door.isOpen}
          />
        ))}
        {room?.windows.map((window) => (
          <Window
            key={window.identifier}
            dimensions={window.dimensions}
            transform={window.transform}
          />
        ))}
      </Canvas>
    </div>
  );
}

export default App;
