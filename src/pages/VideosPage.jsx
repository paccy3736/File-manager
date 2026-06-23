import { useState } from "react";
import { MdAdd, MdChevronRight, MdClose } from "react-icons/md";
import FileCard from "../components/FileCard";
import FileModal from "../components/FileModal";
import { useFiles } from "../context/FilesContext";

export default function VideosPage() {
  const { videos, recentFiles, searchQuery, markViewed, addFile } = useFiles();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");

  function openVideo(video) {
    markViewed(video.id);
    setSelectedVideo(video);
  }

  function handleAddFile(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    let filename = newName.trim();
    if (![".mp4", ".mov", ".avi"].some((ext) => filename.toLowerCase().endsWith(ext))) filename += ".mp4";
    addFile({
      name: filename,
      type: "video",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      size: `${(Math.random() * 30 + 5).toFixed(1)} MB`,
      duration: "00:15",
    });
    setNewName("");
    setShowAddForm(false);
  }

  const recentVideos = recentFiles.filter((f) => f.type === "video").slice(0, 6);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.5px" }}>Videos</h1>
        <div className="page-header-actions">
          <button
            onClick={() => setShowAddForm(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "var(--color-primary)", color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(58,87,232,0.15)", transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-primary-hover)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-primary)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <MdAdd size={18} />Add Video
          </button>
        </div>
      </div>

      {showAddForm && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 90, padding: 16 }} onClick={() => setShowAddForm(false)}>
          <form onSubmit={handleAddFile} onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "white", padding: 24, borderRadius: 16, width: "100%", maxWidth: 400, boxShadow: "0 20px 40px rgba(0,0,0,0.15)", border: "1px solid var(--color-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)" }}>Add New Video</h3>
              <button type="button" onClick={() => setShowAddForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}><MdClose size={20} /></button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="videoName" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", marginBottom: 6 }}>Video File Name</label>
              <input id="videoName" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. drone-shot.mp4" required autoFocus style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 14, outline: "none", color: "var(--color-text)" }} />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setShowAddForm(false)} style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid var(--color-border)", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>Cancel</button>
              <button type="submit" style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "var(--color-primary)", color: "white", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Add File</button>
            </div>
          </form>
        </div>
      )}

      {!searchQuery && recentVideos.length > 0 && (
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)" }}>Recently Viewed</h2>
            <button style={{ display: "flex", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--color-primary)", fontWeight: 600 }}>
              View all <MdChevronRight size={18} />
            </button>
          </div>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
            {recentVideos.map((vid) => (
              <div key={vid.id} className="recent-card-wrapper">
                <FileCard file={vid} onClick={() => openVideo(vid)} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>
          {searchQuery ? `Results for "${searchQuery}" (${videos.length})` : "All Videos"}
        </h2>
        {videos.length === 0 ? (
          <div style={{ padding: "64px 0", textAlign: "center", color: "var(--color-text-muted)", fontSize: 14, border: "1px dashed var(--color-border)", borderRadius: 16, backgroundColor: "white" }}>
            No videos match "{searchQuery}".
          </div>
        ) : (
          <div className="files-grid">
            {videos.map((vid) => <FileCard key={vid.id} file={vid} onClick={() => openVideo(vid)} />)}
          </div>
        )}
      </section>

      {selectedVideo && <FileModal file={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
}
