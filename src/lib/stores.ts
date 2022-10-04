import { writable } from 'svelte/store';

const breakTimerDefaultValues = {
	work: {
		minutes: 25,
		seconds: 0,
		key: 'main' as const
	},
	break: {
		minutes: 5,
		seconds: 0,
		key: 'break' as const
	}
};

const defaultSettings = {
	timers: breakTimerDefaultValues
};

type SessionTimer = typeof breakTimerDefaultValues;
type UpdateSessionTimerArg = {
	[key in keyof SessionTimer]: {
		minutes: number;
		seconds: number;
	};
};

function createSettingsStore() {
	const { subscribe, update, set } = writable(defaultSettings);

	const updateSessionTimer = (timer: UpdateSessionTimerArg) => {
		update((settings) => {
			const tempSettings = {
				timers: {
					work: {
						...settings.timers.work,
						seconds: timer.work.seconds,
						minutes: timer.work.minutes
					},
					break: {
						...settings.timers.break,
						seconds: timer.break.seconds,
						minutes: timer.break.minutes
					}
				}
			};
			localStorage.setItem('settings', JSON.stringify(tempSettings));
			return tempSettings;
		});
	};

	return {
		subscribe,
		set,
		updateSessionTimer
	};
}

export const settings = createSettingsStore();
