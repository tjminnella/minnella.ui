/** Props for the Button component */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Button component with multiple variants and sizes.
 * A reusable button component that supports different visual styles and sizes.
 * @param children - Button content (text or elements)
 * @param variant - Visual style variant (default: 'primary')
 * @param size - Button size (default: 'md')
 * @param disabled - Whether the button is disabled
 * @param className - Additional CSS classes
 * @param props - Standard HTML button attributes
 * @returns A styled button element
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'btn';
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  };
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
