<script>
    import database from '../assets/database.json';
    import {IconMenu, IconDots} from '@tabler/icons-svelte';
    import FoodGroupEntry from './FoodGroupEntry.svelte';

    export let key = 'current';
    export let paddingMinutes = 15;

    let {schedules, foodGroups, ingredients} = database;
    function getParamKeyOrCurrent(paramKey) {
        if (paramKey === "current") {
            const now = new Date();
            const scheduleKeyTime = schedules.map(schedule => {
                const todaySchedule = new Date();
                const scheduleHoursMinutes = schedule.time.split(":");
                todaySchedule.setHours(parseInt(scheduleHoursMinutes[0]), parseInt(scheduleHoursMinutes[1]) - paddingMinutes);
                return {"key": schedule.key, "time": todaySchedule}
            }).filter(schedule => schedule.time < now);
            if (scheduleKeyTime.length > 0) {
                return scheduleKeyTime[scheduleKeyTime.length - 1].key;
            } else {
                return schedules[0].key;
            }
        }

        return paramKey;
    }

    function convertScheduleTime(schedule) {
        const todaySchedule = new Date();
        const scheduleHoursMinutes = schedule.time.split(":");
        todaySchedule.setHours(parseInt(scheduleHoursMinutes[0]), parseInt(scheduleHoursMinutes[1]) - paddingMinutes);
        return todaySchedule.getTime();
    }

    $: useKey = getParamKeyOrCurrent(key);
    $: schedule = schedules.filter(schedule => schedule.key === useKey)[0];
    $: requiredPoints = schedule.points.filter(entry => entry.points > 0);
    $: diffMins = Math.round((convertScheduleTime(schedule) - new Date().getTime()) / 60000);
</script>

<div class="navbar bg-base-100">
    <div class="flex-none">
        <label for="app-drawer" class="btn btn-square btn-ghost drawer-button">
            <IconMenu/>
        </label>
    </div>
    <div class="flex-1">
        <h1 class="text-xl">
            {schedule.name}
            <span class="text-accent/25 text-sm">
                &nbsp;@{schedule.time}
                &nbsp;{diffMins > 0 ? 'adelanto de ' : 'retraso de '}{Math.abs(diffMins)} mins.
            </span>
        </h1>
    </div>
    <div class="flex-none">
        <button class="btn btn-square btn-ghost">
            <IconDots/>
        </button>
    </div>
</div>

<div class="container mx-auto px-4 py-2 grid gap-3">
    {#each requiredPoints as entry}
        <FoodGroupEntry {entry} {ingredients} {foodGroups} />
    {/each}
</div>