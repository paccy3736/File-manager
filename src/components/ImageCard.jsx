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

export default function ImageCard({ image, onClick }) {
  const { name, url, createdAt, lastOpenedAt } = image;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Preview ${name}`}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      style={{
        backgroundColor: "var(--color-card)",
        borderRadius: 12,
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(58,87,232,0.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={{ height: 160, overflow: "hidden", backgroundColor: "#F3F4F6" }}>
        <img
          src={url}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      </div>

      <div style={{ padding: "12px 14px" }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-text)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: 4,
          }}
        >
          {name}
        </p>
        <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 2 }}>
          Created: {createdAt}
        </p>
        <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
          Opened {timeAgo(lastOpenedAt)}
        </p>
      </div>
    </div>
  );
}
