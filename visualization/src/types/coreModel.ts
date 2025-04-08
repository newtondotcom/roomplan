export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Transform {
  matrix: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Confidence {
  level: "high" | "medium" | "low";
}

export interface Category {
  door?: {};
  floor?: {};
  storage?: {};
  television?: {};
  sofa?: {};
  oven?: {};
  fireplace?: {};
  table?: {};
  opening?: {};
  wall?: {};
}

export interface Attributes {
  StorageType?: "shelf" | "cabinet";
  SofaType?: "lShaped" | "lShapedExtension";
  TableShapeType?: "circularElliptic";
  TableType?: "coffee";
}

export interface BaseObject {
  category: Category;
  confidence: Confidence;
  dimensions: Dimensions;
  identifier: string;
  parentIdentifier: string | null;
  story: number;
  transform: Transform;
}

export interface Door extends BaseObject {
  category: { door: {} };
  isOpen: boolean;
}

export interface Floor extends BaseObject {
  category: { floor: {} };
  polygonCorners: Vector3[];
}

export interface StorageObject extends BaseObject {
  category: { storage: {} };
  attributes: Attributes;
}

export interface Television extends BaseObject {
  category: { television: {} };
}

export interface Sofa extends BaseObject {
  category: { sofa: {} };
  attributes: Attributes;
}

export interface Oven extends BaseObject {
  category: { oven: {} };
}

export interface Fireplace extends BaseObject {
  category: { fireplace: {} };
  attributes: Attributes;
}

export interface Table extends BaseObject {
  category: { table: {} };
  attributes: Attributes;
}

export interface Opening extends BaseObject {
  category: { opening: {} };
  polygonCorners: Vector3[];
}

export interface Wall extends BaseObject {
  category: { wall: {} };
  polygonCorners: Vector3[];
}

export interface Section {
  center: Vector3;
  label: string;
  story: number;
}

export interface CoreModel {
  doors: Door[];
  floors: Floor[];
  objects: (StorageObject | Television | Sofa | Oven | Fireplace | Table)[];
  openings: Opening[];
  sections: Section[];
  story: number;
  version: number;
  walls: Wall[];
  windows: any[];
}
