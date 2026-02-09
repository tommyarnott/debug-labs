import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultTheme = 'dark';

const stored = browser ? localStorage.getItem('theme') : null;
const initial = stored || defaultTheme;

export const theme = writable(initial);

theme.subscribe((value) => {
	if (browser) {
		localStorage.setItem('theme', value);
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
});

export function toggleTheme() {
	theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
}
