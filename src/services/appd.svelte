<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";

    interface Item {
        id: number;
        name: string;
    }

    let datosr: Item[] = [];
    let loading: boolean = true;
    let error: string = "";
    let erro2: string = "";
    let editedItem: Item = { id: 0, name: "" };
    const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Coloca la URL correcta de tu API aquí

    onMount(async () => {
        await fetchItems();
    });

    async function fetchItems() {
        try {
            const response = await axios.get(apiUrl);
            datosr = response.data;
        } catch (err) {
            error = "Failed to fetch items";
        } finally {
            loading = false;
        }
    }

    async function updateItem() {
        loading = true;
        erro2 = "";
        try {
            const response = await axios.put(`${apiUrl}/${editedItem.id}`, editedItem);
            const index = datosr.findIndex(item => item.id === editedItem.id);
            if (index !== -1) {
                datosr[index] = response.data;
            }
            editedItem = { id: 0, name: "" }; // Reinicia el formulario
        } catch (err) {
            erro2 = "Failed to update item";
        } finally {
            loading = false;
        }
    }

    function selectItem(item: Item) {
        editedItem = { ...item }; // Clona el item seleccionado para edición
    }
</script>

<style>
    input, textarea {
        display: block;
        margin-bottom: 10px;
    }
</style>

{#if loading}
    <p>Loading...</p>
{:else if error}
    <p>{error}</p>
{:else}
    <h2>Items</h2>
    <ul>
        {#each datosr as item}
            <li>
                {item.name}
                <button on:click={() => selectItem(item)}>Edit</button>
            </li>
        {/each}
    </ul>
    <input type="text" bind:value={editedItem.name} placeholder="Edit item name">
    <button on:click={updateItem}>Update Item</button>
    {#if erro2}
        <p>{erro2}</p>
    {/if}
{/if}
