<script>
    import Fraction from "fraction.js";

    export let entry;
    export let foodGroups;
    export let ingredients;

    $: foodGroup = foodGroups[entry.group];
    $: foodGroupIngredients = ingredients.filter(ingredient => ingredient.group === entry.group);
</script>

<div class="collapse bg-base-200">
    <input type="checkbox" name="food-group-entry-accordion-{entry.group}"/>
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
                    <th class="text-left">Ingrediente</th>
                    <th class="text-right w-28 max-w-28">Punto</th>
                    <th class="text-right w-28 max-w-28">Porción</th>
                </tr>
            </thead>
            <tbody>
            {#each foodGroupIngredients as {name, point_exchange, unit}}
                <tr>
                    <td class="text-left">{name}</td>
                    <td class="text-right">{point_exchange} {unit}</td>
                    <td class="text-right">{new Fraction(point_exchange).mul(entry.points).toFraction(true)} {unit}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>