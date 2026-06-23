/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3A57E8",
          light: "#EEF2FF",
          hover: "#2E47C7",
        },
        info: "#08B1BA",
        background: "#F8F9FA",
        card: "#FFFFFF",
        border: "#E9ECEF",
        sidebar: "#FFFFFF",
        "text-base": "#1E293B",
        "text-muted": "#8A92A6",
        success: "#10B981",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "page-title": ["22px", { fontWeight: "800", lineHeight: "1.2" }],
        "section-title": ["17px", { fontWeight: "700", lineHeight: "1.3" }],
        body: ["14px", { lineHeight: "1.5" }],
        meta: ["13px", { lineHeight: "1.4" }],
      },
      borderRadius: {
        card: "12px",
        modal: "20px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(58, 87, 232, 0.06)",
        modal: "0 30px 70px rgba(0, 0, 0, 0.25)",
        "primary-btn": "0 4px 12px rgba(58, 87, 232, 0.15)",
      },
    },
  },
  plugins: [],
};
