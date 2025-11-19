import { Link } from 'react-router-dom';

export const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                <h1 className="text-3xl font-bold mb-4">Iniciar Sesión</h1>
                <p>Formulario de Login irá aquí...</p>
                <Link to="/register" className="text-cyan-400 hover:underline mt-4 block">
                    ¿No tienes cuenta? Regístrate
                </Link>
                <Link to="/" className="text-gray-400 text-sm hover:underline block mt-2">
                    ← Volver al inicio
                </Link>
            </div>
        </div>
    );
};