import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Fazal Electronics</h1>
            <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100"
            >
                Logout
            </button>
        </nav>
    );
}
