/**
 * Represents a 2D affine transformation matrix
 */
export type Transform2D = {
  a: number; // Scale X
  b: number; // Shear Y
  c: number; // Shear X
  d: number; // Scale Y
  tx: number; // Translate X
  ty: number; // Translate Y
};

/**
 * Extracts 2D transformation components from a 4x4 matrix (column-major order)
 * @param transform The 16-element transformation matrix array
 * @returns A simplified 2D transformation object
 */
export function extract2DTransform(transform: number[]): Transform2D {
  if (transform.length !== 16) {
    throw new Error("Transform matrix must have 16 elements");
  }

  return {
    a: transform[0], // m00: Scale X
    b: transform[1], // m10: Shear Y
    c: transform[4], // m01: Shear X
    d: transform[5], // m11: Scale Y
    tx: transform[12], // m03: Translate X
    ty: transform[13], // m13: Translate Y
  };
}

/**
 * Applies a 2D transformation to a point
 * @param transform The 2D transformation object
 * @param x The x-coordinate of the point
 * @param y The y-coordinate of the point
 * @returns The transformed point as [x, y]
 */
export function apply2DTransform(
  transform: Transform2D,
  x: number,
  y: number,
): [number, number] {
  return [
    transform.a * x + transform.c * y + transform.tx,
    transform.b * x + transform.d * y + transform.ty,
  ];
}

/**
 * Transforms all corners of a floor polygon using the floor's transformation matrix
 * @param floor The floor data containing polygonCorners and transform
 * @param scaleFactor Optional scaling factor (pixels per meter)
 * @param offset Optional offset [x, y] in pixels
 * @returns Array of transformed points in screen coordinates
 */
export function transformFloorCorners(
  floor: {
    polygonCorners: number[][];
    transform: number[];
  },
  scaleFactor: number = 50,
  offset: [number, number] = [50, 50],
): Array<[number, number]> {
  const transform = extract2DTransform(floor.transform);

  return floor.polygonCorners.map((corner) => {
    const [x, y] = apply2DTransform(transform, corner[0], corner[1]);
    return [offset[0] + x * scaleFactor, offset[1] + y * scaleFactor];
  });
}

export function getBoundingBox(corners: number[][]) {
  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  corners.forEach(([x, y]) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });

  return { minX, maxX, minY, maxY };
}

export function calculateViewport(
  canvas: HTMLCanvasElement,
  corners: number[][],
  padding: number = 20,
) {
  const { minX, maxX, minY, maxY } = getBoundingBox(corners);

  // Floor dimensions in world coordinates
  const floorWidth = maxX - minX;
  const floorHeight = maxY - minY;

  // Canvas dimensions
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate zoom to fit floor (with padding)
  const scaleX = (canvasWidth - 2 * padding) / floorWidth;
  const scaleY = (canvasHeight - 2 * padding) / floorHeight;
  const zoom = Math.min(scaleX, scaleY);

  // Calculate center offset
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const offsetX = canvasWidth / 2 - centerX * zoom;
  const offsetY = canvasHeight / 2 - centerY * zoom;

  return { zoom, offsetX, offsetY };
}
