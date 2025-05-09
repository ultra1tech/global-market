
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'default' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'default', 
  className,
  color = 'primary',
  text,
  fullScreen = false,
}) => {
  // Determine size class
  const sizeClass = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  }[size];
  
  // Determine color class
  const colorClass = {
    primary: 'text-marketplace-primary',
    white: 'text-white',
    gray: 'text-gray-500',
  }[color];
  
  const loadingIndicator = (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin", sizeClass, colorClass)} />
      {text && (
        <span className={cn("ml-2 text-sm font-medium", colorClass)}>
          {text}
        </span>
      )}
    </div>
  );
  
  // Return full-screen loader if required
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
        {loadingIndicator}
      </div>
    );
  }
  
  return loadingIndicator;
};

// Create convenient variations of the loader
export const FullScreenLoader = () => (
  <Loader fullScreen size="xl" text="Loading..." />
);

export const ButtonLoader = () => (
  <Loader size="sm" />
);

export const ContentLoader = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex justify-center items-center h-64">
    <Loader size="lg" text={text} />
  </div>
);

export default Loader;
