import React, { useState } from "react";

interface Artwork {
  src: string;
  title: string;
  alt: string;
}

interface ArtGalleryProps {
  artworks: Artwork[];
}

const ArtGallery: React.FC<ArtGalleryProps> = ({ artworks }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const openModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {artworks.map((artwork, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden"
            onClick={() => openModal(artwork)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={artwork.src}
                alt={artwork.alt}
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              {artwork.title}
            </p>
          </div>
        ))}
      </div>

      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={handleModalClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src={selectedArtwork.src}
              alt={selectedArtwork.alt}
              className="max-w-full max-h-full object-contain"
              style={{ maxWidth: "95vw", maxHeight: "95vh" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ArtGallery;
