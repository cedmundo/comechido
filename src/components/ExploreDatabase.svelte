<script>
    import {IconMenu, IconDots} from '@tabler/icons-svelte';
</script>
<div class="navbar bg-base-100">
    <div class="flex-none">
        <label for="app-drawer" class="btn btn-square btn-ghost drawer-button"><IconMenu/></label>
    </div>
    <div class="flex-1">
        <h1 class="text-xl">Explorar</h1>
    </div>
    <div class="flex-none">
        <button class="btn btn-square btn-ghost"><IconDots/></button>
    </div>
</div>