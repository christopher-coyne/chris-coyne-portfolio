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
      {/* Art Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artworks.map((artwork, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
            onClick={() => openModal(artwork)}
          >
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={artwork.src}
                alt={artwork.alt}
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {artwork.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={handleModalClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 z-10 transition-all duration-200"
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

            {/* Full-size image */}
            <img
              src={selectedArtwork.src}
              alt={selectedArtwork.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{ maxWidth: "95vw", maxHeight: "95vh" }}
            />

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
              <h3 className="text-xl font-bold text-center">
                {selectedArtwork.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtGallery;
