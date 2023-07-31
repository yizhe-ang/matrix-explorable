<script>
	export let color;
</script>

<!-- <span class={`text-${color} font-bold`}>
  <slot />
</span>

<span class={`inline-block bg-${color} text-base-100 font-bold px-1`}>
	<slot />
</span> -->

<span
	class={`underline font-bold decoration-wavy decoration-2 underline-offset-4 decoration-${color} text-base-content`}
  style:text-decoration-color="hsl(var(--{color}))"
>
	<slot />
</span>
