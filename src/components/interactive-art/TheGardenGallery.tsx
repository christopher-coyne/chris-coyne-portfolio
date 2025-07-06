import React, { useState } from "react";

interface ImageData {
  src: string;
  alt: string;
  title: string;
  description: string;
  buttonPositions: Array<{
    top: string;
    left: string;
  }>;
}

const TheGardenGallery: React.FC = () => {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);

  const images: ImageData[] = [
    {
      src: "/images/interactive-art/the-garden/node-a.png",
      alt: "Node A",
      title: "Node A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      buttonPositions: [
        { top: "20%", left: "15%" }, // Position for button to Node D
        { top: "60%", left: "80%" }, // Position for button to Node G
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-b.png",
      alt: "Node B",
      title: "Node B",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      buttonPositions: [
        { top: "40%", left: "25%" }, // Position for button to Node A
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-c.png",
      alt: "Node C",
      title: "Node C",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
      buttonPositions: [
        { top: "30%", left: "70%" }, // Position for button to Node B
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-d.png",
      alt: "Node D",
      title: "Node D",
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      buttonPositions: [
        { top: "15%", left: "60%" }, // Position for button to Node E
        { top: "75%", left: "20%" }, // Position for button to Node C
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-e.png",
      alt: "Node E",
      title: "Node E",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      buttonPositions: [
        { top: "50%", left: "35%" }, // Position for button to Node D
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-f.png",
      alt: "Node F",
      title: "Node F",
      description:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      buttonPositions: [
        { top: "25%", left: "65%" }, // Position for button to Node G
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-g.png",
      alt: "Node G",
      title: "Node G",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      buttonPositions: [
        { top: "35%", left: "10%" }, // Position for button to Node F
        { top: "65%", left: "85%" }, // Position for button to Node H
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-h.png",
      alt: "Node H",
      title: "Node H",
      description:
        "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      buttonPositions: [
        { top: "45%", left: "50%" }, // Position for button to Node G
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-i.png",
      alt: "Node I",
      title: "Node I",
      description:
        "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      buttonPositions: [
        { top: "20%", left: "75%" }, // Position for button to Node J
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-j.png",
      alt: "Node J",
      title: "Node J",
      description:
        "Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
      buttonPositions: [
        { top: "40%", left: "15%" }, // Position for button to Node I
        { top: "60%", left: "70%" }, // Position for button to Node K
      ],
    },
    {
      src: "/images/interactive-art/the-garden/node-k.png",
      alt: "Node K",
      title: "Node K",
      description:
        "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      buttonPositions: [
        { top: "55%", left: "40%" }, // Position for button to Node J
      ],
    },
  ];

  // Node connections mapping (0-indexed)
  const nodeConnections: { [key: number]: number[] } = {
    0: [3, 6], // Node A goes to node D and node G
    1: [0], // Node B goes to node A
    2: [1], // Node C goes to node B
    3: [4, 2], // Node D goes to node E and node C
    4: [3], // Node E goes to Node D
    5: [6], // Node F goes to node G
    6: [5, 7], // Node G goes to node F and node H
    7: [6], // Node H goes to node G
    8: [9], // Node I goes to node J
    9: [8, 10], // Node J goes to node I and node K
    10: [9], // Node K goes to node J
  };

  const currentImage = images[currentNodeIndex];
  const connectedNodes = nodeConnections[currentNodeIndex] || [];

  const goToNode = (index: number) => {
    setCurrentNodeIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" && connectedNodes.length > 0) {
      goToNode(connectedNodes[0]);
    } else if (e.key === "ArrowLeft" && connectedNodes.length > 1) {
      goToNode(connectedNodes[1]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Current Node Display */}
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4">
        <div className="relative border-2 border-gray-300 rounded-lg p-4">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-[72rem] h-[34rem] object-coverrounded-lg shadow-lg"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          />

          {/* Absolutely Positioned Navigation Buttons */}
          {connectedNodes.map((nodeIndex, buttonIndex) => (
            <button
              key={nodeIndex}
              onClick={() => goToNode(nodeIndex)}
              className="absolute px-4 py-2 bg-green-500 bg-opacity-80 text-white rounded-lg hover:bg-green-600 hover:bg-opacity-90 transition-all duration-200 text-sm font-medium shadow-lg"
              style={{
                top: currentImage.buttonPositions[buttonIndex]?.top || "50%",
                left: currentImage.buttonPositions[buttonIndex]?.left || "50%",
                transform: "translate(-50%, -50%)",
              }}
              aria-label={`Go to ${images[nodeIndex].title}`}
            >
              {images[nodeIndex].title}
            </button>
          ))}
          {/* Node Description */}
          <div className="text-center bg-black rounded-lg p-4">
            <p className="text-white leading-relaxed">
              {currentImage.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheGardenGallery;
