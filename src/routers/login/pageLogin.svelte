<!-- <script lang="ts">
    import Dashboard from "../dashboard/pageDashboard.svelte";
    export let name: string;
    let currentPage: string = "Dashboard";
    let userName = "";
    let userPass = "";
    let errorMessage = "";
    function navigate(event: Event) {
        const target = event.target as HTMLAnchorElement;
        currentPage = target.hash.slice(1);
    }
    function renderPage() {
        switch (currentPage) {
            case "Dashboard":
                return Dashboard;
            default:
                return null; 
                 }
    }
    $: {
        window.addEventListener("hashchange", () => {
            currentPage = location.hash.slice(1) || "Dashboard";
        });
        currentPage = location.hash.slice(1) || "Dashboard";
    }
    function userValide() {
        if (userName === "admin") {
            console.log("Good");
            errorMessage = "";
            var dato1:boolean = true;
                } else {
            errorMessage = "Fail: Invalid user";
            console.log(errorMessage);
        }
    }

    function passValide() {
        if (userPass === "123") {
            localStorage.setItem("pass", userPass); // Store the password in localStorage (consider security implications)
            console.log("Password stored in localStorage");
            errorMessage = ""; 
            var dato2:boolean = true;
        } else {
            errorMessage = "Invalid password";
            console.log(errorMessage);
        }
    }


    
</script>

<h1>Iniciar sesion</h1>


{#if currentPage === "Dashboard"}
    <svelte:component this={renderPage()} />
{/if}
<div>
    <div class="inputs">
        <input
            on:change={userValide}
            bind:value={userName}
            placeholder="Ingrese su usuario"
            required
        />
        <input
            on:change={passValide}
            bind:value={userPass}
            placeholder="Ingrese su contraseña"
            required
        />
    </div>
    <div>
        <button>Ingresar</button>
        <button>Registrarce</button>
    </div>
</div>
 -->
<!-- src/pages/Login.svelte -->
<!-- <script>
    import { createEventDispatcher } from 'svelte';
   
    import Dashboard from "../dashboard/pageDashboard.svelte";

    let currentPage: string = "Dashboard";

    const dispatch = createEventDispatcher();
    let username = '';
    let password = '';
    let error = '';

    async function login() {
        // Validación de usuario y contraseña antes de enviar la solicitud
        if (!userValide() || !passValide()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Guardar el token en el almacenamiento local
                dispatch('login');
                currentPage = "Dashboard" // Notificar a los componentes padres que el usuario ha iniciado sesión
            } else {
                const errorData = await response.json();
                error = errorData.error;
          
            }
        } catch (err) {
            error = 'An error occurred';
            console.log("fallo la conexion")

        }
    }

    function userValide() {
        // Validación del usuario
        if (username === "admin") {
            error = ""; // Limpia el mensaje de error si el usuario es válido
            return true;
        } else {
            error = "Fail: Invalid user";
            console.log(error);
            return false;
        }
    }

    function passValide() {
        // Validación de la contraseña
        if (password === "123") {
            localStorage.setItem("password", password); // Guarda la contraseña en localStorage (considera implicaciones de seguridad)
            console.log("Password stored in localStorage");
            error = ""; // Limpia el mensaje de error si la contraseña es válida
            return true;
        } else {
            error = "Invalid password";
            console.log(error);
            return false;
        }
    }


    function navigate(event: Event) {
        const target = event.target as HTMLAnchorElement;
        currentPage = target.hash.slice(1);
    }
    function renderPage() {
        switch (currentPage) {
            case "Dashboard":
                return Dashboard;
            default:
                return null; 
                 }
    }
    $: {
        window.addEventListener("hashchange", () => {
            currentPage = location.hash.slice(1) || "Dashboard";
        });
        currentPage = location.hash.slice(1) || "Dashboard";
    }

</script>

<h1>Login</h1>
{#if !error}
    <p>{error}</p>
{/if}
<form on:submit|preventDefault={login}>
    <div class="inputs">
        <label>
            <input type="text" bind:value={username} placeholder="Usuario"/>
        </label>
        <label>
            <input type="password" bind:value={password} placeholder="Contraseña"/>
        </label>
    </div>
    <button type="submit">Login</button>
</form>
{#if currentPage === "Dashboard"}
    <svelte:component this={renderPage()} />
{/if}
 -->
 <script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Dashboard from "../dashboard/pageDashboard.svelte";

    const dispatch = createEventDispatcher();
    let currentPage: string = "Dashboard";
    let username = '';
    let password = '';
    let error = '';

    async function login() {
        // Validación de usuario y contraseña antes de enviar la solicitud
        if (!userValide() || !passValide()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Guardar el token en el almacenamiento local
                dispatch('login');
                currentPage = "Dashboard"; // Cambiar a la página Dashboard
            } else {
                const errorData = await response.json();
                error = errorData.error;
            }
        } catch (err) {
            error = 'An error occurred';
            console.log("fallo la conexion");
        }
    }

    function userValide() {
        // Validación del usuario
        if (username === "admin") {
          // Limpia el mensaje de error si el usuario es válido
           alert("ok")
        } else {
            error = "Fail: Invalid user";
            console.log(error);
           
        }
    }

    function passValide() {
        // Validación de la contraseña
        if (password === "123") {
          
         alert("usuario ok") // Limpia el mensaje de error si la contraseña es válida
           
        } else {
            error = "Invalid password";
            console.log(error);
           
        }
    }

    function navigate(event: Event) {
        const target = event.target as HTMLElement;
        if (target instanceof HTMLAnchorElement) {
            currentPage = target.hash.slice(1);
        }
    }

    function renderPage() {
        switch (currentPage) {
            case "Dashboard":
                return Dashboard;
            default:
                return null;
        }
    }

    // Manejo de cambios en la URL
    $: {
        window.addEventListener("hashchange", () => {
            currentPage = location.hash.slice(1) || "Dashboard";
        });
        currentPage = location.hash.slice(1) || "Dashboard";
    }

    
</script>

<h1>Login</h1>
{#if error}
    <p>{error}</p>

    {:else if userValide != false}
    <form on:submit|preventDefault={login}>
        <div class="inputs">
            <label>
                <input type="text" bind:value={username} on:change={userValide} placeholder="Usuario"/>
            </label>
            <label>
                <input type="password" bind:value={password} on:change={passValide} placeholder="Contraseña"/>
            </label>
        </div>
        <button type="submit">Login</button>
     
       <!-- {#if currentPage === "Dashboard"} -->
   
        <!-- {/if} -->
    </form>
    <!-- <svelte:component this={renderPage()} />  LLAMERLO DESDE EL SCRIP PARA EVITAR EL TAM DE REINICIO DE VAIABLES-->

{/if}


