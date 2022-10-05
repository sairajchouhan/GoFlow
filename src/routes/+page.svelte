<script lang="ts">
	import CountdownTimer from '../components/CountdownTimer.svelte';
	import SettingsIcon from '../components/icons/settings.icon.svelte';
	import { settings } from '$lib/stores';

	function playAudio(src: string) {
		const audio = new Audio(src);
		audio.play().then(() => {
			audio.remove();
		});
	}
</script>

<section>
	<div class="flex justify-end">
		<a href="/settings" class="text-slate-200 m-4">
			<SettingsIcon />
		</a>
	</div>
	<div class="flex justify-center items-center min-h-[70vh]">
		<CountdownTimer
			timer={$settings.timer.breakTimer}
			timelineCallbacks={[
				{
					time:
						($settings.timer.breakTimer.work.minutes * 60 +
							$settings.timer.breakTimer.work.seconds) /
						2,
					callback: () => playAudio('/halfway.mp3')
				},
				{
					time: 60,
					callback: () => playAudio('/last_one_minute.mp3')
				}
			]}
		/>
	</div>
</section>
