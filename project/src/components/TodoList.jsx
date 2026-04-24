import { LoaderCircle, AlertTriangle, ClipboardX } from "lucide-react"
import TodoItem from "./TodoItem"

function TodoList({ todos, loading, error, filter, total, start, end }) {

    if (loading) return (
        <div className="flex-1 flex items-center justify-center gap-3 text-gray-500 text-base">
            <LoaderCircle className="animate-spin" size={24} />
            Fetching todos…
        </div>
    )

    if (error) return (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-red-400 text-sm">
            <AlertTriangle size={40} />
            {error}
        </div>
    )

    if (todos.length === 0) return (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400 text-sm">
            <ClipboardX size={48} />
            No todos found
        </div>
    )

    return (
        <>
            <p className="text-sm text-gray-600 mb-4">
                {filter === "all"
                    ? `Showing ${start}–${end} of ${total} todos`
                    : `Showing all ${total} todos for your account`}
            </p>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-1">
                {todos.map((todo, idx) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        isLast={idx === todos.length - 1}
                    />
                ))}
            </div>
        </>
    )
}

export default TodoList