import { Link } from "react-router-dom"
import { Logo } from "../atoms"

const routes = [
    { path: "/", label: "Inicio" },
    { path: "/about", label: "Acerca de" },
]

export const Footer = () => {
  return (
    <footer className="bg-black shadow-md px-20 py-4">

        <div className="flex flex-col items-center justify-center gap-4">
        <Logo size="lg"/>

            <div className="flex gap-4">
                {routes.map((route) => (
                    <Link key={route.path} to={route.path} className="text-white">{route.label}</Link>
                ))}
            </div>

            <p className="text-white text-sm">© 2026 AutoStore. Todos los derechos reservados.</p>

        </div>
    </footer>
  )
}
