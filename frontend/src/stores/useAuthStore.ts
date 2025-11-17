import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
    //set de cap nhat state, get de lay trong store
    accessToken: null,
    user: null,
    loading: false,

    signUp: async (username, password, email, lastName, firstName) => {
        try {
            set({ loading: true })
            //call api
            await authService.signUp(username, password, email, lastName, firstName);

            toast.success("Sign up successfully! Please sign in to continue.")
        } catch (error) {
            console.error(error);
            toast.error("Sign up failed. Please try again.");
        } finally {
            set({ loading: false })

        }
    }
}));