<script setup lang="ts">

import {onMounted, ref} from "vue";
import {fetchLinks, getCookie} from "@/utilities";
import CreateRental from "@/components/CreateRental.vue";
import {useAuthStore} from "@/stores/AuthStore";

const links=ref([])

const accessToken = getCookie('access_token');



const isAuthenticated=ref(false)

console.log(accessToken); // true or false
onMounted(async ()=>{

  try{     const authStore = useAuthStore();
    isAuthenticated.value =await authStore.isAuth()
console.log(isAuthenticated.value)
  }
  catch (e){
    console.error(e);
  }



let fetchData = await fetchLinks()
  links.value = await fetchData.json()


})
</script>

<template>
  <header>


    <div class="wrapper">
{{links}}
    </div>
  </header>

  <main>
<CreateRental v-if="isAuthenticated" ></CreateRental>
    <div v-else><a href="http://localhost:8000/accounts/login/">Login</a></div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
