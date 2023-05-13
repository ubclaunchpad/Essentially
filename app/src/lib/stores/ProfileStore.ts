import { writable } from 'svelte/store';
const profileStore = writable('');
profileStore.set('armintalaie.two@gmail.com');
export { profileStore };
