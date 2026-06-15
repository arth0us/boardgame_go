import { createContext, useContext, useState, type ReactNode } from 'react';

export interface AvailabilityPreference {
  id: string;
  label: string;
  startTime: { hour: number; minute: number };
  endTime: { hour: number; minute: number };
  location: string;
  categoryId: string;
}

export type AvailabilityPreferenceDraft = Omit<AvailabilityPreference, 'id'>;

interface UserPreferencesContextType {
  availabilityPresets: AvailabilityPreference[];
  availabilityPreference: AvailabilityPreference;
  activePreferenceId: string;
  selectAvailabilityPreference: (id: string) => void;
  addAvailabilityPreference: () => void;
  createAvailabilityPreference: (preference: AvailabilityPreferenceDraft) => void;
  deleteAvailabilityPreference: () => void;
  deleteAvailabilityPreferenceById: (id: string) => void;
  updateAvailabilityPreference: (updates: Partial<AvailabilityPreference>) => void;
  updateAvailabilityPreferenceById: (id: string, updates: Partial<AvailabilityPreferenceDraft>) => void;
}

const DEFAULT_PRESETS: AvailabilityPreference[] = [
  {
    id: 'after-class',
    label: '下課局',
    startTime: { hour: 18, minute: 0 },
    endTime: { hour: 22, minute: 0 },
    location: '實踐大學附近',
    categoryId: 'party',
  },
  {
    id: 'weekend',
    label: '周末局',
    startTime: { hour: 13, minute: 0 },
    endTime: { hour: 17, minute: 0 },
    location: '社區活動中心附近',
    categoryId: 'classic',
  },
  {
    id: 'strategy-night',
    label: '策略夜',
    startTime: { hour: 19, minute: 0 },
    endTime: { hour: 23, minute: 0 },
    location: '捷運大直站附近',
    categoryId: 'strategy',
  },
];

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [availabilityPresets, setAvailabilityPresets] = useState<AvailabilityPreference[]>(DEFAULT_PRESETS);
  const [activePreferenceId, setActivePreferenceId] = useState(DEFAULT_PRESETS[0].id);
  const availabilityPreference =
    availabilityPresets.find((preset) => preset.id === activePreferenceId) ?? availabilityPresets[0];

  const selectAvailabilityPreference = (id: string) => {
    setActivePreferenceId(id);
  };

  const addAvailabilityPreference = () => {
    const nextPreset: AvailabilityPreference = {
      ...availabilityPreference,
      id: `custom-${Date.now()}`,
      label: `新標籤 ${availabilityPresets.length + 1}`,
    };
    setAvailabilityPresets((prev) => [...prev, nextPreset]);
    setActivePreferenceId(nextPreset.id);
  };

  const createAvailabilityPreference = (preference: AvailabilityPreferenceDraft) => {
    const nextPreset: AvailabilityPreference = {
      ...preference,
      id: `custom-${Date.now()}`,
    };
    setAvailabilityPresets((prev) => [...prev, nextPreset]);
    setActivePreferenceId(nextPreset.id);
  };

  const deleteAvailabilityPreference = () => {
    if (availabilityPresets.length <= 1) {
      return;
    }

    const activeIndex = availabilityPresets.findIndex((preset) => preset.id === activePreferenceId);
    const nextPresets = availabilityPresets.filter((preset) => preset.id !== activePreferenceId);
    const fallbackIndex = Math.min(Math.max(activeIndex, 0), nextPresets.length - 1);
    const fallbackPreset = nextPresets[fallbackIndex] ?? nextPresets[0];

    setAvailabilityPresets(nextPresets);
    setActivePreferenceId(fallbackPreset.id);
  };

  const deleteAvailabilityPreferenceById = (id: string) => {
    if (availabilityPresets.length <= 1) {
      return;
    }

    const deleteIndex = availabilityPresets.findIndex((preset) => preset.id === id);
    const nextPresets = availabilityPresets.filter((preset) => preset.id !== id);

    if (id === activePreferenceId) {
      const fallbackIndex = Math.min(Math.max(deleteIndex, 0), nextPresets.length - 1);
      const fallbackPreset = nextPresets[fallbackIndex] ?? nextPresets[0];
      setActivePreferenceId(fallbackPreset.id);
    }

    setAvailabilityPresets(nextPresets);
  };

  const updateAvailabilityPreference = (updates: Partial<AvailabilityPreference>) => {
    setAvailabilityPresets((prev) =>
      prev.map((preset) =>
        preset.id === activePreferenceId
          ? {
              ...preset,
              ...updates,
              id: preset.id,
            }
          : preset,
      ),
    );
  };

  const updateAvailabilityPreferenceById = (id: string, updates: Partial<AvailabilityPreferenceDraft>) => {
    setAvailabilityPresets((prev) =>
      prev.map((preset) =>
        preset.id === id
          ? {
              ...preset,
              ...updates,
              id: preset.id,
            }
          : preset,
      ),
    );
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        availabilityPresets,
        availabilityPreference,
        activePreferenceId,
        selectAvailabilityPreference,
        addAvailabilityPreference,
        createAvailabilityPreference,
        deleteAvailabilityPreference,
        deleteAvailabilityPreferenceById,
        updateAvailabilityPreference,
        updateAvailabilityPreferenceById,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}
