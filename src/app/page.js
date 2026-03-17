'use client';
import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaBolt, FaGem, FaGhost, FaMoon } from 'react-icons/fa';

const ICONS_BASE = [
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaLemon, color: '#eab308' },
  { icon: FaHeart, color: '#ec4899' },
  { icon: FaStar, color: '#f97316' },
  { icon: FaBolt, color: '#6366f1' },
  { icon: FaGem, color: '#22d3ee' },
  { icon: FaGhost, color: '#94a3b8' },
  { icon: FaMoon, color: '#fcd34d' },
];

export default function Home() {
  const [difficulty, setDifficulty] = useState(4);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true); 

  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const createGame = (num) => {
    const selected = ICONS_BASE.slice(0, num);
    const paired = selected.flatMap((item, idx) => [
      { id: idx * 2, icon: item.icon, color: item.color, pairId: idx },
      { id: idx * 2 + 1, icon: item.icon, color: item.color, pairId: idx },
    ]);
    return shuffle(paired);
  };

  useEffect(() => {
    setCards(createGame(difficulty));
    setSeconds(0);
    setIsActive(true); 
  }, [difficulty]);

  useEffect(() => {
    let interval = null;
    if (isActive && matchedCards.length < cards.length) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, matchedCards, cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [id1, id2] = flippedCards;
      const card1 = cards.find(c => c.id === id1);
      const card2 = cards.find(c => c.id === id2);
      setMoves(m => m + 1);
      if (card1.pairId === card2.pairId) {
        setMatchedCards(prev => [...prev, id1, id2]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 800);
      }
    }
  }, [flippedCards, cards]);

  const onFlip = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }
  };

  const reset = () => {
    setCards(createGame(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setSeconds(0);
    setIsActive(true); 
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#1a1640] via-[#2d1b4e] to-[#1a1640]">
      <div className="mb-8 flex flex-col items-center animate-slide-down"> 
        <div className="flex items-center gap-3 mb-6">
          <GiCardJoker className="text-4xl text-[#facc15]" />
          <h1 className="text-5xl font-bold text-[#e9d5ff]">Memory Card</h1>
        </div>

        <div className="flex gap-3 p-2 bg-[#2d2a5d]/50 rounded-2xl backdrop-blur-md">
          {[4, 6, 8].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setDifficulty(lvl);
                reset();
              }}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                difficulty === lvl 
                ? 'bg-[#facc15] text-[#1a1640] shadow-[0_0_15px_rgba(250,204,21,0.5)]' 
                : 'bg-[#3f3c71] text-[#a5b4fc] hover:bg-[#4e4b8a]'
              }`}
            >
              {lvl === 4 ? '😊 Easy' : lvl === 6 ? '😐 Medium' : '💀 Hard'} ({lvl})
            </button>
          ))}
        </div>
      </div>

      <ScoreBoard 
        moves={moves} 
        seconds={seconds} 
        matchedCount={matchedCards.length / 2} 
        totalPairs={difficulty} 
        onReset={reset} 
      />

      <div className="p-8 bg-[#2d2a5d]/30 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl">
        <GameBoard cards={cards} flippedCards={flippedCards} matchedCards={matchedCards} onFlip={onFlip} />
      </div>
    </main>
  );
}