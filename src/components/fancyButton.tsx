// src/components/FancyButton.tsx

export default function FancyButton({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-2xl md:text-xl px-8 md:px-12 py-3 font-semibold text-white bg-gradient-to-r from-slate-500 to-slate-900 rounded-full shadow-lg hover:from-slate-400 hover:to-slate-800 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none"
    >
      {text}
    </button>
  );
}
