<script>
    import db from "../assets/database.json";
    import {Router, Link, Route} from 'svelte-routing';
    import {IconCalendar, IconDatabase} from '@tabler/icons-svelte';
    import ScheduleEntryView from "./ScheduleEntry.svelte";
    import ExploreDatabaseView from "./ExploreDatabase.svelte";

    export let url = "";
    let {schedules} = db;
</script>

<Router {url}>
    <div class="drawer">
        <input id="app-drawer" type="checkbox" class="drawer-toggle"/>
        <div class="drawer-content">
            <div>
                <Route path="/" component={ScheduleEntryView}/>
                <Route path="/schedule/:key" let:params>
                    <ScheduleEntryView key={params.key}/>
                </Route>
                <Route path="/explore" component={ExploreDatabaseView}/>
            </div>
        </div>
        <div class="drawer-side">
            <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-50">
                <li>
                    <Link to="/">
                        <IconCalendar />
                        Ahora mismo
                    </Link>
                </li>
                <li>
                    <h2 class="menu-title">Tiempos</h2>
                    <ul>
                        {#each schedules as {key, name}}
                            <li>
                                <Link to="/schedule/{key}">{name}</Link>
                            </li>
                        {/each}
                    </ul>
                </li>
                <li>
                    <Link to="/explore">
                        <IconDatabase />
                        Explorar
                    </Link>
                </li>
            </ul>
        </div>
    </div>
</Router>