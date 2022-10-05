<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { settings } from '../lib/stores';
	import Header from '../components/Header.svelte';

	let loading = true;

	onMount(() => {
		const localStorageSettings = localStorage.getItem('settings');
		if (localStorageSettings) {
			settings.set(JSON.parse(localStorageSettings));
		} else {
			localStorage.setItem('settings', JSON.stringify($settings));
		}
		loading = false;
	});
</script>

<svelte:head>
	<title>Go Flow</title>
</svelte:head>

<Header />

{#if !loading}
	<slot />
{/if}
