import { ClipboardList, Eye, LogOut } from "lucide-react"

function Navbar({ total, loginCount, onLogout }) {
    return (
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
                <ClipboardList size={22} className="text-gray-700" />
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">Todo Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Eye size={15} className="text-gray-400" />
                    <span>{loginCount} {loginCount === 1 ? "login" : "logins"}</span>
                </div>
                <span className="text-sm text-black">{total} todos total</span>
                <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                >
                    <LogOut size={15} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar;