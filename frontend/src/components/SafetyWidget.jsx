function SafetyWidget({
  onClose,
}) {
  const emergencyNumbers = [
    {
      label: "Police",
      number: "100",
      icon: "👮",
    },
    {
      label: "Fire",
      number: "101",
      icon: "🚒",
    },
    {
      label: "Ambulance",
      number: "108",
      icon: "🚑",
    },
    {
      label: "Women",
      number: "1091",
      icon: "👩",
    },
    {
      label: "Tourist",
      number: "1363",
      icon: "🧳",
    },
  ];

  return (
    <div className="fixed bottom-20 right-5 w-[340px] bg-white/95 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-2xl z-[9999] overflow-hidden">

      <div className="bg-gradient-to-r from-orange-500 to-blue-600 px-4 py-3 flex justify-between items-center">

        <div>

          <h3 className="font-bold text-white">
            🚨 Travel Safety
          </h3>

          <p className="text-xs text-orange-100">
            Emergency Assistance
          </p>

        </div>

        <button
          onClick={onClose}
          className="text-white text-xl hover:opacity-80"
        >
          ×
        </button>

      </div>

      <div className="p-4 space-y-2">

        {emergencyNumbers.map(
          (item) => (
            <a
              key={item.number}
              href={`tel:${item.number}`}
              className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-blue-50 border border-orange-100 rounded-xl px-3 py-2.5 hover:shadow-sm transition"
            >

              <span className="font-medium text-slate-700">
                {item.icon} {item.label}
              </span>

              <span className="font-bold text-red-500">
                {item.number}
              </span>

            </a>
          )
        )}

        <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 mt-2">

          <p className="text-xs text-slate-600">
            ⚠️ Share your location with trusted contacts while travelling.
          </p>

        </div>

      </div>

    </div>
  );
}

export default SafetyWidget;