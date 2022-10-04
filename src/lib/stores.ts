import { writable } from 'svelte/store';

const sessionTimerDefaultValues = {
	workTimer: {
		minutes: 25,
		seconds: 0,
		key: 'main' as const
	},
	breakTimer: {
		minutes: 5,
		seconds: 0,
		key: 'break' as const
	}
};

const defaultSettings = {
	timers: sessionTimerDefaultValues
};

type SessionTimer = typeof sessionTimerDefaultValues;
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
					workTimer: {
						...settings.timers.workTimer,
						seconds: timer.workTimer.seconds,
						minutes: timer.workTimer.minutes
					},
					breakTimer: {
						...settings.timers.breakTimer,
						seconds: timer.breakTimer.seconds,
						minutes: timer.breakTimer.minutes
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
