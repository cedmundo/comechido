<script>
    import Fraction from "fraction.js";
    import { favorites } from '../stores/favorites.js';
    import { IconStar, IconStarFilled } from '@tabler/icons-svelte';

    export let entry;
    export let foodGroups;
    export let ingredients;

    $: showAll = false;
    $: foodGroup = foodGroups[entry.group];
    $: favouriteIngredients = entry.group in $favorites ? $favorites[entry.group] : [];
    $: foodGroupIngredients = ingredients
        .filter(ingredient => ingredient.group === entry.group)
        .filter(ingredient => showAll || favouriteIngredients.includes(ingredient.name) || favouriteIngredients.length === 0);

    function handleToggleFavorite(name) {
        if (!(entry.group in $favorites)) {
            $favorites[entry.group] = [];
        }

        const idx = $favorites[entry.group].indexOf(name);
        console.log(idx);
        if (idx > -1) {
            $favorites[entry.group].splice(idx, 1)
            $favorites[entry.group] = $favorites[entry.group];
        } else {
            $favorites[entry.group] = [ ...$favorites[entry.group], name ];
        }
    }
</script>

<div class="collapse bg-base-200">
    <input type="checkbox" name="food-group-entry-accordion-{foodGroup.name}"/>
    <div class="collapse-title text-xl text-md">
        <div class="flex items-center justify-center flex-row">
            <i class="ti ti-{foodGroup.icon}"></i>&nbsp;
            <div class="flex-1">{foodGroup.name}</div>
            <div class="flex-none text-sm">{entry.points} puntos</div>
        </div>
    </div>
    <div class="collapse-content px-10">
        <table class="table-auto w-full my-2">
            <thead>
                <tr>
                    <th class="text-center w-5 max-w-5"></th>
                    <th class="text-left">Ingrediente</th>
                    <th class="text-right w-28 max-w-28">Punto</th>
                    <th class="text-right w-28 max-w-28">Porción</th>
                </tr>
            </thead>
            <tbody>
            {#each foodGroupIngredients as {name, pointExchange, unit}}
                <tr>
                    <th class="text-center">
                        <button on:click={() => handleToggleFavorite(name)} class="btn btn-ghost btn-sm">
                        {#if favouriteIngredients.includes(name)}
                            <IconStarFilled color="white" size="12" />
                        {:else}
                            <IconStar color="white" size="12" />
                        {/if}
                        </button>
                    </th>
                    <td class="text-left">{name}</td>
                    <td class="text-right">{pointExchange} {unit}</td>
                    <td class="text-right">{new Fraction(pointExchange).mul(entry.points).toFraction(true)} {unit}</td>
                </tr>
            {/each}
            </tbody>
            {#if favouriteIngredients.length > 0}
            <tr>
                <td class="text-center" colspan="3">
                    <input id="input-show-all-{foodGroup.name}" type="checkbox" bind:checked={showAll} class="peer hidden">
                    <label for="input-show-all-{foodGroup.name}" class="btn btn-ghost">{showAll ? 'Mostrar favoritos' : 'Mostrar todos'}</label>
                </td>
            </tr>
            {/if}
        </table>
    </div>
</div>