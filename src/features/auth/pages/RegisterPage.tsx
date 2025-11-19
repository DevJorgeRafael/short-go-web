import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                <h1 className="text-3xl font-bold mb-4">Crear Cuenta</h1>
                <p>Formulario de Registro irá aquí...</p>
                <Link to="/login" className="text-cyan-400 hover:underline mt-4 block">
                    ¿Ya tienes cuenta? Entra
                </Link>
            </div>
        </div>
    );
};