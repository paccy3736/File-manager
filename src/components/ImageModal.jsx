import { useEffect } from "react";
import { MdClose, MdDownload, MdCalendarToday, MdAccessTime } from "react-icons/md";

function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const minutes = Math.floor(diffMs / 60000);
  const hours   = Math.floor(diffMs / 3600000);
  const days    = Math.floor(diffMs / 86400000);
  if (minutes < 1)  return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24)   return `${hours} hr ago`;
  if (days === 1)   return "yesterday";
  return `${days} days ago`;
}

export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!image) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${image.name}`}
      className="modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.70)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal-panel">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--color-border)",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--color-text)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "calc(100% - 80px)",
            }}
          >
            {image.name}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a
              href={image.url}
              download={image.name}
              target="_blank"
              rel="noreferrer"
              aria-label="Download image"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              <MdDownload size={18} />
            </a>

            <button
              onClick={onClose}
              aria-label="Close preview"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid var(--color-border)",
                background: "none",
                cursor: "pointer",
                color: "var(--color-text-muted)",
              }}
            >
              <MdClose size={18} />
            </button>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflow: "hidden",
            backgroundColor: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          <img
            src={image.url}
            alt={image.name}
            style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain", display: "block" }}
          />
        </div>

        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            gap: 24,
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-text-muted)" }}>
            <MdCalendarToday size={14} />
            Created on {new Date(image.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-text-muted)" }}>
            <MdAccessTime size={14} />
            You opened {timeAgo(image.lastOpenedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
