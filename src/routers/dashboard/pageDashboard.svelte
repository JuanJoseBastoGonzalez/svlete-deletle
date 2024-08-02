<!-- src/pages/Dashboard.svelte -->
<script>
    import { onMount } from 'svelte';
    let token = localStorage.getItem('token');
    let data = '';
  
    onMount(async () => {
      if (!token) {
        // Redirigir al login si no hay token
        window.location.href = '/login';
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/protected', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
  
        if (response.ok) {
          data = await response.json();
        } else {
          // Manejar errores, como redirigir al login
          window.location.href = '/login';
        }
      } catch (err) {
        console.error('Error fetching protected data:', err);
      }
    });
    function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirigir al login
  }
  </script>
  
  <h1>Dashboard</h1>
  <p>{data}</p>
  <button on:click={logout}>Logout</button>
<h1>ESTE ES EL DASHBOARD</h1>