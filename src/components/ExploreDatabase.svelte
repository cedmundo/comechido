<script>
    import {IconMenu, IconDots, IconStar, IconStarFilled} from '@tabler/icons-svelte';
    import {favorites} from "../stores/favorites.js";
    import database from "../assets/database.json";

    $: ingredients = database.ingredients;
    $: foodGroups = database.foodGroups;

    function groupFavorites(group) {
        return group in $favorites ? $favorites[group] : []
    }
</script>

<div class="navbar bg-base-100">
    <div class="flex-none">
        <label for="app-drawer" class="btn btn-square btn-ghost drawer-button">
            <IconMenu/>
        </label>
    </div>
    <div class="flex-1">
        <h1 class="text-xl">Explorar</h1>
    </div>
    <div class="flex-none">
        <button class="btn btn-square btn-ghost">
            <IconDots/>
        </button>
    </div>
</div>

<div class="container mx-auto my-5">
    <h2 class="text-xl font-bold my-3">Ingredientes</h2>
    <table class="table-auto w-full border-collapse border border-slate-500 px-2">
        <thead>
        <tr>
            <th class="border border-slate-600 text-center px-1">Grupo</th>
            <th class="border border-slate-600 text-left px-1">Ingrediente</th>
            <th class="border border-slate-600 text-right px-1">Cantidad</th>
            <th class="border border-slate-600 text-right px-1">Unidad</th>
        </tr>
        </thead>
        <tbody>
        {#each ingredients as {group, name, pointExchange, unit} }
            <tr>
                <td class="border border-slate-600 text-center px-1">{foodGroups[group].name}</td>
                <td class="border border-slate-600 text-left px-1">
                    <div class="flex inline-flex items-center justify-start">
                        {#if groupFavorites(group).includes(name) }
                            <IconStarFilled color="white" size="12"/>
                        {:else}
                            <IconStar color="white" size="12"/>
                        {/if}
                        &nbsp;{name}
                    </div>
                </td>
                <td class="border border-slate-600 text-right px-1">{pointExchange}</td>
                <td class="border border-slate-600 text-right px-1">{unit}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <aside>
        <p>Copyright © 2023 - All right reserved by CM.</p>
    </aside>
</footer>