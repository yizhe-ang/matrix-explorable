<script>
	import "$styles/app.css";
  import 'mathbox/mathbox.css';
	import Header from "$components/Header.svelte";
	import { loaded } from "$stores";
	import { onMount, tick } from "svelte";

  onMount(async () => {
    await tick()
    $loaded = true
  })
</script>

<!-- <Header /> -->
<main id="content">
	<slot />
</main>
