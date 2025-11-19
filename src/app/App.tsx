// Nota: NO importamos index.css aquí porque ya está en main.tsx

function App() {
  return (
    <main className="min-h-screen w-full gradient-gi flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">

      {/* BACKGROUND DECORATIVO */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-8">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-white/90 uppercase">System Online</span>
          </div>

          <div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
              General Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/60 font-serif italic mt-2">
              AI Neural Network Architecture
            </p>
          </div>
        </div>

        {/* TARJETA GLASS (EL COMPONENTE IMPORTANTE) */}
        <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">

            {/* IZQUIERDA: INTRO */}
            <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Bienvenido</h2>
                <p className="text-lg text-blue-100/70 leading-relaxed">
                  Accede al panel de control neuronal. Tu infraestructura de diseño está lista y optimizada con Tailwind v4.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button className="h-12 px-6 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-blue-900/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span>Iniciar Sesión</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className="h-12 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all">
                  Documentación
                </button>
              </div>
            </div>

            {/* DERECHA: FORMULARIO */}
            <div className="p-8 md:p-12 bg-black/20 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">Credenciales</span>
                <div className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-wide">
                  Secure TLS
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-blue-200/60 uppercase tracking-wider ml-1">Usuario</label>
                  <input
                    type="email"
                    placeholder="admin@neural.ai"
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-blue-200/60 uppercase tracking-wider ml-1">Contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                  />
                </div>

                <button className="w-full text-right text-sm text-blue-200/40 hover:text-white transition-colors pt-1">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-white/20 font-medium">
          Neural Interface v1.0 • Tailwind CSS v4
        </p>

      </div>
    </main>
  )
}

export default App