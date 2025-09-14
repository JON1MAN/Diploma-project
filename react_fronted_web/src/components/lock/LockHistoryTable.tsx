import React, { useState, useEffect } from "react";
import ApiService from "../../api/ApiService";
import {Page} from "../../interfaces/lock_history/Page";
import {LockEntryDTO} from "../../interfaces/lock_history/LockEntryDTO";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import {LockHistoryEntry} from "../../interfaces/lock_history/LockHistoryEntry";

export interface LockHistoryTableWithApiProps {
    page?: number;
    size?: number;
}

const LockHistoryTable: React.FC<LockHistoryTableWithApiProps> = ({
                                                                      page = 0,
                                                                      size = 20
                                                                  }) => {
    const [history, setHistory] = useState<LockHistoryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(page);
    const [pageSize, setPageSize] = useState(size);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const fetchHistory = async (page: number, size: number) => {
        setLoading(true);
        setError(null);

        try {
            const data: Page<LockEntryDTO> = await ApiService.getPaginatedLockEntries(page, size);

            // Transform backend data to match table format
            const transformedData = data.content.map(entry => ({
                id: entry.id,
                time: new Date(entry.createdAt).toLocaleString(),
                cardName: entry.cardName,
                cardCode: entry.cardHexCode
            }));

            setHistory(transformedData);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            setCurrentPage(page);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch lock history');
            setHistory([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory(currentPage, pageSize);
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchHistory(newPage, pageSize);
        }
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        fetchHistory(0, newSize); // Reset to first page when changing size
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total is small
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show current page and surrounding pages
            let start = Math.max(0, currentPage - 2);
            let end = Math.min(totalPages - 1, currentPage + 2);

            // Adjust if we're near the beginning or end
            if (currentPage < 2) {
                end = Math.min(totalPages - 1, 4);
            } else if (currentPage > totalPages - 3) {
                start = Math.max(0, totalPages - 5);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-8 text-center">
                    <div className="text-gray-500">Loading lock history...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-8 text-center">
                    <div className="text-red-500 mb-4">Error: {error}</div>
                    <button
                        onClick={() => fetchHistory(currentPage, pageSize)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-4 text-left font-medium text-gray-700">Time</th>
                        <th className="p-4 text-left font-medium text-gray-700">Card Name</th>
                        <th className="p-4 text-left font-medium text-gray-700">Card Code</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="p-8 text-center text-gray-500">
                                No lock history available
                            </td>
                        </tr>
                    ) : (
                        history.map((entry) => (
                            <tr key={entry.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-900">{entry.time}</td>
                                <td className="p-4 text-gray-900">{entry.cardName}</td>
                                <td className="p-4 text-gray-700 font-mono">{entry.cardCode}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 0 && (
                <div className="px-4 py-3 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* Page Size Selector */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Show</span>
                        <select
                            value={pageSize}
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span>entries per page</span>
                    </div>

                    {/* Page Info */}
                    <div className="text-sm text-gray-600">
                        Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements} entries
                    </div>

                    {/* Pagination Buttons */}
                    <div className="flex items-center gap-1">
                        {/* First Page */}
                        <button
                            onClick={() => handlePageChange(0)}
                            disabled={currentPage === 0}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="First page"
                        >
                            <ChevronsLeft size={16} />
                        </button>

                        {/* Previous Page */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Previous page"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {/* Page Numbers */}
                        <div className="flex gap-1 mx-2">
                            {getPageNumbers().map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-1 text-sm rounded transition-colors ${
                                        pageNum === currentPage
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {pageNum + 1}
                                </button>
                            ))}
                        </div>

                        {/* Next Page */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages - 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Next page"
                        >
                            <ChevronRight size={16} />
                        </button>

                        {/* Last Page */}
                        <button
                            onClick={() => handlePageChange(totalPages - 1)}
                            disabled={currentPage >= totalPages - 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Last page"
                        >
                            <ChevronsRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LockHistoryTable;