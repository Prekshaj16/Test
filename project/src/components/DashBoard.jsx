import React, { useEffect, useState } from 'react'
import { LoaderCircle, ClipboardList, ChevronLeft, ChevronRight, CircleCheck, Clock, AlertTriangle, ClipboardX, User, List } from "lucide-react"

function Dashboard() {

    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all"); // "all" or "mine"

    const limit = 5;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;

    useEffect(() => {
        setPage(1);
    }, [filter]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const skip = (page - 1) * limit;

        const url = filter === "mine"
            ? `https://dummyjson.com/users/${userId}/todos`
            : `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setTodos(data.todos);
                setTotal(data.total);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load todos. Please try again.");
                setLoading(false);
            });
    }, [page, filter]);

    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">

            {/* Navbar */}
            <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <ClipboardList size={22} className="text-gray-700" />
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">Todo Dashboard</h1>
                </div>
                <span className="text-sm text-black">{total} todos total</span>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col px-8 py-8 max-w-4xl w-full mx-auto">

                {/* Filter Toggle */}
                <div className="flex items-center gap-2 mb-6 bg-white border border-gray-200 rounded-xl p-1 w-fit shadow-sm">
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

                {/* Loading */}
                {loading && (
                    <div className="flex-1 flex items-center justify-center gap-3 text-gray-500 text-base">
                        <LoaderCircle className="animate-spin" size={24} />
                        Fetching todos…
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-red-400 text-sm">
                        <AlertTriangle size={40} />
                        {error}
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && todos.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400 text-sm">
                        <ClipboardX size={48} />
                        No todos found
                    </div>
                )}

                {/* Todo List */}
                {!loading && !error && todos.length > 0 && (
                    <>
                        {/* Page Info */}
                        {filter === "all" && (
                            <p className="text-sm text-gray-600 mb-4">
                                Showing {start}–{end} of {total} todos
                            </p>
                        )}
                        {filter === "mine" && (
                            <p className="text-sm text-gray-600 mb-4">
                                Showing all {total} todos for your account
                            </p>
                        )}

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-1">
                            {todos.map((todo, idx) => (
                                <div
                                    key={todo.id}
                                    className={`flex items-start gap-4 px-6 py-5 transition-colors hover:bg-gray-50
                                        ${idx !== todos.length - 1 ? 'border-b border-gray-100' : ''}`}
                                >
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
                            ))}
                        </div>
                    </>
                )}

                {/* Pagination - only for All Todos */}
                {!loading && !error && todos.length > 0 && filter === "all" && (
                    <div className="flex flex-row gap-2 mt-6 justify-center items-center">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="ring-2 ring-gray-400 rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition flex items-center gap-1">
                            <ChevronLeft size={16} /> Prev
                        </button>

                        <h3 className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-gray-700 ring-1 ring-gray-200">
                            {page} / {totalPages}
                        </h3>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="ring-2 ring-gray-400 rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition flex items-center gap-1">
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Dashboard;