<!-- src/App.svelte -->
<script>
  import Dashboard from './routers/dashboard/pageDashboard.svelte';
  import Login from './routers/login/pageLogin.svelte';
  
  let currentPage = 'Login';

  function navigate(event) {
    currentPage = event.detail.page;
  }

  function renderPage() {
    switch (currentPage) {
      case 'Login':
        return Login;
  
      case 'dashboard':
        return Dashboard;
      default:
        return Login;
    }
  }
  
  $: {
    // Listener for hash changes
    window.addEventListener('hashchange', () => {
      currentPage = location.hash.slice(1) || 'Login';
    });
    // Initialize page based on hash
    currentPage = location.hash.slice(1) || 'Login';
  }
</script>

<style>
  nav {
    margin-bottom: 1em;
  }
  a {
    margin-right: 1em;
  }
</style>

<!-- <nav>
  <a href="#Login">Home</a>

  <a href="#dashboard">Dashboard</a>
</nav> -->

{#if currentPage === 'Login'}
  <Login />
{:else if currentPage === 'dashboard'}
  <Dashboard />
{/if}
