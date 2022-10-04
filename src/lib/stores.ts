import { writable } from 'svelte/store';

const breakTimerDefaultValues = {
	work: {
		minutes: 25,
		seconds: 0,
		key: 'work' as const
	},
	break: {
		minutes: 5,
		seconds: 0,
		key: 'break' as const
	}
};

const simpleTimerDefaultValues = {
	simple: {
		minutes: 0,
		seconds: 0,
		key: 'simple' as const
	}
};

type BreakTimer = typeof breakTimerDefaultValues;
type SimpleTimer = typeof simpleTimerDefaultValues;

export type SettingsStore = {
	timerType: 'breakTimer' | 'simpleTimer';
	timer: {
		breakTimer: BreakTimer;
		simpleTimer: SimpleTimer;
	};
};

const defaultSettings: SettingsStore = {
	timerType: 'breakTimer',
	timer: {
		breakTimer: breakTimerDefaultValues,
		simpleTimer: simpleTimerDefaultValues
	}
};

function createSettingsStore() {
	const { subscribe, update, set } = writable<SettingsStore>(defaultSettings);

	const updateBreakTimerSettings = ({
		workTime,
		breakTime
	}: {
		workTime: number;
		breakTime: number;
	}) => {
		update((settings) => {
			if (settings.timerType === 'breakTimer') {
				settings.timer.breakTimer.work.minutes = workTime;
				settings.timer.breakTimer.break.minutes = breakTime;
			}
			localStorage.setItem('settings', JSON.stringify(settings));
			return settings;
		});
	};

	return {
		subscribe,
		set,
		update,
		updateBreakTimerSettings
	};
}

export const settings = createSettingsStore();
