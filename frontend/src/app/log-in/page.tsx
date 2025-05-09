
function App() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center font-sans text-white px-4 py-10 overflow-hidden bg-gradient-animated">
      <div className="text-center mb-12 z-10">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-xl">Work Together System</h1>
        <p className="text-lg md:text-xl text-indigo-100 mt-2">Platforma współpracy dla nowoczesnych firm</p>
      </div>

      <div className="bg-white text-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10 animate-fade-up z-10 backdrop-blur-lg bg-opacity-80">
        <h2 className="text-3xl font-semibold text-center mb-8 text-indigo-700">Logowanie</h2>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="login" className="text-sm font-medium">Login</label>
            <input
              id="login"
              type="text"
              placeholder="Wprowadź login"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">Hasło</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="flex items-center gap-2 mt-1">
            <input type="checkbox" id="remember" className="accent-indigo-500" />
            <label htmlFor="remember" className="text-sm">Zapamiętaj hasło</label>
          </div>

          <button className="mt-6 bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition">
            Zaloguj się
          </button>
        </div>
      </div>


      <style>{`
        /* Fade up formularza */
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
        }

        /* Gradient shifting animation */
        .bg-gradient-animated {
          background: linear-gradient(270deg, #1a2a6c, #b21f1f, #fdbb2d, #0f2027, #2c5364);
          background-size: 1000% 1000%;
          animation: gradientShift 20s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}

export default App;