<script>
	import {
		MoveHorizontal,
		MousePointerClick,
		Mouse,
		Move,
		Play
	} from "lucide-svelte";
	import ActionIcon from "./ActionIcon.svelte";
	import B from "./B.svelte";
</script>

<li>
	<ActionIcon icon={MoveHorizontal} /><B>Drag the numbers</B> to increase or decrease
	the values in the matrix and input vector
</li>
<li>
	<ActionIcon icon={MousePointerClick} /><B>Double click the numbers</B> to input
	your own values in the matrix and input vector
</li>
<li>
	<ActionIcon icon={Play} /><B>Scrub through the animation</B> of the matrix transformation
</li>
<li><ActionIcon icon={Mouse} /> <B>Scroll</B> to zoom in or out</li>
<li>
	<ActionIcon icon={Move} />
	<B>Left click and drag</B> to pan around the space
</li>
