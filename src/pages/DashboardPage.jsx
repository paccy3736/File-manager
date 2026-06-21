import { MdDashboard } from "react-icons/md";

export default function DashboardPage() {
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
      <MdDashboard size={48} />
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text)" }}>Dashboard</h1>
      <p style={{ fontSize: 14 }}>This page is coming soon.</p>
    </div>
  );
}
