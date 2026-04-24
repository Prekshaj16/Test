import React, { useEffect, useState } from 'react'
import { Plus } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import FilterToggle from "../components/FilterToggle"
import TodoList from "../components/TodoList"
import Pagination from "../components/Pagination"
import AddTodoModal from "../components/AddTodoModal"

function Dashboard() {

    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");
    const [modal, setModal] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    const [addError, setAddError] = useState("");
    const [adding, setAdding] = useState(false);
    const [loginCount] = useState(() => Number(localStorage.getItem("loginCount") || "0"));
    const navigate = useNavigate();


    const limit = 3;
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
            ? `https://dummyjson.com/users/${userId}/todos?limit=${limit}&skip=${skip}`
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

    const openModal = () => { setNewTodo(""); setAddError(""); setModal(true); };
    const closeModal = () => { setModal(false); setNewTodo(""); setAddError(""); };

    const handleLogout = () => {
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleAdd = () => {
        if (!newTodo.trim()) { setAddError("Todo cannot be empty."); return; }
        if (newTodo.trim().length < 5) { setAddError("Todo must be at least 5 characters."); return; }

        setAdding(true);
        fetch("https://dummyjson.com/todos/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo: newTodo.trim(), completed: false, userId: userId || 5 }),
        })
            .then(res => res.json())
            .then((added) => {
                setTodos([added, ...todos]);
                setTotal(total + 1);
                setAdding(false);
                closeModal();
            })
            .catch(() => {
                setAddError("Failed to add todo. Please try again.");
                setAdding(false);
            });
    };

    const handleToggleTodo = (todo) => {
        if (Number(todo.userId) !== Number(userId)) {
            return;
        }

        const nextCompleted = !todo.completed;

        fetch(`https://dummyjson.com/todos/${todo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                completed: nextCompleted,
                todo: todo.todo,
                userId: todo.userId || userId || 5,
            }),
        })
            .then(res => res.json())
            .then((updated) => {
                setTodos((currentTodos) =>
                    currentTodos.map((item) =>
                        item.id === todo.id ? { ...item, ...updated, completed: nextCompleted } : item
                    )
                );
            })
            .catch(() => {
                setTodos((currentTodos) =>
                    currentTodos.map((item) =>
                        item.id === todo.id ? { ...item, completed: todo.completed } : item
                    )
                );
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">

<Navbar total={total} loginCount={loginCount} onLogout={handleLogout} />
            <div className="flex-1 flex flex-col px-8 py-8 max-w-4xl w-full mx-auto">

                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                    <FilterToggle filter={filter} setFilter={setFilter} />
                    <button
                        onClick={openModal}
                        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-700 transition">
                        <Plus size={16} />
                        Add Todo
                    </button>
                </div>

                <TodoList
                    todos={todos}
                    loading={loading}
                    error={error}
                    filter={filter}
                    total={total}
                    start={start}
                    end={end}
                    currentUserId={userId}
                    onToggle={handleToggleTodo}
                />

                {!loading && !error && todos.length > 0 && filter === "all" && (
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                )}
            </div>

            {modal && (
                <AddTodoModal
                    onClose={closeModal}
                    onAdd={handleAdd}
                    newTodo={newTodo}
                    setNewTodo={setNewTodo}
                    addError={addError}
                    setAddError={setAddError}
                    adding={adding}
                />
            )}
        </div>
    );
}

export default Dashboard;