import { useState } from "react";
import { MdInfoOutline, MdDeleteOutline } from "react-icons/md";
import FileCard from "../components/FileCard";
import FileModal from "../components/FileModal";
import { useFiles } from "../context/FilesContext";

export default function TrashPage() {
  const { trashFiles, emptyTrash, markViewed } = useFiles();
  const [selectedFile, setSelectedFile] = useState(null);

  function openFile(file) {
    markViewed(file.id);
    setSelectedFile(file);
  }

  function handleEmptyTrash() {
    if (window.confirm("Permanently delete all items in Trash? This cannot be undone.")) {
      emptyTrash();
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.5px" }}>Trash</h1>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 2 }}>Recover deleted files or remove them permanently.</p>
        </div>
        {trashFiles.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "#FEF2F2", color: "var(--color-danger)", border: "1px solid #FEE2E2", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
          >
            <MdDeleteOutline size={18} />Empty Trash
          </button>
        )}
      </div>

      {trashFiles.length > 0 && (
        <div style={{ backgroundColor: "#EFF6FF", border: "1px solid #DBEAFE", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 28, color: "#1E40AF", fontSize: 13 }}>
          <MdInfoOutline size={18} color="#1E40AF" style={{ flexShrink: 0 }} />
          <span>Items stay here until you empty the trash or delete them individually. Use the ⋮ menu on each card to restore.</span>
        </div>
      )}

      <section>
        {trashFiles.length === 0 ? (
          <div style={{ padding: "80px 0", textAlign: "center", color: "var(--color-text-muted)", border: "1px dashed var(--color-border)", borderRadius: 16, backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MdDeleteOutline size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>Trash is empty</h3>
              <p style={{ fontSize: 13 }}>Deleted files will appear here for recovery.</p>
            </div>
          </div>
        ) : (
          <div className="files-grid">
            {trashFiles.map((file) => <FileCard key={file.id} file={file} onClick={() => openFile(file)} />)}
          </div>
        )}
      </section>

      {selectedFile && <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />}
    </div>
  );
}
