import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { Search } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  variant?: "default" | "search" | "minimal";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, variant = "default", className = "", ...props }, ref) => {
    const baseStyles = `
      w-full px-4 py-3 rounded-xl
      bg-white border border-gray-200
      text-gray-900 placeholder-gray-400
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
      disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
    `;

    const variantStyles = {
      default: `
        shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07)]
        hover:border-gray-300
      `,
      search: `
        shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07)]
        hover:border-gray-300
        pl-12
      `,
      minimal: `
        shadow-sm
        hover:border-gray-300
      `,
    };

    const errorStyles = error
      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
      : "";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && variant === "search" && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          {icon && variant !== "search" && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseStyles} ${variantStyles[variant]} ${errorStyles} ${
              icon && variant !== "search" ? "pl-12" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onSearch?: (value: string) => void;
  className?: string;
}

export function SearchInput({ onSearch, className = "", ...props }: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(e.currentTarget.value);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        className={`
          w-full pl-12 pr-4 py-3 rounded-xl
          bg-white border border-gray-200
          text-gray-900 placeholder-gray-400
          shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07)]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
          hover:border-gray-300
          ${className}
        `}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
}

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
}

export function Textarea({ label, error, rows = 4, className = "", ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-xl
          bg-white border border-gray-200
          text-gray-900 placeholder-gray-400
          shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07)]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
          hover:border-gray-300
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          resize-none
          ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = "", ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 rounded-xl
          bg-white border border-gray-200
          text-gray-900
          shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07)]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
          hover:border-gray-300
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          cursor-pointer
          ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
