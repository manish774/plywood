import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from "react";
import * as settingsApi from "../api/settings";
import { DEFAULT_SETTINGS } from "../config/site";
import type { Settings, SettingsInput } from "../types/models";

export interface SettingsContextValue {
  settings: Settings;
  loading: boolean;
  update: (payload: SettingsInput) => Promise<Settings>;
  refresh: () => Promise<void>;
}

const fallbackSettings: Settings = { _id: "", ...DEFAULT_SETTINGS };

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(fallbackSettings);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await settingsApi.getSettings();
      setSettings(data);
    } catch {
      // Keep the fallback values — a shop with no reachable backend still
      // gets a usable (if unbranded) site instead of blank text everywhere.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const update = useCallback(async (payload: SettingsInput) => {
    const data = await settingsApi.updateSettings(payload);
    setSettings(data);
    return data;
  }, []);

  const value: SettingsContextValue = { settings, loading, update, refresh };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
}
