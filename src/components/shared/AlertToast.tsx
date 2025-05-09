
import React from 'react';
import { toast } from 'sonner';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  XCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertToastProps {
  title: string;
  message: string;
  type?: AlertType;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const getToastIcon = (type: AlertType) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'error':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'warning':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case 'info':
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

export const AlertToast = ({ 
  title, 
  message, 
  type = 'info',
  action
}: AlertToastProps) => {
  const icon = getToastIcon(type);
  
  return (
    <div className="flex items-start gap-3 w-full">
      <div className="flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-sm text-gray-500">{message}</p>
        {action && (
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto mt-1 font-medium text-marketplace-primary hover:text-marketplace-primary/80"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

// Helper functions to show toasts
export const showSuccessToast = (title: string, message: string, action?: AlertToastProps['action']) => {
  toast.custom(
    <AlertToast
      title={title}
      message={message}
      type="success"
      action={action}
    />
  );
};

export const showErrorToast = (title: string, message: string, action?: AlertToastProps['action']) => {
  toast.custom(
    <AlertToast
      title={title}
      message={message}
      type="error"
      action={action}
    />
  );
};

export const showWarningToast = (title: string, message: string, action?: AlertToastProps['action']) => {
  toast.custom(
    <AlertToast
      title={title}
      message={message}
      type="warning"
      action={action}
    />
  );
};

export const showInfoToast = (title: string, message: string, action?: AlertToastProps['action']) => {
  toast.custom(
    <AlertToast
      title={title}
      message={message}
      type="info"
      action={action}
    />
  );
};
