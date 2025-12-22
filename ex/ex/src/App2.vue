<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login">
      <input v-model="username" placeholder="Usuario" required />
      <input v-model="password" placeholder="Contraseña" type="password" required />
      <button type="submit">Entrar</button>
    </form>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup(_, { emit }) {
    const username = ref("");
    const password = ref("");

    const error = ref("");

    const login = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/users/login", {
          username: username.value,
          password: password.value
        });

        if (res.data.success) {
          emit("login-success");  // 🔵 avisa al padre
        }
      } catch {
        error.value = "Usuario o contraseña incorrectos";
      }
    };

    return { username, password, error, login };
  }
};
</script>
