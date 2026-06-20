import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdShoppingCart,
  MdNotifications,
  MdMenu,
  MdSearch,
  MdKeyboardArrowDown,
  MdLogout,
  MdSettings,
  MdPerson,
} from "react-icons/md";
import { useImages } from "../context/ImagesContext";

function Dropdown({ children, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "6px",
          borderRadius: 8,
        }}
      >
        {children}
      </button>

      {open && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 10 }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              minWidth: 180,
              boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              zIndex: 20,
              overflow: "hidden",
            }}
          >
            {items.map((item, i) => (
              <button
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "var(--color-text)",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
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

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useImages();

  function handleSearch(e) {
    setSearchQuery(e.target.value);
    if (location.pathname !== "/images") navigate("/images");
  }

  const cartItems = [
    { label: "View Cart", icon: <MdShoppingCart size={16} /> },
    { label: "Checkout",  icon: <MdShoppingCart size={16} /> },
  ];

  const profileItems = [
    { label: "Profile",  icon: <MdPerson size={16} /> },
    { label: "Settings", icon: <MdSettings size={16} /> },
    { label: "Logout",   icon: <MdLogout size={16} /> },
  ];

  return (
    <header
      style={{
        height: 64,
        backgroundColor: "var(--color-card)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <button
        onClick={onMenuClick}
        className="hamburger-btn"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          alignItems: "center",
          padding: 6,
          borderRadius: 8,
          color: "var(--color-text)",
        }}
      >
        <MdMenu size={24} />
      </button>

      <div
        className="navbar-search"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: "var(--color-background)",
          border: "1px solid var(--color-border)",
          borderRadius: 8,
          padding: "6px 12px",
        }}
      >
        <MdSearch size={18} color="var(--color-text-muted)" />
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search files…"
          aria-label="Search images"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            fontSize: 14,
            color: "var(--color-text)",
            width: "100%",
          }}
        />
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
        <Dropdown items={cartItems}>
          <div style={{ position: "relative" }}>
            <MdShoppingCart size={22} color="var(--color-text)" />
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: "var(--color-primary)",
                color: "white",
                fontSize: 9,
                fontWeight: 700,
                width: 14,
                height: 14,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </span>
          </div>
        </Dropdown>

        <Dropdown items={[{ label: "No new notifications", icon: <MdNotifications size={16} /> }]}>
          <div style={{ position: "relative" }}>
            <MdNotifications size={22} color="var(--color-text)" />
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: "#EF4444",
                color: "white",
                fontSize: 9,
                fontWeight: 700,
                width: 14,
                height: 14,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              5
            </span>
          </div>
        </Dropdown>

        <Dropdown items={profileItems}>
          <img
            src="https://i.pravatar.cc/36?img=5"
            alt="Profile"
            style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }}
          />
          <span
            style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}
            className="profile-name"
          >
            Jane Doe
          </span>
          <MdKeyboardArrowDown size={18} color="var(--color-text-muted)" />
        </Dropdown>
      </div>
    </header>
  );
}
