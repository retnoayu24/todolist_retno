"use client";

import {
  useCallback,
  useSyncExternalStore,
} from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  window.addEventListener(
    "local-storage-update",
    callback
  );

  return () => {
    window.removeEventListener("storage", callback);

    window.removeEventListener(
      "local-storage-update",
      callback
    );
  };
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const getSnapshot = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item !== null
        ? item
        : JSON.stringify(initialValue);
    } catch {
      return JSON.stringify(initialValue);
    }
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(() => {
    return JSON.stringify(initialValue);
  }, [initialValue]);

  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const value: T = JSON.parse(storedValue);

  const setValue = useCallback(
    (newValue: T | ((current: T) => T)) => {
      try {
        const currentItem =
          window.localStorage.getItem(key);

        const currentValue: T =
          currentItem !== null
            ? JSON.parse(currentItem)
            : initialValue;

        const valueToStore =
          newValue instanceof Function
            ? newValue(currentValue)
            : newValue;

        window.localStorage.setItem(
          key,
          JSON.stringify(valueToStore)
        );

        window.dispatchEvent(
          new Event("local-storage-update")
        );
      } catch (error) {
        console.error(
          "Gagal menyimpan ke localStorage:",
          error
        );
      }
    },
    [key, initialValue]
  );

  return [value, setValue] as const;
}