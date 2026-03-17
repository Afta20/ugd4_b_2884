import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  return (
    <div 
      onClick={handleClick}
      className="w-20 h-24 sm:w-24 sm:h-28 perspective-1000 cursor-pointer group"
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isOpen ? 'rotate-y-180' : 'hover:scale-105'}`}>
        
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#c084fc] to-[#8b5cf6] rounded-xl border-b-4 border-[#7c3aed] flex items-center justify-center shadow-lg z-10">
          <span className="text-3xl font-bold text-white/80">?</span>
        </div>

        <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl flex items-center justify-center shadow-xl z-20 ${isMatched ? 'ring-4 ring-green-400 opacity-80' : ''}`}>
          <IconComponent className="text-4xl" style={{ color: card.color }} />
        </div>
        
      </div>
    </div>
  );
}

export default Card;