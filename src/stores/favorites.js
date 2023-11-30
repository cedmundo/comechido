import {persisted} from 'svelte-persisted-store';

export const favorites = persisted('favorites', {});
