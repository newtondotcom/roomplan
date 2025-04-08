export function drawFloor(
  ctx: CanvasRenderingContext2D,
  corners: number[][],
  zoom: number,
  offsetX: number,
  offsetY: number,
) {
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(zoom, zoom);

  ctx.beginPath();
  corners.forEach(([x, y], i) =>
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y),
  );
  ctx.closePath();
  ctx.fillStyle = "#f5f5f5";
  ctx.fill();
  ctx.strokeStyle = "#999";
  ctx.stroke();

  ctx.restore();
}

export function getFloorRectangle(floor: {
  dimensions: number[];
  transform: number[];
}) {
  const [width, height] = floor.dimensions;
  const centerX = floor.transform[12]; // Translation X
  const centerY = floor.transform[13]; // Translation Y

  return [
    [centerX - width / 2, centerY - height / 2], // Bottom-left
    [centerX - width / 2, centerY + height / 2], // Top-left
    [centerX + width / 2, centerY + height / 2], // Top-right
    [centerX + width / 2, centerY - height / 2], // Bottom-right
  ];
}
