<script>
    export let entry;
    export let foodGroups;
    export let ingredients;

    $: foodGroup = foodGroups[entry.group];
    $: foodGroupIngredients = ingredients.filter(ingredient => ingredient.group === entry.group);
</script>

<div class="collapse bg-base-200">
    <input type="checkbox" name="food-group-entry-accordion-{entry.group}" />
    <div class="collapse-title text-xl text-md">
        <div class="flex items-center justify-center flex-row">
            <i class="ti ti-{foodGroup.icon}"></i>&nbsp;
            <div class="flex-1">{foodGroup.name}</div>
            <div class="flex-none text-sm">{entry.points} puntos</div>
        </div>
    </div>
    <div class="collapse-content">
        <ul>
        {#each foodGroupIngredients as ingredient}
            <li>{ingredient.name} {ingredient.point_exchange} {ingredient.unit}</li>
        {/each}
        </ul>
    </div>
</div>