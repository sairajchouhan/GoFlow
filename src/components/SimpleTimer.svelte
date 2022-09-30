<script lang="ts">
	import { zerofy } from '../lib/utils';

	let timerOn = false;
	let minutes = 0;
	let seconds = 0;

	let clear: NodeJS.Timer;

	let handleTimerToggle = () => {
		if (!timerOn) {
			clear = setInterval(() => {
				seconds++;
				if (seconds === 60) {
					minutes++;
					seconds = 0;
				}
			}, 1000);
		}

		if (timerOn) {
			clearInterval(clear);
			seconds = 0;
			minutes = 0;
		}

		timerOn = !timerOn;
	};
</script>

<div class="container">
	<h6>Simple Timer</h6>
	<div>
		<span class="minutes">{zerofy(minutes)}</span>
		<span>:</span>
		<span class="seconds">{zerofy(seconds)}</span>
	</div>

	<button on:click={handleTimerToggle}>{timerOn ? 'Off' : 'On'}</button>
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
		width: 6rem;
	}

	h6 {
		margin: 0;
		padding: 0;
		font-weight: 400;
		margin-bottom: 1rem;
	}
</style>
