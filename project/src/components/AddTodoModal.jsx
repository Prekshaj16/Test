import { Plus, X, AlertTriangle, LoaderCircle } from "lucide-react"

function AddTodoModal({ onClose, onAdd, newTodo, setNewTodo, addError, setAddError, adding }) {
    return (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 z-50">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <Plus size={20} className="text-gray-700" />
                        <h2 className="text-lg font-bold text-gray-800">Add New Todo</h2>
                    </div>
                    <button onClick={onClose} className=" rounded-xl p-1 text-gray-700 transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Input */}
                <div className="flex flex-col gap-1.5 mb-2">
                    <label className="text-[15px] font-semibold text-gray-500 uppercase tracking-wider">Todo</label>
                    <input
                        type="text"
                        required
                        value={newTodo}
                        onChange={(e) => { setNewTodo(e.target.value); setAddError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && onAdd()}
                        placeholder="e.g. Buy groceries"
                        className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 transition
                            ${addError ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-gray-300'}`}
                    />
                    {addError && (
                        <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1">
                            <AlertTriangle size={13} />
                            {addError}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                        Cancel
                    </button>
                    <button
                        onClick={onAdd}
                        disabled={adding}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                        {adding
                            ? <><LoaderCircle size={15} className="animate-spin" /> Adding…</>
                            : <><Plus size={15} /> Add Todo</>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddTodoModal;