import { createContext, useContext, useState, useCallback } from "react";
import initialFiles from "../data/files";

const FilesContext = createContext(null);

export function FilesProvider({ children }) {
  const [files, setFiles] = useState(initialFiles);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [textSize, setTextSize] = useState("medium");

  // Updates lastOpenedAt in the master list, then prepends to recently-viewed.
  // Runs inside setFiles to avoid reading stale closure state.
  const markViewed = useCallback((id) => {
    const now = new Date().toISOString();
    setFiles((prev) => {
      const updated = prev.map((f) => (f.id === id ? { ...f, lastOpenedAt: now } : f));
      const viewed = updated.find((f) => f.id === id);
      if (viewed) {
        setRecentlyViewed((r) => [{ ...viewed }, ...r.filter((f) => f.id !== id)].slice(0, 6));
      }
      return updated;
    });
  }, []);

  const addFile = useCallback((file) => {
    setFiles((prev) => [
      { id: `${file.type}-${Date.now()}`, inTrash: false, createdAt: new Date().toISOString().split("T")[0], lastOpenedAt: new Date().toISOString(), ...file },
      ...prev,
    ]);
  }, []);

  const moveToTrash = useCallback((id) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, inTrash: true } : f)));
    setRecentlyViewed((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const restoreFromTrash = useCallback((id) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, inTrash: false } : f)));
  }, []);

  const deletePermanently = useCallback((id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setRecentlyViewed((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const emptyTrash = useCallback(() => {
    setFiles((prev) => prev.filter((f) => !f.inTrash));
    setRecentlyViewed((prev) => prev.filter((f) => !f.inTrash));
  }, []);

  const activeFiles = files.filter((f) => !f.inTrash);

  const searchFiltered = searchQuery.trim()
    ? activeFiles.filter((f) => f.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : activeFiles;

  const recentFiles =
    recentlyViewed.length > 0
      ? recentlyViewed.filter((f) => !f.inTrash)
      : [...activeFiles].sort((a, b) => new Date(b.lastOpenedAt) - new Date(a.lastOpenedAt)).slice(0, 6);

  return (
    <FilesContext.Provider value={{
      files,
      activeFiles: searchFiltered,
      allActiveFilesCount: activeFiles.length,
      images:     searchFiltered.filter((f) => f.type === "image"),
      videos:     searchFiltered.filter((f) => f.type === "video"),
      documents:  searchFiltered.filter((f) => f.type === "document"),
      trashFiles: files.filter((f) => f.inTrash),
      recentFiles,
      searchQuery, setSearchQuery,
      textSize,    setTextSize,
      markViewed, addFile, moveToTrash, restoreFromTrash, deletePermanently, emptyTrash,
    }}>
      {children}
    </FilesContext.Provider>
  );
}

export function useFiles() {
  const ctx = useContext(FilesContext);
  if (!ctx) throw new Error("useFiles must be used inside <FilesProvider>");
  return ctx;
}

export const useImages = useFiles;
