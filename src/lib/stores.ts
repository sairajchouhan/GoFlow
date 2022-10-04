import { writable } from 'svelte/store';

function createSettingsStore() {
	const { subscribe, set, update } = writable({
		timers: {
			mainTimer: {
				minutes: 25,
				seconds: 0,
				name: 'Main Timer',
				key: 'main' as const
			},
			breakTimer: {
				minutes: 5,
				seconds: 0,
				name: 'Break Timer',
				key: 'break' as const
			}
		}
	});

	return {
		subscribe
	};
}

export const settings = createSettingsStore();
