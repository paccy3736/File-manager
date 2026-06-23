import { useState } from "react";
import {
  MdMoreVert, MdDelete, MdRestore, MdDeleteForever,
  MdImage as ImgIcon, MdVideoLibrary as VidIcon, MdDescription as DocIcon,
} from "react-icons/md";
import { useFiles } from "../context/FilesContext";

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

export default function FileCard({ file, onClick }) {
  const { id, name, type, url, createdAt, lastOpenedAt, inTrash, duration } = file;
  const { moveToTrash, restoreFromTrash, deletePermanently } = useFiles();
  const [showDropdown, setShowDropdown] = useState(false);

  let typeIcon = <ImgIcon size={16} color="var(--color-primary)" />;
  let cardPreview = null;

  if (type === "image") {
    typeIcon = <ImgIcon size={16} color="#3A57E8" />;
    cardPreview = <img src={url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />;
  } else if (type === "video") {
    typeIcon = <VidIcon size={16} color="#10B981" />;
    cardPreview = (
      <div style={{ position: "relative", width: "100%", height: "100%", backgroundColor: "#0F172A", overflow: "hidden" }}>
        <img src={`https://picsum.photos/seed/${id}/400/300`} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "rgba(58, 87, 232, 0.9)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid white", marginLeft: 3 }} />
          </div>
        </div>
        {duration && (
          <span style={{ position: "absolute", bottom: 8, right: 8, backgroundColor: "rgba(0,0,0,0.75)", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 600 }}>{duration}</span>
        )}
      </div>
    );
  } else if (type === "document") {
    typeIcon = <DocIcon size={16} color="#F59E0B" />;
    let docBg = "#FFFBEB", docLabel = "DOC", iconColor = "#D97706";
    if (name.endsWith(".pdf"))  { docBg = "#FEF2F2"; docLabel = "PDF"; iconColor = "#DC2626"; }
    if (name.endsWith(".xlsx") || name.endsWith(".xls")) { docBg = "#F0FDF4"; docLabel = "XLS"; iconColor = "#16A34A"; }
    cardPreview = (
      <div style={{ width: "100%", height: "100%", backgroundColor: docBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <DocIcon size={48} color={iconColor} />
        <span style={{ fontSize: 10, fontWeight: 700, color: iconColor, backgroundColor: "white", padding: "2px 8px", borderRadius: 4, border: `1px solid ${iconColor}40` }}>{docLabel}</span>
      </div>
    );
  }

  return (
    <div className="hover-card" style={{ backgroundColor: "var(--color-card)", borderRadius: 16, border: "1px solid var(--color-border)", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 8, right: 8, zIndex: 5 }}>
        <button
          onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
          aria-label="File actions"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid var(--color-border)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}
        >
          <MdMoreVert size={16} color="var(--color-text)" />
        </button>

        {showDropdown && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={(e) => { e.stopPropagation(); setShowDropdown(false); }} />
            <div className="dropdown-menu" style={{ position: "absolute", top: 32, right: 0, backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 20, minWidth: 140, overflow: "hidden" }}>
              {!inTrash ? (
                <button
                  onClick={(e) => { e.stopPropagation(); moveToTrash(id); setShowDropdown(false); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, color: "var(--color-danger)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <MdDelete size={14} />Move to Trash
                </button>
              ) : (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); restoreFromTrash(id); setShowDropdown(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, color: "var(--color-success)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ECFDF5")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <MdRestore size={14} />Restore File
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deletePermanently(id); setShowDropdown(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, color: "var(--color-danger)", fontWeight: 600 }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <MdDeleteForever size={14} />Delete Forever
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div role="button" tabIndex={0} onClick={onClick} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()} style={{ cursor: "pointer" }}>
        <div style={{ height: 160, overflow: "hidden", backgroundColor: "#F3F4F6", position: "relative" }}>
          {cardPreview}
        </div>
        <div style={{ padding: "14px 16px" }}>
          <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 4 }}>Created on {formatDate(createdAt)}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            {typeIcon}
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }} title={name}>{name}</span>
          </div>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            You opened <span style={{ color: "var(--color-primary)", fontWeight: 500 }}>{timeAgo(lastOpenedAt)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
