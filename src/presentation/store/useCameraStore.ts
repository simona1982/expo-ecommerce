import { create } from "zustand";


interface TemporalCameraStoreState {
    selectedImages: string[];

    addSelectedImage: (images: string) => void;
    clearImages: () => void;
}

export const useCameraStore = create<TemporalCameraStoreState>()((set, get) => ({
    selectedImages: [],
    addSelectedImage: (image) => {
        set((state) => ({ selectedImages: [...state.selectedImages, image] }))
    },
    clearImages: () => set({ selectedImages: [] })
}))
