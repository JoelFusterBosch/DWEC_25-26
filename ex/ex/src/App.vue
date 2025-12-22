<template>
  <div>
    <h1>Productes</h1>

    <form @submit.prevent="guardarProducte">
      <input v-model="form.name" placeholder="Nom" required />
      <input v-model.number="form.price" placeholder="Preu" type="number" step="1" required />
      <button type="submit">{{ form.id ? "Actualitzar" : "Agregar" }}</button>
      <button v-if="form.id" type="button" @click="cancelarEdicio">Cancelar</button>
    </form>

    <hr />

    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Preu</th>
          <th>Accions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button @click="editarProducte(product)">Editar</button>
            <button @click="eliminarProducte(product.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="loading">Carregant productes...</p>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const products = ref([]);
    const loading = ref(true);

    const form = reactive({
      id: null,
      name: "",
      price: 0
    });

    const obtindreProductes = async () => {
      loading.value = true;
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        products.value = res.data;
      } catch (error) {
        console.error("Error carregant productes:", error);
      } finally {
        loading.value = false;
      }
    };

    const guardarProducte = async () => {
      try {
        const payload = {
          name: form.name,
          price: parseInt(form.price)
        };
        if (form.id) {
          await axios.put(`http://localhost:3000/api/products/${form.id}`, payload);
        } else {
          await axios.post("http://localhost:3000/api/products", payload);
        }
        cancelarEdicio();
        await obtindreProductes();
      } catch (error) {
        console.error("Error guardant el producte:", error);
      }
    };

    const eliminarProducte = async (id) => {
      if (!confirm("¿Segur que vols eliminar este producte?")) return;
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        await obtindreProductes();
      } catch (error) {
        console.error("Error eliminant el producte:", error);
      }
    };

    const editarProducte = (product) => {
      form.id = product.id;
      form.name = product.name;
      form.price = product.price;
    };

    const cancelarEdicio = () => {
      form.id = null;
      form.name = "";
      form.price = 0;
    };

    onMounted(() => {
      obtindreProductes();
    });

    return {
      products,
      loading,
      form,
      obtindreProductes,
      guardarProducte,
      eliminarProducte,
      editarProducte,
      cancelarEdicio
    };
  }
};
</script>
