<script lang="ts">
	import { zerofy } from '../lib/utils';
	let timerOn = false;
	let timeOver = false;

	const timers = {
		mainTimer: {
			minutes: 0,
			seconds: 5,
			name: 'Main Timer',
			key: 'main' as const
		},
		breakTimer: {
			minutes: 0,
			seconds: 2,
			name: 'Break Timer',
			key: 'break' as const
		}
	};

	let currentTimer: typeof timers[keyof typeof timers] = timers.mainTimer;
	let minutes = currentTimer.minutes;
	let seconds = currentTimer.seconds;

	let argToClearInterval: NodeJS.Timer;
	let sessionsCompleted = 0;

	let handleTimerToggle = () => {
		if (!timerOn) {
			argToClearInterval = setInterval(() => {
				if (seconds === 0) {
					if (minutes === 0) {
						timerOn = false;
						timeOver = true;
						clearInterval(argToClearInterval);
						return;
					}
					minutes--;
					seconds = 59;
				} else {
					seconds--;
				}
			}, 1000);
		}
		if (timerOn) {
			clearInterval(argToClearInterval);
			currentTimer = timers.mainTimer;
			minutes = currentTimer.minutes;
			seconds = currentTimer.seconds;
		}

		timerOn = !timerOn;
	};

	$: {
		if (timeOver) {
			if (currentTimer.key === 'main') {
				sessionsCompleted++;
			}
			currentTimer = currentTimer.key === 'main' ? timers.breakTimer : timers.mainTimer;
			minutes = currentTimer.minutes;
			seconds = currentTimer.seconds;
			timeOver = false;

			handleTimerToggle();
		}
	}
</script>

<div class="container">
	<h6>{currentTimer.name}</h6>
	<div>
		<span class="minutes">{zerofy(minutes)}</span>
		<span>:</span>
		<span class="seconds">{zerofy(seconds)}</span>
	</div>

	{#if sessionsCompleted > 0}
		{sessionsCompleted} sessions complted
	{/if}

	<button on:click={handleTimerToggle}>{timerOn ? 'End Session' : 'Start Session'}</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		margin: 1rem 0;
	}

	button {
		padding: 8px 16px;
		border: none;
		margin-top: 16px;
		border-radius: 4px;
		cursor: pointer;
	}

	h6 {
		margin: 0;
		padding: 0;
		font-weight: 400;
		margin-bottom: 1rem;
	}
</style>
