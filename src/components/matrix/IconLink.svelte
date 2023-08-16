<script>
	import A from "./A.svelte";

	export let href;
</script>

<A {href}>
	<slot name="icon" />
	<div class="visually-hidden">
		<slot name="label" />
	</div>
</A>

<style>
	.visually-hidden {
		position: absolute;
		overflow: hidden;
		clip: rect(0 0 0 0);
		height: 1px;
		width: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
	}
</style>
