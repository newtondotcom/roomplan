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
  windows: any[]; // Assuming windows can be empty or have a specific structure
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
  dimensions: [number, number, number];
  identifier: string;
  parentIdentifier: string;
  polygonCorners: any[]; // Replace with specific type if corners have a structure
  story: number;
  transform: number[];
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
  dimensions: [number, number, number];
  identifier: string;
  parentIdentifier: string | null;
  polygonCorners: [number, number, number][];
  story: number;
  transform: number[];
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
  dimensions: [number, number, number];
  identifier: string;
  parentIdentifier: string | null;
  story: number;
  transform: number[];
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
  dimensions: [number, number, number];
  identifier: string;
  parentIdentifier: string;
  polygonCorners: any[];
  story: number;
  transform: number[];
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
  dimensions: [number, number, number];
  identifier: string;
  parentIdentifier: string | null;
  polygonCorners: any[];
  story: number;
  transform: number[];
}
