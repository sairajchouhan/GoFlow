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
		console.log(formSettings);

		settings.updateBreakTimerSettings({
			breakTime: +formSettings.breakTime.toString(),
			workTime: +formSettings.workTime.toString()
		});

		// try {
		// 	settings.updateSessionTimer({
		// 		workTimer: {
		// 			minutes: +formSettings.workTime.toString(),
		// 			seconds: 0
		// 		},
		// 		breakTimer: {
		// 			minutes: +formSettings.breakTime.toString(),
		// 			seconds: 0
		// 		}
		// 	});
		// } catch (err) {
		// 	console.error(err);
		// }
	}

	const defualtValues = {
		workTime: 25,
		breakTime: 5
	};

	// form values
	let selectedTimer: 'breakTimer' | 'simpleTimer' = 'breakTimer';
</script>

<div class=" md:w-1/2 lg:w-1/3 mx-auto">
	<div class="pt-8" />
	<div class="bg-white/10 backdrop-blur-[6px] p-6 rounded-sm">
		<h3 class="text-4xl text-slate-200 mb-4">Settings</h3>
		<form on:submit={(e) => handleSettingsFormSubmit(e)} class="space-y-4">
			<div>
				<label for="timeType" class="block text-sm font-medium text-slate-200">Select Timer</label>
				<select
					id="timerType"
					name="timerType"
					class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-transparent text-slate-200"
					bind:value={selectedTimer}
				>
					<option value="breakTimer" selected>Break Timer</option>
					<option value="simpleTimer">Simple Timer</option>
				</select>
			</div>

			{#if selectedTimer === 'breakTimer'}
				<div>
					<label for="workTime" class="block text-sm font-medium text-slate-200"
						>Work time (mins)</label
					>
					<div class="mt-1">
						<input
							value={$settings.timer.breakTimer.work.minutes}
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
							value={$settings.timer.breakTimer.break.minutes}
							type="number"
							name="breakTime"
							id="breakTime"
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm bg-transparent placeholder:text-slate-400 text-gray-200"
							placeholder="5 min"
						/>
					</div>
				</div>
			{/if}
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
