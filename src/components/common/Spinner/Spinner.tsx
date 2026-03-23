interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

export default function Spinner({
  size = 'md',
  className = '',
  fullScreen = false,
  text,
}: SpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div
      className={`${sizeStyles[size]} animate-spin rounded-full border-primary-600 border-t-transparent ${className}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          {text && <p className="text-secondary-600 font-medium animate-pulse">{text}</p>}
        </div>
      </div>
    );
  }

  if (text) {
    return (
      <div className="flex items-center gap-3">
        {spinner}
        <span className="text-secondary-600 font-medium">{text}</span>
      </div>
    );
  }

  return spinner;
}
