import { ClipboardList, Eye, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Navbar({ total, visitCount }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user");
        localStorage.removeItem("visitCount");
        navigate("/");
    };

    return (
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
                <ClipboardList size={22} className="text-gray-700" />
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">Todo Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Eye size={15} className="text-gray-400" />
                    <span>{visitCount} {visitCount === 1 ? "visit" : "visits"}</span>
                </div>
                <span className="text-sm text-black">{total} todos total</span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition">
                    <LogOut size={15} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar