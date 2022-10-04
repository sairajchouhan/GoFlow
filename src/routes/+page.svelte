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
		<CountdownTimer timer={$settings.timer.breakTimer} />
	</div>
</section>

<!-- <figure>
	<figcaption>Listen to the T-Rex:</figcaption>
	<audio controls src="/music.mp3">
		<a href="/music.mp3"> Download audio </a>
	</audio>
</figure>

<figure>
	<figcaption>Listen to the T-Rex:</figcaption>
	<audio controls src="/music.mp3">
		<a href="/music.mp3"> Download audio </a>
	</audio>
</figure> -->
