import React, { useState, useEffect, useRef } from "react";
import ApiService from "../../api/ApiService";
import {Page} from "../../interfaces/lock_history/Page";
import {LockEntryDTO} from "../../interfaces/lock_history/LockEntryDTO";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, Search, Calendar, X} from "lucide-react";
import {LockHistoryEntry} from "../../interfaces/lock_history/LockHistoryEntry";

export interface LockHistoryTableWithApiProps {
    page?: number;
    size?: number;
}

interface SearchableDropdownProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    loading?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
                                                                   options,
                                                                   value,
                                                                   onChange,
                                                                   placeholder,
                                                                   loading = false
                                                               }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    const clearSelection = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`truncate ${value ? 'text-gray-900' : 'text-gray-500'}`}>
                    {value || placeholder}
                </span>
                <div className="flex items-center gap-1">
                    {value && (
                        <button
                            onClick={clearSelection}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Clear selection"
                        >
                            <X size={14} className="text-gray-400" />
                        </button>
                    )}
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
                    <div className="p-2 border-b">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>

                    <div className="max-h-40 overflow-y-auto">
                        {loading ? (
                            <div className="p-3 text-center text-gray-500">Loading...</div>
                        ) : filteredOptions.length === 0 ? (
                            <div className="p-3 text-center text-gray-500">No options found</div>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm truncate"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

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
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCardName, setSelectedCardName] = useState('');
    const [selectedCardCode, setSelectedCardCode] = useState('');

    const [cardNames, setCardNames] = useState<string[]>([]);
    const [cardCodes, setCardCodes] = useState<string[]>([]);
    const [loadingOptions, setLoadingOptions] = useState(false);

    const fetchOptions = async () => {
        setLoadingOptions(true);
        try {
            const data: Page<LockEntryDTO> = await ApiService.searchPaginatedLockEntries(0, 1000);

            const uniqueCardNames = Array.from(new Set(data.content.map(entry => entry.cardName)))
                .filter(Boolean)
                .sort();

            const uniqueCardCodes = Array.from(new Set(data.content.map(entry => entry.cardHexCode)))
                .filter(Boolean)
                .sort();


            setCardNames(uniqueCardNames);
            setCardCodes(uniqueCardCodes);
        } catch (err) {
            console.error('Error fetching filter options:', err);
        } finally {
            setLoadingOptions(false);
        }
    };

    const fetchHistory = async (page: number, size: number, date?: string, cardName?: string, cardCode?: string) => {
        setLoading(true);
        setError(null);

        try {
            const data: Page<LockEntryDTO> = await ApiService.searchPaginatedLockEntries(
                page,
                size,
                date || undefined,
                cardName || undefined,
                cardCode || undefined
            );

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
        fetchOptions();
    }, []);

    useEffect(() => {
        fetchHistory(currentPage, pageSize, selectedDate, selectedCardName, selectedCardCode);
    }, [currentPage, pageSize, selectedDate, selectedCardName, selectedCardCode]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(0); // Reset to first page when changing size
    };

    const handleFilterChange = () => {
        setCurrentPage(0); // Reset to first page when filters change
    };

    const clearAllFilters = () => {
        setSelectedDate('');
        setSelectedCardName('');
        setSelectedCardCode('');
        setCurrentPage(0);
    };

    const hasActiveFilters = selectedDate || selectedCardName || selectedCardCode;

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(0, currentPage - 2);
            let end = Math.min(totalPages - 1, currentPage + 2);

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

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-8 text-center">
                    <div className="text-red-500 mb-4">Error: {error}</div>
                    <button
                        onClick={() => fetchHistory(currentPage, pageSize, selectedDate, selectedCardName, selectedCardCode)}
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
            {/* Filters Section */}
            <div className="p-4 border-b bg-gray-50">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Search Filters</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Date Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {selectedDate && (
                                    <button
                                        onClick={() => setSelectedDate('')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                                        title="Clear date"
                                    >
                                        <X size={14} className="text-gray-400" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Card Name Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Card Name
                            </label>
                            <SearchableDropdown
                                options={cardNames}
                                value={selectedCardName}
                                onChange={setSelectedCardName}
                                placeholder="Select card name..."
                                loading={loadingOptions}
                            />
                        </div>

                        {/* Card Code Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Card Code
                            </label>
                            <SearchableDropdown
                                options={cardCodes}
                                value={selectedCardCode}
                                onChange={setSelectedCardCode}
                                placeholder="Select card code..."
                                loading={loadingOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="p-8 text-center">
                    <div className="text-gray-500">Loading lock history...</div>
                </div>
            )}

            {/* Table */}
            {!loading && (
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
                                    {hasActiveFilters ? 'No entries match your search criteria' : 'No lock history available'}
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
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 0 && (
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