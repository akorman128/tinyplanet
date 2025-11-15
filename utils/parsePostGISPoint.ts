/**
 * Parses a PostGIS POINT in either WKT text or WKB binary format to coordinates.
 * @param location - PostGIS POINT string in format:
 *   - WKT: "POINT(longitude latitude)" or "SRID=4326;POINT(longitude latitude)"
 *   - WKB: Hexadecimal string like "0101000020E6100000..."
 * @returns Tuple of [longitude, latitude] or null if parsing fails
 */
export const parsePostGISPoint = (
  location: string
): [number, number] | null => {
  // Handle WKT format with optional SRID prefix: "SRID=4326;POINT(longitude latitude)" or "POINT(longitude latitude)"
  const wktMatch = location.match(
    /POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i
  );
  if (wktMatch) {
    return [parseFloat(wktMatch[1]), parseFloat(wktMatch[2])];
  }

  // Handle WKB (Well-Known Binary) hexadecimal format
  // Format: 01 01000020 E6100000 [8 bytes lng] [8 bytes lat]
  if (/^[0-9A-Fa-f]+$/.test(location) && location.length >= 50) {
    try {
      // Skip byte order (2 chars), geometry type (8 chars), and SRID (8 chars)
      const dataStart = 18;

      // Extract longitude (next 16 hex chars = 8 bytes)
      const lngHex = location.substring(dataStart, dataStart + 16);
      // Extract latitude (next 16 hex chars = 8 bytes)
      const latHex = location.substring(dataStart + 16, dataStart + 32);

      // Convert hex to little-endian double
      const lngBytes = new Uint8Array(
        lngHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16))
      );
      const latBytes = new Uint8Array(
        latHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16))
      );

      const lng = new DataView(lngBytes.buffer).getFloat64(0, true);
      const lat = new DataView(latBytes.buffer).getFloat64(0, true);

      return [lng, lat];
    } catch (err) {
      console.error("Failed to parse WKB format:", err);
      return null;
    }
  }

  return null;
};
