<script lang="ts">
	import SettingsIcon from './icons/settings.icon.svelte';
	import GithubIcon from './icons/github.icon.svelte';
	import Logo from './icons/logo.icon.svelte';
</script>

<header class="flex justify-between items-center p-4">
	<div>
		<a href="/" class="text-slate-200 inline-flex items-center text-2xl">
			<Logo />
			<span class="ml-2"> Go Flow </span>
		</a>
	</div>
	<div class="flex items-center space-x-4">
		<a
			target="_blank"
			rel="nonopener noreferrer"
			href="https://github.com/sairajchouhan/GoFlow"
			class="text-slate-200"
		>
			<GithubIcon />
		</a>
		<a href="/settings" class="text-slate-200">
			<SettingsIcon />
		</a>
	</div>
</header>
