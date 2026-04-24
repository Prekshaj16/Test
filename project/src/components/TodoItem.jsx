import { CircleCheck, Clock } from "lucide-react"

function TodoItem({ todo, isLast }) {
    return (
        <div className={`flex items-start gap-4 px-6 py-5 transition-colors hover:bg-gray-50
            ${!isLast ? 'border-b border-gray-100' : ''}`}>

            {todo.completed
                ? <CircleCheck size={20} className="text-gray-900 flex-shrink-0 mt-0.5" />
                : <Clock size={20} className="text-gray-300 flex-shrink-0 mt-0.5" />
            }

            <span className="text-xs text-gray-400 mt-0.5 w-6 flex-shrink-0">#{todo.id}</span>

            <span className={`flex-1 text-sm leading-relaxed ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.todo}
            </span>

            <span className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0
                ${todo.completed ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                {todo.completed ? 'Done' : 'Pending'}
            </span>
        </div>
    )
}

export default TodoItem;