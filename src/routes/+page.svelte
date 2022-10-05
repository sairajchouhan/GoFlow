<script lang="ts">
	import CountdownTimer from '../components/CountdownTimer.svelte';
	import { settings } from '$lib/stores';

	function playAudio(src: string) {
		const audio = new Audio(src);
		audio.play().then(() => {
			audio.remove();
		});
	}

	let totalSeconds: number;

	$: {
		totalSeconds =
			$settings.timer.breakTimer.work.minutes * 60 + $settings.timer.breakTimer.work.seconds;
	}
</script>

<div class="flex justify-center items-center min-h-[70vh]">
	<CountdownTimer
		timer={$settings.timer.breakTimer}
		timelineCallbacks={[
			// triggers when it's half time into the session
			{
				time: totalSeconds / 2,
				callback: () => playAudio('/halfway.mp3')
			},
			// triggers when last one minute is left
			{
				time: 60,
				callback: () => playAudio('/last_one_minute.mp3')
			},
			// triggers after 2 seconds after the session starts
			{
				time: totalSeconds - 1,
				callback: () => playAudio('/session_started.mp3')
			}
		]}
	/>
</div>
