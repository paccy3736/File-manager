import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdImage, MdVideoLibrary, MdDescription, MdInfoOutline } from "react-icons/md";
import FileCard from "../components/FileCard";
import FileModal from "../components/FileModal";
import { useFiles } from "../context/FilesContext";

export default function AllFilesPage() {
  const { activeFiles, images, videos, documents, searchQuery, markViewed } = useFiles();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  function openFile(file) {
    markViewed(file.id);
    setSelectedFile(file);
  }

  const folders = [
    { label: "Images",    count: images.length,    icon: <MdImage size={24} />,       bg: "var(--color-primary-light)", color: "var(--color-primary)", path: "/file-manager/images" },
    { label: "Videos",    count: videos.length,    icon: <MdVideoLibrary size={24} />, bg: "#ECFDF5",                    color: "#10B981",              path: "/file-manager/videos" },
    { label: "Documents", count: documents.length, icon: <MdDescription size={24} />, bg: "#FFFBEB",                    color: "#F59E0B",              path: "/file-manager/documents" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.5px" }}>Dashboard / All Files</h1>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 2 }}>Browse by folder and preview files instantly.</p>
      </div>

      {!searchQuery && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>Folders</h2>
          <div className="folders-grid">
            {folders.map(({ label, count, icon, bg, color, path }) => (
              <div
                key={label}
                onClick={() => navigate(path)}
                className="hover-card"
                style={{ backgroundColor: "white", border: "1px solid var(--color-border)", borderRadius: 16, padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}
              >
                <div style={{ backgroundColor: bg, color, width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)" }}>{label}</h3>
                  <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{count} files</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)" }}>
            {searchQuery ? `Results for "${searchQuery}" (${activeFiles.length})` : "Recent Files"}
          </h2>
          {!searchQuery && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--color-text-muted)" }}>
              <MdInfoOutline size={14} />Showing all files sorted by activity
            </div>
          )}
        </div>

        {activeFiles.length === 0 ? (
          <div style={{ padding: "64px 0", textAlign: "center", color: "var(--color-text-muted)", fontSize: 14, border: "1px dashed var(--color-border)", borderRadius: 16, backgroundColor: "white" }}>
            No files found matching "{searchQuery}".
          </div>
        ) : (
          <div className="files-grid">
            {activeFiles.map((file) => <FileCard key={file.id} file={file} onClick={() => openFile(file)} />)}
          </div>
        )}
      </section>

      {selectedFile && <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />}
    </div>
  );
}
