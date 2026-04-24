import { List, User } from "lucide-react"

function FilterToggle({ filter, setFilter }) {
    return (
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button
                onClick={() => setFilter("all")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                    ${filter === "all" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-800"}`}>
                <List size={15} />
                All Todos
            </button>
            <button
                onClick={() => setFilter("mine")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                    ${filter === "mine" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-800"}`}>
                <User size={15} />
                My Todos
            </button>
        </div>
    )
}

export default FilterToggle