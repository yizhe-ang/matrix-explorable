<script>
	import { playhead, playToggle, matrixTween } from "$stores";
	import { Play, Pause } from "lucide-svelte";
	import { gsap } from "$utils/gsap";

	function togglePlay(tween) {
		tween.paused(!tween.paused());

		if (tween.progress() == 1) {
			// tween.restart()

			$playToggle = false;
			tween.progress(0);
			tween.pause();
			setTimeout(() => tween.play(), 500);
		} else if (tween.paused()) {
			// play icon
			$playToggle = true;
		} else {
			// pause icon
			$playToggle = false;
		}
	}
</script>

<!-- <div class="flex w-full gap-3"> -->
<div class="flex w-80 gap-3">
	<!-- Play button -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label
		class="swap swap-rotate"
		class:swap-active={$playToggle}
		on:click={() => {
			togglePlay($matrixTween);
			// togglePlay(progressTween);
		}}
	>
		<div class="swap-on">
			<Play />
		</div>
		<div class="swap-off">
			<Pause />
		</div>
	</label>

	<!-- Range -->
	<input
		bind:value={$playhead}
		on:input={() => {
			$matrixTween.progress($playhead);
			$matrixTween.pause();
			// progressTween.progress($playhead);
			// progressTween.pause();
		}}
		on:change={() => {
			$playToggle = true;
		}}
		type="range"
		min={0}
		max={1}
		step={0.001}
		class="range range-sm"
	/>
</div>
