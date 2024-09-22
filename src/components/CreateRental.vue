<template>
  <div>
    <h2>Create Rental Configuration</h2>
    {{hammers}}
    <form @submit.prevent="submitRental">
      <label for="customer">Customer:</label>
      <select v-model="form.customer" id="customer">
        <option v-for="customer in customers.results"  :value="customer.name">{{ customer.name }}</option>
      </select>

      <label for="hammer">Hammer:</label>
      <select v-model="form.hammer" id="hammer">
        <option v-for="hammer in hammers.results"  :value="hammer.name">{{ hammer.name }}</option>
      </select>

      <label for="clamp">Clamp:</label>
      <select v-model="form.clamp_id" id="clamp">
        <option v-for="clamp in clamps.results"  :value="clamp.name">{{ clamp.name }}</option>
      </select>

      <label for="powerPack">Power Pack:</label>
      <select v-model="form.power_pack_id" id="powerPack">
        <option v-for="pack in powerPacks.results"  :value="pack.name">{{ pack.name }}</option>
      </select>

      <label for="bar">Bar:</label>
      <select v-model="form.bar_id" id="bar">
        <option v-for="bar in bars.results"  :value="bar.name">{{ bar.name }}</option>
      </select>

      <label for="jaw">Jaw:</label>
      <select v-model="form.jaw_id" id="jaw">
        <option v-for="jaw in jaws.results"  :value="jaw.name">{{ jaw.name }}</option>
      </select>

      <label for="additionalComponents">Additional Components:</label>
      <select v-model="form.additional_components" multiple id="additionalComponents">
        <option v-for="component in components.results"  :value="component.name">{{ component.name }}</option>
      </select>

      <label for="startDate">Start Date:</label>
      <input type="date" v-model="form.rental_date" id="rentalDate" required />

      <label for="endDate">End Date:</label>
      <input type="date" v-model="form.end_date" id="endDate" required />

      <button type="submit">Create Rental</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {getCookie} from "@/utilities";

// need to do this for all and move it to another file types

type Hammer = {
  name: string;
  serial_number: string;
  description: string;
  weight: number | null;
  dimensions: string;
  is_available: boolean;
};

type PaginatedHammerResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Hammer[];
};

// Reactive state variables
const hammers : ref<PaginatedHammerResponse> = ref([]);
const clamps = ref([]);
const powerPacks = ref([]);
const bars = ref([]);
const jaws = ref([]);
const components = ref([]);
const customers = ref([]);

// Form data
const form = ref({
  customer:'',
  hammer: '',
  clamp_id: '',
  power_pack_id: '',
  bar_id: '',
  jaw_id: '',
  additional_components: [],
  rental_date: '',
  end_date: ''
});



// Function to fetch data from the API
const fetchData = async () => {

  try {
    const responses = await Promise.all([
      fetch('http://localhost:8000/accounts/api/hammers/',{credentials: 'include' }).then(res => res.json()),
      fetch('http://localhost:8000/accounts/api/clamps/',{credentials: 'include' }).then(res => res.json()),
      fetch('http://localhost:8000/accounts/api/powerpacks/',{credentials: 'include' }).then(res => res.json()),
      fetch('http://localhost:8000/accounts/api/bars/',{credentials: 'include' }).then(res => res.json()),
      fetch('http://localhost:8000/accounts/api/jaws/',{credentials: 'include' }).then(res => res.json()),
      fetch('http://localhost:8000/accounts/api/components/',{credentials: 'include' }).then(res => res.json()),
      fetch('http://localhost:8000/accounts/api/customers/',{credentials: 'include' }).then(res => res.json()),
    ]);

    // Assign fetched data to reactive state
    [hammers.value, clamps.value, powerPacks.value, bars.value, jaws.value, components.value,customers.value] = responses;



  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to submit the rental configuration
const submitRental = async () => {
  const csrftoken = getCookie('csrftoken');
console.log(form.value);
  try {
    const response = await fetch('http://localhost:8000/accounts/api/rentals/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken, // Get CSRF token from cookies// Include JWT token
      },
      body: JSON.stringify(form.value)
    });



    const data = await response.json();
    console.log("Rental created successfully:", data);
    // Optionally reset the form or redirect
  } catch (error) {
    console.error("Error creating rental:", error);
  }
};

// Fetch data when the component mounts
onMounted(()=>{

  fetchData()





});
</script>

<style scoped>
/* Add your styles here */
</style>
