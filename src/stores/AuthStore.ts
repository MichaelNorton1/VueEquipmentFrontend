import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {checkAuthentication} from "@/utilities";

export const useAuthStore = defineStore('counter', () => {





  const isAuth =async ()=>{

    return await checkAuthentication();
  }

  return{isAuth}
})
