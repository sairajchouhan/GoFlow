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
