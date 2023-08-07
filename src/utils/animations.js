import { gsap } from "gsap";

export function showLinearComb(
  tl,
  props,
  xBasis,
  yBasis,
  vector,
) {
	// Animate out Tex
	tl.to(props, {
		xTexOpacity: 0,
		onUpdate: function () {
			props = props;
		}
	})
		.to(
			props,
			{
				yTexOpacity: 0,
				onUpdate: function () {
					props = props;
				}
			},
			"<"
		)
		// Scale basis vectors
		.add("step-2")
		.to(
			props,
			{
				duration: 0.2,
				xScalarOpacity: 1,
				onUpdate: function () {
					props = props;
				}
			},
			"step-2"
		)
		.to(
			props,
			{
				duration: 0.2,
				yScalarOpacity: 1,
				onUpdate: function () {
					props = props;
				}
			},
			"step-2"
		)
		.to(
			xCoords,
			{
				endArray: [0, 0, 0, egVector[0], 0, 0],
				onUpdate: function () {
					xCoords = xCoords;
				}
			},
			"step-2"
		)
		.to(
			yCoords,
			{
				endArray: [0, 0, 0, 0, egVector[1], 0],
				onUpdate: function () {
					yCoords = yCoords;
				}
			},
			"step-2"
		)
		.to(
			props,
			{
				xScalar: egVector[0],
				onUpdate: function () {
					props = props;
				}
			},
			"step-2"
		)
		.to(
			props,
			{
				yScalar: egVector[1],
				onUpdate: function () {
					props = props;
				}
			},
			"step-2"
		)
		.to({}, { duration: delay })
		// Shift y basis vector
		.add("step-3")
		.to(
			props,
			{
				duration: 0.2,
				xScalarOpacity: 0,
				onUpdate: function () {
					props = props;
				}
			},
			"step-3"
		)
		.to(
			props,
			{
				duration: 0.2,
				yScalarOpacity: 0,
				onUpdate: function () {
					props = props;
				}
			},
			"step-3"
		)
		.to(
			yCoords,
			{
				endArray: [egVector[0], 0, 0, ...egVector, 0],
				onUpdate: function () {
					yCoords = yCoords;
				}
			},
			"step-3"
		)
		.to({}, { duration: delay });
}
