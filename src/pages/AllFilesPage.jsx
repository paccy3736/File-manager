import { MdFolder } from "react-icons/md";

export default function AllFilesPage() {
  return <PlaceholderPage title="All Files" icon={<MdFolder size={48} />} />;
}

function PlaceholderPage({ title, icon }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 16,
        color: "var(--color-text-muted)",
      }}
    >
      {icon}
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text)" }}>
        {title}
      </h1>
      <p style={{ fontSize: 14 }}>This page is coming soon.</p>
    </div>
  );
}
