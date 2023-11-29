<script>
    import database from '../assets/database.json';
    export let key = 'current';
    export let paddingMinutes = 15;

    let {schedules} = database;
    if (key === 'current') {
        const now = new Date();
        const scheduleKeyTime = schedules.map(schedule => {
            const todaySchedule = new Date();
            const scheduleHoursMinutes = schedule.time.split(":");
            todaySchedule.setHours(parseInt(scheduleHoursMinutes[0]), parseInt(scheduleHoursMinutes[1]) - paddingMinutes);
            return {"key": schedule.key, "time": todaySchedule}
        }).filter(schedule => schedule.time < now);
        if (scheduleKeyTime.length > 0) {
            key = scheduleKeyTime[scheduleKeyTime.length-1].key;
        } else {
            key = schedules[0].key;
        }
    }

    $: schedule = schedules.filter(schedule => schedule.key === key)[0];
</script>

<h1>Showing current schedule or argument uhm... {schedule.name}</h1>
<label for="app-drawer" class="btn btn-primary drawer-button">Open drawer</label>