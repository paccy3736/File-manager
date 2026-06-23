import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdShoppingCart, MdNotifications, MdMenu, MdSearch,
  MdArrowBack, MdKeyboardArrowDown, MdKeyboardArrowRight,
  MdLogout, MdSettings, MdPerson, MdBookmarks,
} from "react-icons/md";
import { useFiles } from "../context/FilesContext";

function Dropdown({ children, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "6px", borderRadius: 8 }}
      >
        {children}
      </button>

      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
          <div className="dropdown-menu" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, minWidth: 180, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 20, overflow: "hidden" }}>
            {items.map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--color-text)", textAlign: "left" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F1F5F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Hover-triggered breadcrumb dropdown with 120ms hide grace period
function BreadcrumbHover({ label, items }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  function show() { clearTimeout(timerRef.current); setOpen(true); }
  function hide() { timerRef.current = setTimeout(() => setOpen(false), 120); }

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }} onMouseEnter={show} onMouseLeave={hide}>
      <span style={{ color: "var(--color-text-muted)", cursor: "default", fontSize: 14, padding: "2px 0", borderBottom: open ? "1px dashed var(--color-primary)" : "1px dashed transparent", transition: "border-color 0.15s" }}>
        {label}
      </span>

      {open && (
        <div
          onMouseEnter={show}
          onMouseLeave={hide}
          style={{ position: "absolute", top: "calc(100% + 10px)", left: 0, backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, minWidth: 200, boxShadow: "0 12px 32px rgba(0,0,0,0.1)", zIndex: 30, overflow: "hidden", animation: "dropdownEnter 0.15s ease-out" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px 10px 16px", borderBottom: "1px solid var(--color-border)" }}>
            <MdBookmarks size={18} color="var(--color-primary)" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-primary)" }}>{label}</span>
          </div>

          {items.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "11px 16px", background: "none", border: "none", cursor: item.onClick ? "pointer" : "default", fontSize: 14, color: "var(--color-text-muted)", textAlign: "left", transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F1F5F9"; e.currentTarget.style.color = "var(--color-text)"; e.currentTarget.style.paddingLeft = "20px"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-text-muted)"; e.currentTarget.style.paddingLeft = "16px"; }}
            >
              <span>{item.label}</span>
              {item.hasArrow && <MdKeyboardArrowRight size={16} color="var(--color-text-muted)" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery, textSize, setTextSize } = useFiles();

  useEffect(() => {
    document.body.className = `text-size-${textSize}`;
  }, [textSize]);

  function handleSearch(e) {
    setSearchQuery(e.target.value);
    if (location.pathname === "/" ) navigate("/file-manager/all-files");
  }

  let pageLabel = "Image";
  if (location.pathname === "/file-manager/videos") pageLabel = "Video";
  else if (location.pathname === "/file-manager/documents") pageLabel = "Document";
  else if (location.pathname === "/file-manager/all-files") pageLabel = "All Files";
  else if (location.pathname === "/file-manager/trash") pageLabel = "Trash";

  const mock = (action) => alert(`${action} clicked!`);

  const cartItems = [
    { label: "View Cart", icon: <MdShoppingCart size={16} />, onClick: () => mock("View Cart") },
    { label: "Checkout",  icon: <MdShoppingCart size={16} />, onClick: () => mock("Checkout") },
  ];

  const profileItems = [
    { label: "Profile",  icon: <MdPerson size={16} />,   onClick: () => mock("Profile") },
    { label: "Settings", icon: <MdSettings size={16} />, onClick: () => mock("Settings") },
    { label: "Logout",   icon: <MdLogout size={16} />,   onClick: () => mock("Logout") },
  ];

  return (
    <header style={{ height: 64, backgroundColor: "var(--color-card)", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", padding: "0 24px", gap: 16, position: "sticky", top: 0, zIndex: 10 }}>
      <button onClick={onMenuClick} className="hamburger-btn" aria-label="Open sidebar" style={{ background: "none", border: "none", cursor: "pointer", alignItems: "center", padding: 6, borderRadius: 8, color: "var(--color-text)" }}>
        <MdMenu size={24} />
      </button>

      <button onClick={() => navigate(-1)} title="Go back" style={{ backgroundColor: "var(--color-primary-light)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-primary)" }}>
        <MdArrowBack size={18} />
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }} className="breadcrumb-nav">
        <span style={{ fontWeight: 700, color: "var(--color-text)" }}>{pageLabel}</span>
        <span style={{ color: "var(--color-text-muted)" }}>/</span>
        <button onClick={() => navigate("/file-manager/all-files")} style={{ background: "none", border: "none", color: "var(--color-text-muted)", cursor: "pointer", fontSize: 14, padding: 0 }}>
          Home
        </button>
        <span style={{ color: "var(--color-text-muted)" }}>/</span>
        <BreadcrumbHover
          label="Pages"
          items={[
            { label: "Image",     onClick: () => navigate("/file-manager/images") },
            { label: "Video",     onClick: () => navigate("/file-manager/videos") },
            { label: "Document",  onClick: () => navigate("/file-manager/documents") },
            { label: "All Files", onClick: () => navigate("/file-manager/all-files") },
            { label: "Trash",     onClick: () => navigate("/file-manager/trash") },
          ]}
        />
        <span style={{ color: "var(--color-text-muted)" }}>/</span>
        <BreadcrumbHover
          label="Elements"
          items={[
            { label: "Components" },
            { label: "UI Color" },
            { label: "Widgets",  hasArrow: true },
            { label: "Map",      hasArrow: true },
            { label: "Form",     hasArrow: true },
            { label: "Table",    hasArrow: true },
            { label: "Icons",    hasArrow: true },
          ]}
        />
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", backgroundColor: "#F1F5F9", borderRadius: 8, padding: 2, gap: 2 }}>
          {[["small", 11], ["medium", 13], ["large", 15]].map(([size, fs]) => (
            <button
              key={size}
              onClick={() => setTextSize(size)}
              style={{ padding: "4px 10px", fontSize: fs, fontWeight: 700, borderRadius: 6, border: "none", cursor: "pointer", backgroundColor: textSize === size ? "var(--color-primary)" : "transparent", color: textSize === size ? "white" : "var(--color-text-muted)", transition: "all 0.15s" }}
            >
              A
            </button>
          ))}
        </div>

        <div className="navbar-search" style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#F8FAFC", border: "1px solid var(--color-border)", borderRadius: 10, padding: "6px 12px" }}>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            aria-label="Search files"
            style={{ border: "none", background: "none", outline: "none", fontSize: 14, color: "var(--color-text)", width: "100%" }}
          />
          <MdSearch size={18} color="var(--color-text-muted)" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Dropdown items={cartItems}>
            <div style={{ position: "relative", padding: 4 }}>
              <MdShoppingCart size={22} color="var(--color-text-muted)" />
              <span style={{ position: "absolute", top: 0, right: 0, backgroundColor: "var(--color-primary)", color: "white", fontSize: 9, fontWeight: 700, width: 14, height: 14, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
            </div>
          </Dropdown>

          <Dropdown items={[{ label: "No new notifications", icon: <MdNotifications size={16} /> }]}>
            <div style={{ position: "relative", padding: 4 }}>
              <MdNotifications size={22} color="var(--color-text-muted)" />
              <span style={{ position: "absolute", top: 0, right: 0, backgroundColor: "#EF4444", color: "white", fontSize: 9, fontWeight: 700, width: 14, height: 14, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>5</span>
            </div>
          </Dropdown>

          <Dropdown items={profileItems}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", backgroundColor: "#3A57E8", border: "1.5px solid var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#FFFFFF", userSelect: "none" }}>IK</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)" }} className="profile-name">Ikuzwe</span>
              <MdKeyboardArrowDown size={18} color="var(--color-text-muted)" />
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
