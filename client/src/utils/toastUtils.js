import { useToast } from "@/hooks/use-toast";

export const showToast = (toast, title, description, status) => {
  toast({
    title,
    description,
    status,
    variant: status === "success" ? "safe" : "destructive",
  });
};