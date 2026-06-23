import { useState } from "react";
import { MdAdd, MdChevronRight, MdClose } from "react-icons/md";
import FileCard from "../components/FileCard";
import FileModal from "../components/FileModal";
import { useFiles } from "../context/FilesContext";

export default function DocumentsPage() {
  const { documents, recentFiles, searchQuery, markViewed, addFile } = useFiles();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");

  function openDoc(doc) {
    markViewed(doc.id);
    setSelectedDoc(doc);
  }

  function handleAddFile(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    let filename = newName.trim();
    const knownExts = [".pdf", ".docx", ".xlsx", ".txt", ".xls", ".doc"];
    if (!knownExts.some((ext) => filename.toLowerCase().endsWith(ext))) filename += ".pdf";
    addFile({
      name: filename,
      type: "document",
      size: `${(Math.random() * 5 + 0.1).toFixed(1)} MB`,
      content: newContent.trim() || `Document content for "${filename}" generated on ${new Date().toLocaleDateString()}.`,
    });
    setNewName("");
    setNewContent("");
    setShowAddForm(false);
  }

  const recentDocs = recentFiles.filter((f) => f.type === "document").slice(0, 6);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.5px" }}>Documents</h1>
        <div className="page-header-actions">
          <button
            onClick={() => setShowAddForm(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "var(--color-primary)", color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(58,87,232,0.15)", transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-primary-hover)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-primary)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <MdAdd size={18} />Add Document
          </button>
        </div>
      </div>

      {showAddForm && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 90, padding: 16 }} onClick={() => setShowAddForm(false)}>
          <form onSubmit={handleAddFile} onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "white", padding: 24, borderRadius: 16, width: "100%", maxWidth: 440, boxShadow: "0 20px 40px rgba(0,0,0,0.15)", border: "1px solid var(--color-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)" }}>Add New Document</h3>
              <button type="button" onClick={() => setShowAddForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}><MdClose size={20} /></button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="docName" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", marginBottom: 6 }}>Document Name</label>
              <input id="docName" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Q3-report.pdf" required autoFocus style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 14, outline: "none", color: "var(--color-text)" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="docContent" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", marginBottom: 6 }}>Content Preview Text</label>
              <textarea id="docContent" value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Type the document contents here..." rows={4} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 14, outline: "none", color: "var(--color-text)", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setShowAddForm(false)} style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid var(--color-border)", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>Cancel</button>
              <button type="submit" style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "var(--color-primary)", color: "white", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Add File</button>
            </div>
          </form>
        </div>
      )}

      {!searchQuery && recentDocs.length > 0 && (
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)" }}>Recently Viewed</h2>
            <button style={{ display: "flex", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--color-primary)", fontWeight: 600 }}>
              View all <MdChevronRight size={18} />
            </button>
          </div>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
            {recentDocs.map((doc) => (
              <div key={doc.id} className="recent-card-wrapper">
                <FileCard file={doc} onClick={() => openDoc(doc)} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>
          {searchQuery ? `Results for "${searchQuery}" (${documents.length})` : "All Documents"}
        </h2>
        {documents.length === 0 ? (
          <div style={{ padding: "64px 0", textAlign: "center", color: "var(--color-text-muted)", fontSize: 14, border: "1px dashed var(--color-border)", borderRadius: 16, backgroundColor: "white" }}>
            No documents match "{searchQuery}".
          </div>
        ) : (
          <div className="files-grid">
            {documents.map((doc) => <FileCard key={doc.id} file={doc} onClick={() => openDoc(doc)} />)}
          </div>
        )}
      </section>

      {selectedDoc && <FileModal file={selectedDoc} onClose={() => setSelectedDoc(null)} />}
    </div>
  );
}
