import React from 'react';
import { FaMousePointer, FaCheck, FaSyncAlt, FaRedo, FaHourglassHalf } from 'react-icons/fa';

function ScoreBoard({ moves, seconds, matchedCount, totalPairs, onReset }) {
  const isGameComplete = matchedCount === totalPairs;

  // Format detik ke MM:SS
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

 return (
  <div className="w-full max-w-xl mx-auto text-center mb-6">
    <div className="grid grid-cols-3 gap-3 mb-6">
      {/* Box statistik warna ungu gelap transparan */}
      {[
        { label: 'Waktu', val: formatTime(seconds), icon: <FaHourglassHalf /> },
        { label: 'Percobaan', val: moves, icon: <FaMousePointer /> },
        { label: 'Ditemukan', val: `${matchedCount}/${totalPairs}`, icon: <FaCheck /> }
      ].map((item, i) => (
        <div key={i} className="bg-[#2d2a5d]/60 backdrop-blur-md p-3 rounded-xl border border-white/5">
          <p className="text-[10px] uppercase font-bold text-[#a5b4fc] flex items-center justify-center gap-1 mb-1">
            {item.icon} {item.label}
          </p>
          <p className="text-xl font-bold text-white">{item.val}</p>
        </div>
      ))}
    </div>

    {/* Tombol Acak Ulang Kuning Terang sesuai gambar */}
    <button
      onClick={onReset}
      className="px-8 py-2.5 bg-[#facc15] text-[#1a1640] font-bold rounded-full hover:bg-[#fde047] transition-all shadow-[0_4px_15px_rgba(250,204,21,0.3)] flex items-center gap-2 mx-auto mb-4"
    >
      <FaSyncAlt className="text-sm" /> Acak Ulang
    </button>
  </div>
);
}

export default ScoreBoard;