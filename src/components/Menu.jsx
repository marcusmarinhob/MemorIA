
import { Link } from "react-router-dom";
import logo from "../assets/minha_logo.png";

export default function Menu({ tipo }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">
        {/* Logo  cores #d4a574 #1a7a8a*/ }
        <div className="flex items-center">
          <img src={logo} alt="Logo MemorIA" className="h-16 w-auto" />
        </div>

        {/* Links centrais */}
        <div className="flex gap-10 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">Início</Link>

          {tipo === "publico" && (
            <>
              <Link to="/como-funciona" className="hover:text-blue-600 transition-colors">
                Como funciona?
              </Link>
              
            </>
          )}

          {tipo === "aluno" && (
            <>
    
              <Link to="/aluno/como-funciona" className="hover:text-blue-600 transition-colors">
                Como funciona?
              </Link>
              <Link to="/aluno/estatisticas" className="hover:text-blue-600 transition-colors">
                Estatísticas
              </Link>
            </>
          )}

          {tipo === "professor" && (
            <>
              
              <Link to="/professor/como-funciona" className="hover:text-blue-600 transition-colors">
                Como funciona?
              </Link>
              <Link to="/professor/estatisticas" className="hover:text-blue-600 transition-colors">
                Estatísticas
              </Link>
            </>
          )}
        </div>

        {/* Botão lateral */}
        <div>
          {tipo === "publico" ? (
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
            >
              Entrar
            </Link>
          ) : (
            <Link
              to="/"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
            >
              Sair
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}