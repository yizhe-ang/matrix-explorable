<script>
  import variables from "$data/variables.json"

	export let view;

  const vectorProps = {
    end: true,
    width: 3,
    zBias: 10_000,
  }

  // TODO: Into a single data matrix?
	// Draw basis vectors

  // x
	view
		.array({
			data: [0, 0, 0, 1, 0, 0],
			width: 2,
			items: 2,
			channels: 3
		})
		.vector({
      ...vectorProps,
			color: variables.color.x,
		});

  // y
	view
		.array({
			data: [0, 0, 0, 0, 1, 0],
			width: 2,
			items: 2,
			channels: 3
		})
		.vector({
      ...vectorProps,
			color: variables.color.y,
		});

  // z
	view
		.array({
			data: [0, 0, 0, 0, 0, 1],
			width: 2,
			items: 2,
			channels: 3
		})
		.vector({
      ...vectorProps,
			color: variables.color.z,
		});

</script>
