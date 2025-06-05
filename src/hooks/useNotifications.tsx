
import { useToast } from '@/hooks/use-toast';

export const useNotifications = () => {
  const { toast } = useToast();

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "bg-emerald-50 border-emerald-200 text-emerald-800",
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  return { showSuccess, showError, showInfo };
};
