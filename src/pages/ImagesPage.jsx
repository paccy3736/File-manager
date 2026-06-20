import { useState } from "react";
import { MdAdd, MdChevronRight, MdSearch, MdClose } from "react-icons/md";
import ImageCard from "../components/ImageCard";
import ImageModal from "../components/ImageModal";
import { useImages } from "../context/ImagesContext";

export default function ImagesPage() {
  const { filteredImages, recentImages, searchQuery, setSearchQuery, markViewed } = useImages();
  const [selectedImage, setSelectedImage] = useState(null);

  function openImage(image) {
    markViewed(image.id);
    setSelectedImage(image);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)" }}>Images</h1>

        <div className="page-header-actions">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              padding: "7px 12px",
              width: 220,
            }}
          >
            <MdSearch size={16} color="var(--color-text-muted)" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name…"
              aria-label="Filter images by name"
              style={{
                border: "none",
                background: "none",
                outline: "none",
                fontSize: 13,
                color: "var(--color-text)",
                width: "100%",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", color: "var(--color-text-muted)", padding: 0 }}
              >
                <MdClose size={14} />
              </button>
            )}
          </div>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "10px 18px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <MdAdd size={18} />
            Add Image
          </button>
        </div>
      </div>

      {!searchQuery && (
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text)" }}>Recently Viewed</h2>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "var(--color-primary)",
                fontWeight: 500,
              }}
            >
              View all <MdChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
            {recentImages.map((img) => (
              <div key={img.id} className="recent-card-wrapper">
                <ImageCard image={img} onClick={() => openImage(img)} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text)", marginBottom: 14 }}>
          {searchQuery ? `Results for "${searchQuery}" (${filteredImages.length})` : "All Images"}
        </h2>

        {filteredImages.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--color-text-muted)", fontSize: 14 }}>
            No images match "{searchQuery}".
          </div>
        ) : (
          <div style={{ display: "grid", gap: 16 }} className="all-images-grid">
            {filteredImages.map((img) => (
              <ImageCard key={img.id} image={img} onClick={() => openImage(img)} />
            ))}
          </div>
        )}
      </section>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}
