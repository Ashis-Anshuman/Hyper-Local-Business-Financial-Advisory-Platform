import {create} from "zustand"; 
import { apiInstance } from "../services/api";

export const userAuthStore = create((set) =>({
    authenticated: null,
    isAuthenticated: false,
    user: null,
    

    checkAuth: async () => {
        try {
            // const res = await apiInstance
        } catch (error) {
            
        }
    }

}))