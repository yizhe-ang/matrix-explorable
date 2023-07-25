<script>
	export let view;
	export let dim;
	export let axisColor = "#3f3f46";
	export let gridColor = "#262626";
	export let axisWidth = 2;
	export let gridWidth = 1;
	export let opacity = 1;

	// Draw axes
	view
		.axis({
			axis: 1,
			width: axisWidth,
			color: axisColor,
			opacity
		})
		.axis({
			axis: 2,
			width: axisWidth,
			color: axisColor,
			opacity
		})
		.grid({
			width: gridWidth,
			divideX: dim,
			divideY: dim,
			color: gridColor,
			opacity
		});
</script>
