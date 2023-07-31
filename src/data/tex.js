import colors from "tailwindcss/colors";
import { colorX, colorY, colorZ } from "$data/variables.js";

const colorA = colors.cyan["400"];
const colorB = colors.green["400"];

const colorC = colors.cyan["900"];
const colorD = colors.green["900"];

function colorTex(tex, color) {
	return `\\textcolor{${color}}{${tex}}`;
}

function highlightTex(tex, color) {
	return `\\colorbox{${color}}{${tex}}`;
}

export const matrixVectorFormula = String.raw`
\begin{aligned}
{\left[\begin{array}{ll}
a & b \\
c & d
\end{array}\right]\left[\begin{array}{l}
x \\
y
\end{array}\right] } & =x\left[\begin{array}{l}
a \\
c
\end{array}\right]+y\left[\begin{array}{l}
b \\
d
\end{array}\right] \\
& =\left[\begin{array}{l}
a x+b y \\
c x+d y
\end{array}\right]
\end{aligned}
`;

export const matrixVectorEg = String.raw`\left[\begin{array}{cc}
  1 & 3 \\
  -2 & 0
  \end{array}\right]\left[\begin{array}{c}
  -1 \\
  2
  \end{array}\right]=\left[\begin{array}{l}
  5 \\
  2
  \end{array}\right]`;

export const vectorAsLinearComb = String.raw`\left[\begin{array}{r}
  ${colorTex(-1, colorA)} \\
  ${colorTex(2, colorB)}
  \end{array}\right]=${colorTex(-1, colorA)}${colorTex(
	String.raw`\left[\begin{array}{l}
    1 \\
    0
    \end{array}\right]`,
	colorX
)}+${colorTex(2, colorB)}${colorTex(
	String.raw`\left[\begin{array}{l}
      0 \\
      1
      \end{array}\right]`,
	colorY
)}`;

export const vectorAsLinearCombAlt = String.raw`\left[\begin{array}{r}
  ${highlightTex(-1, colorC)} \\
  ${highlightTex(2, colorD)}
  \end{array}\right]=${highlightTex(-1, colorC)}${colorTex(
	String.raw`\left[\begin{array}{l}
    1 \\
    0
    \end{array}\right]`,
	colorX
)}+${highlightTex(2, colorD)}${colorTex(
	String.raw`\left[\begin{array}{l}
      0 \\
      1
      \end{array}\right]`,
	colorY
)}`;

export const matrixVectorFormulaEg = String.raw`
\left[\begin{array}{ll}
  ${colorTex("a", colorX)} & ${colorTex("b", colorY)} \\
  ${colorTex("c", colorX)} & ${colorTex("d", colorY)}
  \end{array}\right]\left[\begin{array}{l}
  x \\
  y
  \end{array}\right]=x${colorTex(
		String.raw`\left[\begin{array}{l}
  a \\
  c
  \end{array}\right]`,
		colorX
	)}+y${colorTex(
	String.raw`\left[\begin{array}{l}
  b \\
  d
  \end{array}\right]`,
	colorY
)}
`;
