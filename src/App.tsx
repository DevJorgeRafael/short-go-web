import { useState } from 'react'
type ThemeType = 'gi' | 'stream' | 'jeton';

function App() {
  // Estado para cambiar entre las "Apps" que definiste en tu CSS
  const [theme, setTheme] = useState<ThemeType>('gi') // opciones: 'gi', 'stream', 'jeton'
  // Configuración dinámica según el tema elegido
  const themeConfig = {
    gi: {
      title: "General Intelligence",
      subtitle: "AI Neural Network",
      gradient: "gradient-gi",
      accent: "text-gi-cyan",
      badge: "System Online"
    },
    stream: {
      title: "Pulse Stream",
      subtitle: "Live Entertainment",
      gradient: "gradient-stream",
      accent: "text-stream-cyan",
      badge: "Live Now"
    },
    jeton: {
      title: "Jeton Wallet",
      subtitle: "Secure Transactions",
      gradient: "gradient-jeton",
      accent: "text-white",
      badge: "Balance Updated"
    }
  }

  const current = themeConfig[theme]

  return (
    // Usamos tu clase .hero-section y aplicamos el gradiente dinámico
    <main className={`hero-section ${current.gradient} transition-smooth`}>

      {/* Círculos decorativos animados de fondo (aprovechando tu z-index) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-heavy animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-heavy animate-float" />
      </div>

      <div className="content-section container-medium relative z-content">

        {/* Header con tus tipografías */}
        <header className="text-center mb-12 animate-fade-in">
          <span className="badge mb-4 border border-white/20 text-white">
            Design System v1.0
          </span>
          <h1 className="text-hero font-display text-white mb-2">
            {current.title}
          </h1>
          <p className="text-heading-lg font-serif text-white/80 italic">
            {current.subtitle}
          </p>
        </header>

        {/* Tarjeta principal con Glassmorphism */}
        <div className="glass-card animate-fade-in" style={{ animationDelay: '100ms' }}>

          {/* Navegación de pestañas */}
          <div className="flex flex-wrap gap-4 justify-center mb-12 border-b border-white/10 pb-8">
            {Object.keys(themeConfig).map((key) => (
              <button
                key={key}
                onClick={() => setTheme(key as ThemeType)}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${theme === key
                    ? 'bg-white text-black shadow-elevated scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'}
                `}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Contenido de demostración */}
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div className="space-y-8">
              <div>
                <h3 className="text-heading-lg font-display mb-4">Componentes</h3>
                <p className="text-body-lg text-white/80 mb-6">
                  Probando tus variables de espaciado, radio y sombras en un entorno real.
                </p>
              </div>

              {/* Botones */}
              <div className="flex gap-4 flex-wrap">
                <button className="btn-primary">
                  <span>Get Started</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
                <button className="btn-secondary">
                  Documentation
                </button>
                <button className="btn-icon">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>
              </div>
            </div>

            {/* Formulario Dummy */}
            <div className="card-dark p-8 rounded-xl backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold">Login Access</h4>
                <span className={`text-xs font-bold px-2 py-1 rounded bg-white/10 ${current.accent}`}>
                  SECURE
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-text-caption text-white/60 mb-2 block uppercase tracking-wider">Email</label>
                  <input type="email" placeholder="user@example.com" className="input-glass" />
                </div>
                <div>
                  <label className="text-text-caption text-white/60 mb-2 block uppercase tracking-wider">Password</label>
                  <input type="password" placeholder="••••••••" className="input-glass" />
                </div>
                <div className="pt-4">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-2/3 animate-pulse"></div>
                  </div>
                  <p className="text-xs text-right mt-2 text-white/50">Loading assets...</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <footer className="text-center mt-12 text-white/40 text-sm">
          <p>Tailwind v4 • Vite • React</p>
        </footer>

      </div>
    </main>
  )
}

export default App