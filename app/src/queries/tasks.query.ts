import api from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useCreateTask = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (task: { title: string; description: string }) => {
      const response = await api.post('/tasks', task);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  });

}