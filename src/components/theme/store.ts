import {create} from "zustand";
import {mountStoreDevtool} from "simple-zustand-devtools";

interface ThemeStore {
    theme: 'light' | 'dark';
    switchMode: () => void;
}

export const useThemeStore = create<ThemeStore>(set => ({
    theme: 'light',
    switchMode: () => set(store => ({ ...store, theme: store.theme == 'light' ? 'dark' : 'light' })),
}));


mountStoreDevtool("Theme store", useThemeStore);

export default useThemeStore;