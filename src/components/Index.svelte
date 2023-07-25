<script>
	import { getContext } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	// import Footer from "$components/Footer.svelte";
  import Threlte from "$components/matrix/Threlte.svelte"

	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<!-- <WIP /> -->
<!-- <Demo /> -->
<!-- <Footer /> -->

<div class="wrapper">
  <Threlte />
</div>

<style>
  .wrapper {
    position: absolute;
		inset: 0;
    background-color: #18181b;
  }
</style>
