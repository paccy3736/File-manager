import { NavLink } from "react-router-dom";
import {
  MdImage,
  MdVideoLibrary,
  MdDescription,
  MdFolder,
  MdDelete,
  MdFilePresent,
  MdDashboard,
  MdLogout,
  MdHelpOutline,
} from "react-icons/md";

const navItems = [
  {
    group: "Main",
    links: [
      { label: "Dashboard", path: "/file-manager/dashboard", icon: <MdDashboard size={20} /> },
    ],
  },
  {
    group: "File Manager",
    links: [
      { label: "Images",    path: "/file-manager/images",    icon: <MdImage size={20} /> },
      { label: "Videos",    path: "/file-manager/videos",    icon: <MdVideoLibrary size={20} /> },
      { label: "Documents", path: "/file-manager/documents", icon: <MdDescription size={20} /> },
      { label: "All Files", path: "/file-manager/all-files", icon: <MdFolder size={20} /> },
      { label: "Trash",     path: "/file-manager/trash",     icon: <MdDelete size={20} /> },
    ],
  },
];

function SidebarContent({ onClose }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            backgroundColor: "var(--color-primary)",
            width: 36,
            height: 36,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <MdFilePresent color="white" size={20} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 17, color: "var(--color-text)" }}>
          FileManager
        </span>
      </div>

      <nav style={{ padding: "12px", flex: 1 }}>
        {navItems.map((group) => (
          <div key={group.group} style={{ marginBottom: 8 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "8px 8px 4px",
              }}
            >
              {group.group}
            </p>
            <ul style={{ listStyle: "none" }}>
              {group.links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={onClose}
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 8,
                      borderLeft: isActive ? `3px solid var(--color-primary)` : "3px solid transparent",
                      textDecoration: "none",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: 14,
                      color: isActive ? "var(--color-primary)" : "var(--color-text)",
                      backgroundColor: isActive ? "#EEF2FF" : "transparent",
                      transition: "background 0.15s",
                    })}
                  >
                    <span style={{ color: "inherit", display: "flex" }}>{link.icon}</span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div style={{ padding: "16px" }}>
        <div style={{ backgroundColor: "#EEF2FF", borderRadius: 12, padding: "14px 16px" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", marginBottom: 8 }}>
            Storage
          </p>
          <div style={{ height: 6, backgroundColor: "#C7D2FE", borderRadius: 9999, marginBottom: 6 }}>
            <div
              style={{
                height: "100%",
                width: "55%",
                backgroundColor: "var(--color-primary)",
                borderRadius: 9999,
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>5.5 GB of 10 GB used</p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-border)", padding: "12px" }}>
        {[
          { label: "Sign Out", icon: <MdLogout size={18} /> },
          { label: "Help",     icon: <MdHelpOutline size={18} /> },
        ].map(({ label, icon }) => (
          <button
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 14,
              color: "var(--color-text-muted)",
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const sidebarStyles = {
    width: 240,
    backgroundColor: "var(--color-sidebar-bg)",
    borderRight: "1px solid var(--color-border)",
    flexShrink: 0,
    overflowY: "auto",
  };

  return (
    <>
      <aside
        className="sidebar-desktop"
        style={{ ...sidebarStyles, minHeight: "100vh", display: "none" }}
      >
        <SidebarContent onClose={() => {}} />
      </aside>

      <>
        {isOpen && (
          <div
            onClick={onClose}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 40 }}
            className="sidebar-backdrop"
          />
        )}
        <aside
          className="sidebar-mobile"
          style={{
            ...sidebarStyles,
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 50,
            transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
          }}
        >
          <SidebarContent onClose={onClose} />
        </aside>
      </>
    </>
  );
}
