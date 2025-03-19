import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";

export const useAuthRegister = () => {

  return useMutation({
    mutationFn: async (user: { email: string; username: string; password: string }) => {
      const response = await api.post('/auth/register', user);
      return response.data;
    },
  });

}
export const useAuthLogin = () => {

  return useMutation({
    mutationFn: async (user: { username: string; password: string }) => {
      const response = await api.post('/auth/login', user);
      return response.data;
    },
  });

}