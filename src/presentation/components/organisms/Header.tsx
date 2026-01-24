import { Link } from "react-router-dom"
import { Logo } from "../atoms"

const routes = [
    { path: "/", label: "Home" },
    { path: "/cars", label: "Autos" },
]

export const Header = () => {
    return (
        <header className="bg-black shadow-md px-20">
            <nav className="flex justify-between items-center p-4">
                <div>
                    <Logo
                        size="lg"
                        alt="Logo"
                    />
                </div>
                <div className="flex gap-8">
                    {routes.map((route) => (
                        <Link key={route.path} to={route.path} className="text-white uppercase" >{route.label}</Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}
