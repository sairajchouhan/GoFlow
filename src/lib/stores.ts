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

const simpleTimerDefaultValues = {
	simple: {
		minutes: 0,
		seconds: 0,
		key: 'simple' as const
	}
};

type BreakTimer = typeof breakTimerDefaultValues;
type SimpleTimer = typeof simpleTimerDefaultValues;

type SettingsStore = {
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

	return {
		subscribe,
		set,
		update
	};
}

export const settings = createSettingsStore();
