import { NavLink } from "react-router-dom";
import {
  MdImage, MdVideoLibrary, MdDescription, MdFolder,
  MdDelete, MdDashboard, MdLogout, MdHelp,
  MdShoppingCart, MdFavorite, MdNotifications,
} from "react-icons/md";
import { useFiles } from "../context/FilesContext";

function SidebarContent({ onClose }) {
  const { allActiveFilesCount } = useFiles();
  const mock = (label) => alert(`${label} action triggered!`);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "var(--color-sidebar-bg)" }}>
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0Z" fill="#3A57E8" />
          <path d="M9 15C9 11.6863 11.6863 9 15 9C18.3137 9 21 11.6863 21 15C21 18.3137 18.3137 21 15 21C11.6863 21 9 18.3137 9 15Z" fill="white" />
          <path d="M12 15C12 13.3431 13.3431 12 15 12C16.6569 12 18 13.3431 18 15C18 16.6569 16.6569 18 15 18C13.3431 18 12 16.6569 12 15Z" fill="#3A57E8" />
        </svg>
        <span style={{ fontWeight: 800, fontSize: 20, color: "var(--color-text)", letterSpacing: "-0.5px" }}>Hope UI</span>
      </div>

      <div style={{ padding: "12px 24px 20px 24px", display: "flex", flexDirection: "column", alignItems: "center", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ width: 82, height: 82, borderRadius: 18, border: "3px solid #E0E7FF", backgroundColor: "#3A57E8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-1px", userSelect: "none" }}>IK</span>
        </div>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 2 }}>Ikuzwe</h4>
        <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 12 }}>@ikuzwe</p>

        <div style={{ display: "flex", gap: 10 }}>
          {[
            { icon: <MdShoppingCart size={16} />, label: "Cart" },
            { icon: <MdFavorite size={15} />,     label: "Favorites" },
            { icon: <MdNotifications size={16} />, label: "Notifications", dot: true },
          ].map(({ icon, label, dot }) => (
            <button
              key={label}
              onClick={() => mock(label)}
              style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "var(--color-primary-light)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", position: "relative", transition: "transform 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {icon}
              {dot && <span style={{ position: "absolute", top: 2, right: 2, width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--color-danger)" }} />}
            </button>
          ))}
        </div>
      </div>

      <nav style={{ padding: "16px 0", flex: 1, overflowY: "auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 24px 6px 24px" }}>File Manager</p>
        <NavLink to="/file-manager/all-files" onClick={onClose} className="nav-link-item">
          <MdDashboard size={20} />
          Dashboard
        </NavLink>

        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "16px 24px 6px 24px" }}>Pages</p>
        <NavLink to="/file-manager/images" onClick={onClose} className="nav-link-item">
          <MdImage size={20} />Image
        </NavLink>
        <NavLink to="/file-manager/videos" onClick={onClose} className="nav-link-item">
          <MdVideoLibrary size={20} />Video
        </NavLink>
        <NavLink to="/file-manager/documents" onClick={onClose} className="nav-link-item">
          <MdDescription size={20} />Document
        </NavLink>
        <NavLink to="/file-manager/all-files" onClick={onClose} className="nav-link-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <MdFolder size={20} />All Files
          </div>
          {allActiveFilesCount > 0 && (
            <span style={{ backgroundColor: "#F97316", color: "#FFFFFF", fontSize: 11, fontWeight: 700, borderRadius: 9999, padding: "1px 8px", marginRight: 4 }}>
              {allActiveFilesCount}
            </span>
          )}
        </NavLink>
        <NavLink to="/file-manager/trash" onClick={onClose} className="nav-link-item">
          <MdDelete size={20} />Trash
        </NavLink>

        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "16px 24px 6px 24px" }}>Other</p>
        <button onClick={() => mock("Sign Out")} className="nav-link-item" style={{ border: "none", background: "none", width: "calc(100% - 24px)", textAlign: "left", cursor: "pointer" }}>
          <MdLogout size={20} />Sign Out
        </button>
        <button onClick={() => mock("Help")} className="nav-link-item" style={{ border: "none", background: "none", width: "calc(100% - 24px)", textAlign: "left", cursor: "pointer" }}>
          <MdHelp size={20} />Help
        </button>
      </nav>
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const sidebarStyles = {
    width: 260,
    backgroundColor: "var(--color-sidebar-bg)",
    borderRight: "1px solid var(--color-border)",
    flexShrink: 0,
    overflowY: "auto",
  };

  return (
    <>
      <aside className="sidebar-desktop" style={{ ...sidebarStyles, minHeight: "100vh" }}>
        <SidebarContent onClose={() => {}} />
      </aside>

      <>
        {isOpen && (
          <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", zIndex: 40 }} className="sidebar-backdrop" />
        )}
        <aside
          className="sidebar-mobile"
          style={{ ...sidebarStyles, position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50, transform: isOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <SidebarContent onClose={onClose} />
        </aside>
      </>
    </>
  );
}
