import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  className = '',
  placeholder = 'Search products...',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/products?search=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div
        className={`
          relative flex items-center rounded-lg border bg-white
          transition-all duration-200
          ${
            isFocused
              ? 'border-primary-500 ring-2 ring-primary-500/20 shadow-md'
              : 'border-secondary-300 hover:border-secondary-400'
          }
        `}
      >
        <svg
          className="w-5 h-5 ml-3 text-secondary-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 bg-transparent text-sm text-secondary-900 placeholder:text-secondary-400 focus:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-2 p-1 rounded-full hover:bg-secondary-100 transition-colors"
          >
            <svg
              className="w-4 h-4 text-secondary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div
        className={`
        absolute -bottom-6 left-0 text-xs text-secondary-400
        transition-opacity duration-200
        ${isFocused && !query ? 'opacity-100' : 'opacity-0'}
      `}
      >
        Press{' '}
        <kbd className="px-1.5 py-0.5 mx-1 rounded bg-secondary-100 border border-secondary-300 font-mono">
          ⌘K
        </kbd>{' '}
        to search
      </div>
    </form>
  );
}
