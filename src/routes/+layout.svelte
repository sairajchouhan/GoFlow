<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { settings } from '../lib/stores';
	let loading = true;

	onMount(() => {
		const stngs = $settings;
		const localStorageSettings = localStorage.getItem('settings');
		if (localStorageSettings) {
			settings.set(JSON.parse(localStorageSettings));
		} else {
			localStorage.setItem('settings', JSON.stringify(stngs));
		}
		loading = false;
	});
</script>

{#if !loading}
	<slot />
{/if}
