<script lang="ts">
	import { zerofy } from '../lib/utils';
	import { settings } from '$lib/stores';

	let timerOn = false;
	let timeOver = false;
	const timers = $settings.timers;

	let currentTimer: typeof timers[keyof typeof timers] = timers.work;
	let minutes = currentTimer.minutes;
	let seconds = currentTimer.seconds;

	let argToClearInterval: NodeJS.Timer;
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
			currentTimer = timers.work;
			minutes = currentTimer.minutes;
			seconds = currentTimer.seconds;
		}

		timerOn = !timerOn;
	};

	$: {
		if (timeOver) {
			currentTimer = currentTimer.key === 'main' ? timers.break : timers.work;
			minutes = currentTimer.minutes;
			seconds = currentTimer.seconds;
			timeOver = false;

			handleTimerToggle();
		}
	}
</script>

<div class="flex flex-col justify-center items-center">
	<h1 class="text-4xl text-slate-300 mb-8 ">
		{currentTimer.key === 'main' ? 'Get your work done' : 'Take a break'}
	</h1>

	<div class="text-9xl text-slate-300">
		<span>{zerofy(minutes)}</span>
		<span>:</span>
		<span>{zerofy(seconds)}</span>
	</div>

	<button on:click={handleTimerToggle} class="mt-8 text-slate-300">
		{#if timerOn}
			<svg xmlns="http://www.w3.org/2000/svg" class="w-24" data-name="Layer 1" viewBox="0 0 128 128"
				><path
					fill="currentColor"
					d="M64,15.139A48.861,48.861,0,1,0,98.55,29.451,48.708,48.708,0,0,0,64,15.139Zm31.043,79.9A43.9,43.9,0,1,1,107.9,64,43.765,43.765,0,0,1,95.043,95.044Z"
				/><path
					fill="currentColor"
					d="M81.606,46.385a7.537,7.537,0,0,0-5.339-2.222H51.734a7.54,7.54,0,0,0-5.339,2.222l-.009.009a7.538,7.538,0,0,0-2.222,5.339V76.266a7.539,7.539,0,0,0,2.222,5.339l.009.01a7.542,7.542,0,0,0,5.339,2.222H76.267a7.539,7.539,0,0,0,5.339-2.222l.01-.01a7.541,7.541,0,0,0,2.222-5.339V51.734a7.54,7.54,0,0,0-2.222-5.339ZM78.878,76.266a2.608,2.608,0,0,1-2.611,2.611H51.734a2.609,2.609,0,0,1-2.612-2.611V51.734a2.61,2.61,0,0,1,2.612-2.612H76.267a2.609,2.609,0,0,1,2.611,2.612Z"
				/></svg
			>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" class="w-24" data-name="Layer 1" viewBox="0 0 128 128"
				><path
					fill="currentColor"
					d="M86.7,59.9c-.058-.058-.119-.111-.181-.162a5.752,5.752,0,0,0-1.047-.758c-.046-.026-.093-.05-.14-.072L71.05,50.659l-.03-.017v0l-.089-.05-.069-.037v0L70.77,50.5l-.029-.015L56.562,42.3l-.014-.008a5.721,5.721,0,0,0-7.823,2.124l0,0-.007,0a5.756,5.756,0,0,0-.568,1.378,5.614,5.614,0,0,0-.172,1.047,2.472,2.472,0,0,0-.039.435v33.43a5.741,5.741,0,0,0,1.689,4.067l.009.009a5.772,5.772,0,0,0,7.334.665l13.923-8.039.071-.035c.049-.026.1-.052.143-.081l14.42-8.324.007,0,0,0A5.775,5.775,0,0,0,86.7,59.9Zm-3.272,4.311a.793.793,0,0,1-.372.481l0,0-14.3,8.256a2.441,2.441,0,0,0-.239.13l-.009.006h0L54.493,81.178a2.434,2.434,0,0,0-.321.194.81.81,0,0,1-.216.113.886.886,0,0,1-.254.029.818.818,0,0,1-.573-.229l0,0a.816.816,0,0,1-.229-.573V47.418c0-.047,0-.093,0-.14a.852.852,0,0,1,.033-.2.741.741,0,0,1,.054-.143c.03-.049.057-.1.084-.149a.8.8,0,0,1,.417-.27.828.828,0,0,1,.513.021,2.374,2.374,0,0,0,.3.164l13.963,8.062a2.6,2.6,0,0,0,.237.139l.094.049h0l.021.012v0L82.864,63.18c.059.041.122.079.186.116a.888.888,0,0,1,.108.071l.054.055a.832.832,0,0,1,.136.167A.813.813,0,0,1,83.428,64.207Z"
				/><path
					fill="currentColor"
					d="M64,15.139A48.861,48.861,0,1,0,98.55,29.451,48.709,48.709,0,0,0,64,15.139Zm31.043,79.9A43.9,43.9,0,1,1,107.9,64,43.766,43.766,0,0,1,95.043,95.044Z"
				/></svg
			>
		{/if}
	</button>
</div>
