import { createContext, useContext, useState, useCallback } from "react";
import imagesData from "../data/images";

const ImagesContext = createContext(null);

export function ImagesProvider({ children }) {
  const [images, setImages] = useState(imagesData);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Updates lastOpenedAt and pushes the image to the front of the recently-viewed list
  const markViewed = useCallback((id) => {
    const now = new Date().toISOString();

    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, lastOpenedAt: now } : img))
    );

    setRecentlyViewed((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      const updated = images.find((img) => img.id === id);
      if (!updated) return prev;
      return [{ ...updated, lastOpenedAt: now }, ...filtered].slice(0, 6);
    });
  }, [images]);

  const filteredImages = searchQuery.trim()
    ? images.filter((img) =>
        img.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : images;

  // Falls back to top-6 by lastOpenedAt until the user opens an image
  const recentImages =
    recentlyViewed.length > 0
      ? recentlyViewed
      : [...images]
          .sort((a, b) => new Date(b.lastOpenedAt) - new Date(a.lastOpenedAt))
          .slice(0, 6);

  return (
    <ImagesContext.Provider value={{ images, filteredImages, recentImages, searchQuery, setSearchQuery, markViewed }}>
      {children}
    </ImagesContext.Provider>
  );
}

export function useImages() {
  const ctx = useContext(ImagesContext);
  if (!ctx) throw new Error("useImages must be used inside <ImagesProvider>");
  return ctx;
}
