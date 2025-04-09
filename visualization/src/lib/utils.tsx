import { Dimensions } from "@/types/coreModel";

export function getTwoNonNullCoordinates(coordinates: Dimensions): [number, number] {
    const nonNulls = coordinates.filter(c => c != null && c !== 0);
  
    if (nonNulls.length < 2) {
      throw new Error("Expected at least two non-null and non-zero values");
    }
  
    return [nonNulls[0], nonNulls[1]];
  }
  