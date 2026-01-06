import { useState } from "react";

function Calendrier() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  // Navigation du calendrier
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Lundi = 0

    const days = [];

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }

    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();

  // formulaire d'ajout d'événement
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    color: "#3b82f6",
  });

  // Ajouter un événement
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.start && newEvent.end) {
      console.log("Événement à sauvegarder:", {
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
        color: newEvent.color,
      });
      setNewEvent({ title: "", start: "", end: "", color: "#3b82f6" });
      setShowAddForm(false);
    }
  };

  return (
    <div className="h-full bg-zinc-900 p-6 pt-24 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex gap-6">
        {/* Container Événements actuels et prochains */}
        <div className="w-80 bg-zinc-800 p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-6">Événements</h2>

          {/* Événements actuels */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Aujourd'hui
            </h3>
            <p className="text-gray-400 text-sm">Aucun événement aujourd'hui</p>
          </div>

          {/* Événements prochains */}
          <div className="flex-1 overflow-hidden">
            <h3 className="text-lg font-semibold text-white mb-3">
              Prochainement
            </h3>
            <p className="text-gray-400 text-sm">Aucun événement prévu</p>
          </div>
        </div>

        {/* Container Calendrier */}
        <div className="flex-1 bg-zinc-800 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Calendrier</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#F04406] hover:bg-orange-700 text-white p-2 rounded-full transition"
              title="Ajouter un événement"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* Modèle d'ajout d'événement */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-zinc-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    Nouvel événement
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Titre *
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      placeholder="Titre de l'événement"
                      className="w-full px-3 py-2 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-blue-500 focus:outline-none"
                      required
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Date et heure de début
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.start}
                      onChange={(e) =>
                        setNewEvent({ newEvent, start: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Date et heure de fin
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.end}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, end: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Couleur
                    </label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={newEvent.color}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, color: e.target.value })
                        }
                        className="w-16 h-10 bg-zinc-700 rounded border border-zinc-600 cursor-pointer"
                      />
                      <span className="text-sm text-gray-300">
                        {newEvent.color}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600 transition border border-zinc-600"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Calendrier */}
          <div className="flex-1 overflow-hidden">
            <div className="bg-zinc-800 rounded-lg h-full flex flex-col">
              {/* Header de navigation */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-700">
                <div className="flex items-center gap-4">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-zinc-700 rounded text-white transition"
                  >
                    ←
                  </button>
                  <h3 className="text-xl font-semibold text-white">
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </h3>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-zinc-700 rounded text-white transition"
                  >
                    →
                  </button>
                </div>
                <button
                  onClick={goToToday}
                  className="px-4 py-2 bg-[#F04406] hover:bg-orange-700 text-white rounded transition"
                >
                  Aujourd'hui
                </button>
              </div>

              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 border-b border-zinc-700">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="p-3 text-center text-gray-400 font-medium"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grille du calendrier */}
              <div className="flex-1 grid grid-cols-7 auto-rows-fr">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`border-r border-b border-zinc-700 p-2 min-h-[60px] hover:bg-orange-500 transition cursor-pointer ${
                      !day.isCurrentMonth
                        ? "bg-zinc-900 text-gray-500"
                        : "text-white"
                    } ${
                      day.date.toDateString() === today.toDateString()
                        ? "bg-orange-700 text-white"
                        : ""
                    }`}
                  >
                    <div className="font-medium">{day.date.getDate()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendrier;
