import { ChevronLeft, ChevronRight } from "lucide-react"

function Pagination({ page, totalPages, setPage }) {
    return (
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
    )
}

export default Pagination