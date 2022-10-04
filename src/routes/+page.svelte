<script lang="ts">
	import CountdownTimer from '../components/CountdownTimer.svelte';
	import SettingsIcon from '../components/icons/settings.icon.svelte';
	import { settings } from '$lib/stores';
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
					callback: () => {
						const audio = new Audio('/halfway.mp3');
						audio.play().then(() => {
							audio.remove();
						});
					}
				},
				{
					time: 60,
					callback: () => {
						const audio = new Audio('/last_one_minute.mp3');
						audio.play().then(() => {
							audio.remove();
						});
					}
				}
			]}
		/>
	</div>
</section>
