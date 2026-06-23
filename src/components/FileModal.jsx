import { useEffect } from "react";
import { MdClose, MdDownload, MdCalendarToday, MdAccessTime, MdDescription } from "react-icons/md";

function timeAgo(dateString) {
  if (!dateString) return "never";
  const diff = Date.now() - new Date(dateString).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m} min ago`;
  if (h < 24) return `${h} hr ago`;
  if (d === 1) return "yesterday";
  return `${d} days ago`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try { return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); }
  catch { return dateStr; }
}

export default function FileModal({ file, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!file) return null;

  const { name, type, url, createdAt, lastOpenedAt, size } = file;

  let content = null;
  if (type === "image") {
    content = <img src={url} alt={name} style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain", display: "block" }} />;
  } else if (type === "video") {
    content = <video src={url} controls autoPlay style={{ maxWidth: "100%", maxHeight: "60vh", width: "100%", backgroundColor: "#000", display: "block" }} />;
  } else if (type === "document") {
    content = (
      <div style={{ width: "100%", maxHeight: "55vh", overflowY: "auto", backgroundColor: "#FFFFFF", padding: "24px 32px", borderRadius: 8, border: "1px solid var(--color-border)", color: "#334155", lineHeight: "1.6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "2px solid #F1F5F9", paddingBottom: 16, marginBottom: 16 }}>
          <MdDescription size={32} color="var(--color-primary)" />
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)" }}>{name}</h3>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>Size: {size || "—"}</p>
          </div>
        </div>
        <p style={{ fontSize: 14, whiteSpace: "pre-wrap", color: "#334155" }}>{file.content || "No preview available."}</p>
      </div>
    );
  }

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={`Preview: ${name}`} className="modal-backdrop" style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.75)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div onClick={(e) => e.stopPropagation()} className="modal-panel">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid var(--color-border)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: "calc(100% - 90px)" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={name}>{name}</span>
            <span style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 9999, textTransform: "uppercase" }}>{type}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {url && (
              <a href={url} download={name} target="_blank" rel="noreferrer" aria-label="Download file"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, border: "1px solid var(--color-border)", color: "var(--color-text-muted)", textDecoration: "none", transition: "background-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F1F5F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <MdDownload size={18} />
              </a>
            )}
            <button onClick={onClose} aria-label="Close preview"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, border: "1px solid var(--color-border)", background: "none", cursor: "pointer", color: "var(--color-text-muted)", transition: "background-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F1F5F9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <MdClose size={18} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "hidden", backgroundColor: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0, padding: type === "document" ? "24px" : "0" }}>
          {content}
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--color-border)", display: "flex", gap: 24, flexShrink: 0, flexWrap: "wrap", backgroundColor: "#FFFFFF" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-text-muted)" }}>
            <MdCalendarToday size={14} />Created: {formatDate(createdAt)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-text-muted)" }}>
            <MdAccessTime size={14} />Opened {timeAgo(lastOpenedAt)}
          </span>
          {size && <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 500, color: "var(--color-text-muted)" }}>Size: {size}</span>}
        </div>
      </div>
    </div>
  );
}
