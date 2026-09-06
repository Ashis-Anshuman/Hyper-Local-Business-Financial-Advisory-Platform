import {create} from "zustand"; 

export const userAuthStore = create((set) =>({
    authenticated: null,
    isAuthenticated: false,


}))