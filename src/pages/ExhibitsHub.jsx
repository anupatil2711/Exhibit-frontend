// src/pages/ExhibitsHub.jsx

import React, { useState, useEffect } from 'react';
import ExhibitCard from '../components/ExhibitCard';
import { getExhibits } from '../api/api';

function ExhibitsHub() {
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    const data = getExhibits();
    setExhibits(data);
  }, []);

  return (
    <div 
        className="container mx-auto px-6 py-12 relative"
    >
        {/* Static Decorative Circles (Pure CSS) */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
            <div className="w-[500px] h-[500px] bg-secondary/20 rounded-full absolute -top-40 -left-40 transition-transform"></div>
            <div className="w-[400px] h-[400px] bg-highlight/30 rounded-full absolute -bottom-20 -right-20 transition-transform"></div>
        </div>

        {/* Bouncing Header */}
        <header
            className="text-center mb-10 relative z-10 p-4 border-b-4 border-accent/50"
        >
            <h2 className="font-display text-5xl font-extrabold text-primary mb-2">
                All Our Wonders! 🤩
            </h2>
            <p className="text-xl text-text-dark/80 max-w-2xl mx-auto">
                Tap a card to dive into the science, take a quiz, or find a DIY project!
            </p>
        </header>

        {/* Exhibit Grid */}
        <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
            {exhibits.map((exhibit) => (
                <div key={exhibit.id} className="transition-all duration-300 hover:-translate-y-1">
                    <ExhibitCard
                        title={exhibit.name}
                        imageUrl={exhibit.image}
                        description={exhibit.description}
                        link={`/exhibits/${exhibit.id}`}
                    />
                </div>
            ))}
        </div>
    </div>
  );
}

export default ExhibitsHub;