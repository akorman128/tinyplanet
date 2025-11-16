import { ReactNode, useMemo, useEffect } from "react";
import { AppState } from "react-native";

import { createClient, processLock } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SupabaseContext } from "../context/supabase-context";

// Custom fetch with timeout for React Native
// React Native's default timeout is 60s, which is too long for a good UX
const customFetch = (url: RequestInfo | URL, options: RequestInit = {}) => {
  const controller = new AbortController();
  const timeout = 5000; // 5 second timeout

  const startTime = Date.now();
  console.log(`[Fetch] Starting request to ${url}`);

  const timeoutPromise = new Promise<Response>((_, reject) =>
    setTimeout(() => {
      controller.abort();
      const elapsed = Date.now() - startTime;
      console.log(`[Fetch] TIMEOUT after ${elapsed}ms`);
      reject(new Error(`Network request timeout after ${timeout}ms`));
    }, timeout)
  );

  const fetchPromise = fetch(url, {
    ...options,
    signal: controller.signal,
  })
    .then((response) => {
      const elapsed = Date.now() - startTime;
      console.log(`[Fetch] Completed in ${elapsed}ms`);
      return response;
    })
    .catch((error) => {
      const elapsed = Date.now() - startTime;
      console.log(`[Fetch] Failed after ${elapsed}ms:`, error.message);
      throw error;
    });

  return Promise.race([fetchPromise, timeoutPromise]);
};

interface SupabaseProviderProps {
  children: ReactNode;
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

  const supabase = useMemo(
    () =>
      createClient(supabaseUrl, supabaseKey, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          lock: processLock,
        },
        global: {
          headers: {
            "x-client-info": "supabase-js-react-native",
          },
          fetch: customFetch,
        },
        db: {
          schema: "public",
        },
        realtime: {
          // Disable realtime to avoid websocket connection overhead
          params: {
            eventsPerSecond: 2,
          },
        },
      }),
    [supabaseUrl, supabaseKey]
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
    return () => {
      subscription?.remove();
    };
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};
