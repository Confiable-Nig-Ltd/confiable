import { toast } from "sonner";

export const useToast = () => {
  return {
    toast: (options) => {
      if (typeof options === "string") {
        return toast(options);
      }
      const { title, description, ...rest } = options;
      return toast(title, {
        description,
        ...rest,
      });
    },
  };
};
