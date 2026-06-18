import { useState } from "react";

import TranslatorWidget from "./TranslatorWidget";
import SafetyWidget from "./SafetyWidget";

function FloatingButtons() {
  const [
    showTranslator,
    setShowTranslator,
  ] = useState(false);

  const [
    showSafety,
    setShowSafety,
  ] = useState(false);

  return (
    <>
      {showTranslator && (
        <TranslatorWidget
          onClose={() =>
            setShowTranslator(
              false
            )
          }
        />
      )}

      {showSafety && (
        <SafetyWidget
          onClose={() =>
            setShowSafety(false)
          }
        />
      )}

      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3">

        <button
          onClick={() => {
            setShowSafety(
              !showSafety
            );

            setShowTranslator(
              false
            );
          }}
          className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg flex items-center justify-center text-lg transition hover:scale-110"
        >
          🚨
        </button>

        <button
          onClick={() => {
            setShowTranslator(
              !showTranslator
            );

            setShowSafety(
              false
            );
          }}
          className="w-11 h-11 rounded-full bg-slate-600 hover:bg-slate-700 text-white shadow-lg flex items-center justify-center text-lg transition hover:scale-110"
        >
          🌐
        </button>

      </div>
    </>
  );
}

export default FloatingButtons;