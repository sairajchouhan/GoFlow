<script lang="ts">
	import { settings } from '../../lib/stores';

	function handleSettingsFormSubmit(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const formSettings = Object.fromEntries(formData.entries());

		try {
			settings.updateSessionTimer({
				workTimer: {
					minutes: +formSettings.workTime.toString(),
					seconds: 0
				},
				breakTimer: {
					minutes: +formSettings.breakTime.toString(),
					seconds: 0
				}
			});
		} catch (err) {
			console.error(err);
		}
	}

	const defualtValues = {
		workTime: $settings.timers.workTimer.minutes,
		breakTime: $settings.timers.breakTimer.minutes
	};
</script>

<div class="w-1/3 mx-auto">
	<div class="pt-8" />
	<div class="bg-white/10 backdrop-blur-[6px] p-6 rounded-sm">
		<h3 class="text-4xl text-slate-200 mb-4">Settings</h3>
		<form on:submit={(e) => handleSettingsFormSubmit(e)} class="space-y-4">
			<div>
				<label for="workTime" class="block text-sm font-medium text-slate-200"
					>Work time (mins)</label
				>
				<div class="mt-1">
					<input
						value={defualtValues.workTime}
						type="number"
						name="workTime"
						id="workTime"
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm bg-transparent placeholder:text-slate-400 text-gray-200"
						placeholder="25 min"
					/>
				</div>
			</div>
			<div>
				<label for="breakTime" class="block text-sm font-medium text-slate-200"
					>Break time (mins)</label
				>
				<div class="mt-1">
					<input
						value={defualtValues.breakTime}
						type="number"
						name="breakTime"
						id="breakTime"
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm bg-transparent placeholder:text-slate-400 text-gray-200"
						placeholder="5 min"
					/>
				</div>
			</div>
			<div class="pt-4" />
			<button
				type="submit"
				class="flex justify-end rounded-md border border-transparent ring-2 ring-slate-400 py-1.5 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ml-auto"
			>
				Save
			</button>
		</form>
	</div>
</div>
