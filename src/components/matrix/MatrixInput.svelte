<script>
	import NumberSpinner from "svelte-number-spinner";
	import {
		endMatrix,
		show3d,
		vectorCoordsInput,
		inputVectorToggled
	} from "$stores";
	import { Matrix } from "ml-matrix";
	import { colorVector } from "$data/variables";
	import { fly } from "svelte/transition";

	const transitionProps = { duration: 200, x: -30 };

	// TODO: Make this a spring?
	// TODO: For the progress bar too?
	// Make the interactions feel more playful; no sudden jumps

	const indices3d = [0, 1, 2, 4, 5, 6, 8, 9, 10];
	const indices2d = [0, 1, 4, 5];

	const colors = ["p", "s", "a"];

	$: dims = $show3d ? 3 : 2;

	const spinnerClass = `text-2xl w-20 text-right py-2 px-2 bg-base-200`;

	// Compute matrix-vector multiplication
	let outputVector;
	$: {
		if ($show3d) {
			const A = new Matrix([
				[$endMatrix[0], $endMatrix[1], $endMatrix[2]],
				[$endMatrix[4], $endMatrix[5], $endMatrix[6]],
				[$endMatrix[8], $endMatrix[9], $endMatrix[10]]
			]);

			const v = new Matrix([$vectorCoordsInput]).transpose();

			const b = A.mmul(v);

			outputVector = [b.get(0, 0), b.get(1, 0), b.get(2, 0)];
		} else {
			const A = new Matrix([
				[$endMatrix[0], $endMatrix[1]],
				[$endMatrix[4], $endMatrix[5]]
			]);

			const v = new Matrix([
				[$vectorCoordsInput[0], $vectorCoordsInput[1]]
			]).transpose();

			const b = A.mmul(v);

			outputVector = [b.get(0, 0), b.get(1, 0)];
		}
	}
</script>

<div class="flex gap-5 items-center pointer-events-auto">
	<!-- Matrix -->
	<div class="shadow-lg shadow-neutral-content/20">
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
	</div>

	{#if $inputVectorToggled}
		<!-- Input Vector -->
		<div transition:fly={transitionProps} class="shadow-lg shadow-neutral-content/20">
			<div
				class="font-serif grid grid-cols-1 grid-rows-2 px-3 bg-base-200"
				style:box-shadow="inset 0px 0px 0px 3px {colorVector}"
			>
				{#each $show3d ? [3, 4, 5] : [3, 4] as idx, i}
					{@const textColor = colors[i % 3]}
					<div class="">
						<NumberSpinner
							bind:value={$vectorCoordsInput[i]}
							step={0.1}
							decimals={1}
							speed={0.1}
							class={spinnerClass}
							mainStyle={`color: hsl(var(--${textColor}));`}
						/>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="font-serif text-2xl font-black"
			transition:fly={transitionProps}
		>
			=
		</div>

		<!-- Output Vector -->
		<div transition:fly={transitionProps}>
			<div
				class="container font-serif grid grid-cols-1 grid-rows-2 px-3 bg-base-200"
			>
				{#each outputVector as coord}
					<!-- <div class="">
					<NumberSpinner
						bind:value={$vectorCoordsInput[i]}
						step={0.1}
						decimals={1}
						speed={0.1}
						class={spinnerClass}
						mainStyle={`color: ${colorVector};`}
					/>
				</div> -->
					<div class={spinnerClass} style:color={colorVector}>
						{coord.toFixed(1)}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.container {
		box-shadow: inset 0px 0px 0px 3px white;
	}
</style>
