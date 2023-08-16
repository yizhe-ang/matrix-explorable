<script>
  import { MoveHorizontal, MousePointerClick, Mouse, Move, Play } from "lucide-svelte";
  import ActionIcon from "./ActionIcon.svelte";
</script>

<li>
	<ActionIcon icon={MoveHorizontal} />Drag the numbers to increase or decrease
	the values in the matrix and input vector
</li>
<li>
	<ActionIcon icon={MousePointerClick} /> Double click the numbers to input your
	own values in the matrix and input vector
</li>
<li>
	<ActionIcon icon={Play} /> Scrub through the animation of the matrix transformation
</li>
<li><ActionIcon icon={Mouse} /> Scroll to zoom in or out</li>
<li><ActionIcon icon={Move} /> Left click and drag to pan around the space</li>
