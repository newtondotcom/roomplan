export type Dimensions = [number, number, number];

export type Transform = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
];

export interface CoreModel {
  coreModel: string;
  doors: Door[];
  floors: Floor[];
  objects: Object[];
  openings: Opening[];
  sections: Section[];
  story: number;
  version: number;
  walls: Wall[];
  windows: Window[];
}

export interface Door {
  category: {
    door: {
      isOpen: boolean;
    };
  };
  completedEdges: any[]; // Replace with specific type if edges have a structure
  confidence: {
    high: Record<string, never>; // Empty object
  };
  curve: null;
  dimensions: Dimensions;
  identifier: string;
  parentIdentifier: string;
  polygonCorners: any[]; // Replace with specific type if corners have a structure
  story: number;
  transform: Transform;
}

export interface Floor {
  category: {
    floor: Record<string, never>; // Empty object
  };
  completedEdges: any[];
  confidence: {
    high: Record<string, never>;
  };
  curve: null;
  dimensions: Dimensions;
  identifier: string;
  parentIdentifier: string | null;
  polygonCorners: [number, number, number][];
  story: number;
  transform: Transform;
}

export interface Object {
  attributes: Record<string, string> | {}; // Can be empty or contain string properties
  category: {
    [key: string]: Record<string, never>; // Dynamic keys with empty objects
  };
  confidence: {
    high?: Record<string, never>;
    medium?: Record<string, never>;
    low?: Record<string, never>;
  };
  dimensions: Dimensions;
  identifier: string;
  parentIdentifier: string | null;
  story: number;
  transform: Transform;
}

export interface Opening {
  category: {
    opening: Record<string, never>;
  };
  completedEdges: any[];
  confidence: {
    high: Record<string, never>;
  };
  curve: null;
  dimensions: Dimensions;
  identifier: string;
  parentIdentifier: string;
  polygonCorners: any[];
  story: number;
  transform: Transform;
}

export interface Section {
  center: [number, number, number];
  label: string;
  story: number;
}

export interface Wall {
  category: {
    wall: Record<string, never>;
  };
  completedEdges: any[];
  confidence: {
    high: Record<string, never>;
  };
  curve: null;
  dimensions: Dimensions;
  identifier: string;
  parentIdentifier: string | null;
  polygonCorners: any[];
  story: number;
  transform: Transform;
}

export interface Window {
  category: {
    window: Record<string, never>;
  };
  completedEdges: any[];
  confidence: {
    high: Record<string, never>;
  };
  curve: null;
  dimensions: Dimensions;
  identifier: string;
  parentIdentifier: string;
  polygonCorners: any[];
  story: number;
  transform: Transform;
}
