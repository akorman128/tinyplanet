interface CacheEntry {
  formattedAddress: string;
  timestamp: number;
}

/**
 * Simple cache for geocoding results with stale-while-revalidate support
 * Uses a Map for O(1) lookups with 24-hour staleness threshold
 */
class GeocodeCache {
  private cache: Map<string, CacheEntry>;
  private staleTTL: number; // 24 hours in milliseconds

  constructor(staleTTL = 24 * 60 * 60 * 1000) {
    this.cache = new Map();
    this.staleTTL = staleTTL;
  }

  /**
   * Generate cache key from coordinates (rounded to 4 decimals for ~11m precision)
   */
  private getCacheKey(longitude: number, latitude: number): string {
    return `${longitude.toFixed(4)},${latitude.toFixed(4)}`;
  }

  /**
   * Get cached geocoding result
   * Returns { data, isStale } where isStale indicates if data is older than TTL
   */
  get(
    longitude: number,
    latitude: number
  ): { data: string; isStale: boolean } | null {
    const key = this.getCacheKey(longitude, latitude);
    const entry = this.cache.get(key);

    if (!entry) return null;

    const age = Date.now() - entry.timestamp;
    const isStale = age > this.staleTTL;

    return {
      data: entry.formattedAddress,
      isStale,
    };
  }

  /**
   * Set geocoding result in cache
   */
  set(longitude: number, latitude: number, formattedAddress: string): void {
    const key = this.getCacheKey(longitude, latitude);
    this.cache.set(key, {
      formattedAddress,
      timestamp: Date.now(),
    });
  }

  /**
   * Clear all cached entries
   */
  clear(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const geocodeCache = new GeocodeCache();
