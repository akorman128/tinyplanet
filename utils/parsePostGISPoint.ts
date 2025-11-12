/**
 * Parses a PostGIS POINT string in WKT format to coordinates.
 * @param location - PostGIS POINT string in format "POINT(longitude latitude)"
 * @returns Tuple of [longitude, latitude] or null if parsing fails
 */
export const parsePostGISPoint = (
  location: string
): [number, number] | null => {
  // Handle WKT format: "POINT(longitude latitude)"
  const wktMatch = location.match(
    /POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i
  );
  if (wktMatch) {
    return [parseFloat(wktMatch[1]), parseFloat(wktMatch[2])];
  }

  return null;
};
