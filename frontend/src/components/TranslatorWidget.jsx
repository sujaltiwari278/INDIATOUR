import { useState } from "react";

import {
  translateRealText,
} from "../services/translatorService";

function TranslatorWidget({
  onClose,
}) {
  const [language, setLanguage] =
    useState("hindi");

  const [text, setText] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const translate =
    async () => {
      if (!text.trim()) {
        return;
      }

      try {
        setLoading(true);

        const data =
          await translateRealText(
            text,
            language
          );

        setResult(
          data.translatedText
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed bottom-20 right-5 w-[420px] bg-white/95 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-2xl z-[9999] overflow-hidden">

      <div className="bg-gradient-to-r from-orange-500 to-blue-600 px-5 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
            🌐
          </div>

          <div>

            <h3 className="font-bold text-white">
              Travel Translator
            </h3>

            <p className="text-xs text-orange-100">
              Communicate across India
            </p>

          </div>

        </div>

        <button
          onClick={onClose}
          className="text-white text-2xl hover:opacity-80"
        >
          ×
        </button>

      </div>

      <div className="p-5">

        <select
          value={language}
          onChange={(e) =>
            setLanguage(
              e.target.value
            )
          }
          className="w-full border border-slate-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value="hindi">
            Hindi
          </option>

          <option value="gujarati">
            Gujarati
          </option>

          <option value="telugu">
            Telugu
          </option>

          <option value="marathi">
            Marathi
          </option>

        </select>

        <textarea
          rows="4"
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          placeholder="Type a phrase, question or travel request..."
          className="w-full border border-slate-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        <button
          onClick={translate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
        >
          {loading
            ? "Translating..."
            : "Translate"}
        </button>

        {result && (
          <div className="mt-5 bg-gradient-to-r from-orange-50 to-blue-50 border border-orange-100 rounded-2xl p-4">

            <h4 className="font-semibold text-orange-600 mb-2">
              Translation
            </h4>

            <p className="text-slate-700 leading-relaxed">
              {result}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default TranslatorWidget;