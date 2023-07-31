<script>
	import NumberSpinner from "svelte-number-spinner";
	import { endMatrix } from "$stores";

	const indices = [0, 1, 2, 4, 5, 6, 8, 9, 10];

  const colors = ["p", "s", "a"]
</script>

<div class="font-serif grid grid-cols-3 grid-rows-3">
	{#each indices as idx, i}
    {@const textColor = colors[i % 3]}
		<div class="">
			<NumberSpinner
				bind:value={$endMatrix[idx]}
				step={0.1}
				decimals={1}
				speed={0.1}
        class={`text-2xl w-20 text-right py-1 px-2`}
        mainStyle={`color: hsl(var(--${textColor}))`}
			/>
		</div>
	{/each}
</div>
