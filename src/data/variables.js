import themeColors from "daisyui/src/theming/themes";
import { color as d3Color } from "d3";
import { Matrix } from "ml-matrix";

// Data
export const egVector = [-1, 2];
export const egMatrixX = [1, -2];
// export const egMatrixY = [3, 0];
export const egMatrixY = [2, 0];

export const initMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

export const egEndMatrix = [
	egMatrixX[0], egMatrixY[0], 0, 0,
	egMatrixX[1], egMatrixY[1], 0, 0,
	0, 0, 1, 0,
  0, 0, 0, 1
];

const A = new Matrix([egMatrixX, egMatrixY]).transpose();
const v = new Matrix([egVector]).transpose();
const w = A.mmul(v);

export const egOutputVector = [w.get(0, 0), w.get(1, 0)];

// export const eg3dVector = [2, 3, -1];
// export const eg3dMatrixX = [0, 1, -2];
// export const eg3dMatrixY = [1, 2, 4];
// export const eg3dMatrixZ = [1, 3, 4];

// export const eg3dVector = [2, 3, -1];
export const eg3dVector = [-1, 2, 1];
export const eg3dMatrixX = [1, 0, 0];
export const eg3dMatrixY = [1, 1, 1];
// export const eg3dMatrixZ = [0, 0, 1];
export const eg3dMatrixZ = [0, -1, 1];

const B = new Matrix([eg3dMatrixX, eg3dMatrixY, eg3dMatrixZ]).transpose();
const u = new Matrix([eg3dVector]).transpose();
const t = B.mmul(u);

export const eg3dOutputVector = [t.get(0, 0), t.get(1, 0), t.get(2, 0)];

const [x1, x2, x3] = eg3dMatrixX;
const [y1, y2, y3] = eg3dMatrixY;
const [z1, z2, z3] = eg3dMatrixZ;

export const eg3dMatrix = [
	x1, y1, z1, 0,
	x2, y2, z2, 0,
	x3, y3, z3, 0,
	0, 0, 0, 1,
];

// Colors
const dracula = themeColors["[data-theme=dracula]"];

export const colorXAlt = dracula.primary;
export const colorYAlt = dracula.secondary;
export const colorZAlt = dracula.accent;

// export const colorX = d3Color("hsl(326, 100%, 67%)").formatHex();
// export const colorY = d3Color("hsl(265, 89%, 71%)").formatHex();
// export const colorZ = d3Color("hsl(31, 100%, 64%)").formatHex();
export const colorX = colorToHex("hsl(326, 100%, 67%)");
export const colorY = colorToHex("hsl(265, 89%, 71%)");
export const colorZ = colorToHex("hsl(31, 100%, 64%)");

// export const colorVector = dracula.info;
// export const colorVector = "hsl(191, 97%, 77%)";
// export const colorVector = "#04cefb";
export const colorVector = colorToHex("hsl(191, 97%, 50%)");

export const colorGrid = colorToHex("hsl(191, 97%, 30%)");
export const colorGridAlt = colorToHex("hsl(191, 97%, 20%)");

export const colorB1 = "hsl(231, 15%, 18%)";
export const colorB2 = colorToHex("hsl(231, 15%, 11%)");
export const colorB3 = "hsl(231, 15%, 4%)";

export const colorN = "hsl(230, 15%, 30%)";
export const colorNc = "hsl(232, 7%, 85%)";
export const colorNf = "hsl(230, 15%, 23%)";

console.log(dracula);

function colorToHex(color) {
	return d3Color(color).formatHex();
}
