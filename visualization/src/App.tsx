import React, { useEffect, useRef, useState } from "react";
import { CoreModel } from "./types/coreModel";
import { calculateViewport, transformFloorCorners } from "./lib/math";
import { drawFloor, getFloorRectangle } from "./lib/floor";

function App() {
  const [room, setRoom] = useState<CoreModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1); // Zoom factor
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch("/room.json");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: CoreModel = await response.json();
        console.log(`${data.walls.length} wall have been found`);
        setRoom(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !room?.floors?.length) return;

    const floor = room.floors[0];

    // Use dimensions if polygonCorners is flat
    const corners = floor.polygonCorners.some((c, _, arr) => c[1] !== arr[0][1])
      ? floor.polygonCorners.map((c) => [c[0], c[1]])
      : getFloorRectangle(floor);

    // Auto-zoom
    const { zoom, offsetX, offsetY } = calculateViewport(canvas, corners);

    // Draw
    const ctx = canvas.getContext("2d")!;
    drawFloor(ctx, corners, zoom, offsetX, offsetY);
  }, [room]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Interactive Floor Plan</h1>
      <div className="border rounded-lg overflow-auto">
        <canvas ref={canvasRef} className="bg-white" />
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Zoom Out
        </button>
        <button
          onClick={() => setZoom((prev) => prev + 0.1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Zoom In
        </button>
      </div>
      {selectedItem && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold">Selected Item: {selectedItem}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
