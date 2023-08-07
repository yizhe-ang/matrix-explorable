<script>
	import NumberSpinner from "svelte-number-spinner";
	import { endMatrix, show3d } from "$stores";

	const indices3d = [0, 1, 2, 4, 5, 6, 8, 9, 10];
	const indices2d = [0, 1, 4, 5];

	const colors = ["p", "s", "a"];

	$: dims = $show3d ? 3 : 2;

	const spinnerClass = `text-2xl w-20 text-right py-2 px-2 bg-base-200`;
</script>

{#if $show3d}
	<div
		class="container font-serif grid grid-cols-3 grid-rows-3 px-3 bg-base-200"
	>
		{#each indices3d as idx, i}
			{@const textColor = colors[i % 3]}
			<div class="">
				<NumberSpinner
					bind:value={$endMatrix[idx]}
					step={0.1}
					decimals={1}
					speed={0.1}
					class={spinnerClass}
					mainStyle={`color: hsl(var(--${textColor}));`}
				/>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="container font-serif grid grid-cols-2 grid-rows-2 px-3 bg-base-200"
	>
		{#each indices2d as idx, i}
			{@const textColor = colors[i % 2]}
			<div class="">
				<NumberSpinner
					bind:value={$endMatrix[idx]}
					step={0.1}
					decimals={1}
					speed={0.1}
					class={spinnerClass}
					mainStyle={`color: hsl(var(--${textColor}));`}
				/>
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.container {
		box-shadow: inset 0px 0px 0px 3px white;
	}
</style>
