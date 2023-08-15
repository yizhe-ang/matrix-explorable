<script>
	import { expandPlayground } from "$stores";
	import { createToggle, melt } from "@melt-ui/svelte";
	import { gsap } from "$utils/gsap.js";
	import { ChevronRight } from "lucide-svelte";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	let mounted;
	let flag = true;

	const tweenProps = {
		duration: 0.3
	};

	const {
		elements: { root }
	} = createToggle({
		pressed: expandPlayground
	});

	$: if (mounted) onToggle($expandPlayground);
	function onToggle(pressed) {
		// HACK: Don't do anything on first load
		if (flag) {
			flag = false;
			return;
		}

		if (!pressed) {
			gsap.to("#article", {
				...tweenProps,
				translateX: "-65ch"
			});

			gsap.to("#canvas-wrapper", {
				...tweenProps,
				translateX: "-32.5ch"
			});
		} else {
			gsap.to("#article", {
				...tweenProps,
				translateX: "0"
			});

			gsap.to("#canvas-wrapper", {
				...tweenProps,
				translateX: "0"
			});
		}
	}

	onMount(() => {
		mounted = true;
	});
</script>

<button
	use:melt={$root}
	transition:fly={{ x: -20, duration: 200 }}
	data-tip={$expandPlayground ? `Show Article` : `Expand Playground`}
	class={`group bg-base-200 hover:bg-base-100 h-14 w-14 grid place-items-center rounded-full shadow-lg shadow-neutral-content/20 focus:ring-2 focus:ring-info transition-all -translate-x-1/2 -translate-y-1/2 tooltip tooltip-left tooltip-info fixed top-1/2 right-[calc(60ch)] [&[data-state="on"]]:right-0 duration-300`}
>
	<ChevronRight
		size={36}
		strokeWidth={3}
		transform="translate(2, 0)"
		class={`group-[&[data-state="on"]]:-scale-x-100 transition`}
	/>
</button>
