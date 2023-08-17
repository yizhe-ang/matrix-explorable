import colors from "tailwindcss/colors";
import {
	colorX,
	colorY,
	colorZ,
	colorXAlt,
	colorYAlt,
	colorZAlt,
	colorVector,
	egVector,
	egMatrixX,
	egMatrixY,
	egOutputVector,
	eg3dVector,
	eg3dMatrixX,
	eg3dMatrixY,
	eg3dMatrixZ,
	eg3dOutputVector
} from "$data/variables.js";

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

const a0 = colorTex("a", colorX)
const c0 = colorTex("c", colorX)
const b0 = colorTex("b", colorY)
const d0 = colorTex("d", colorY)

const x0 = colorTex("x", colorXAlt)
const y0 = colorTex("y", colorYAlt)

const xy = colorTex(String.raw`\left[\begin{array}{l}
  ${x0} \\
  ${y0}
  \end{array}\right]`, colorVector)

const axbycxdy = colorTex(String.raw`\left[\begin{array}{l}
  ${a0} ${x0}+${b0} ${y0} \\
  ${c0} ${x0}+${d0} ${y0}
  \end{array}\right]`, colorVector)

export const matrixVectorFormulaColored = String.raw`
\begin{aligned}
{\left[\begin{array}{ll}
${a0} & ${b0} \\
${c0} & ${d0}
\end{array}\right]${xy} } & =${x0}\left[\begin{array}{l}
${a0} \\
${c0}
\end{array}\right]+${y0}\left[\begin{array}{l}
${b0} \\
${d0}
\end{array}\right] \\
& =${axbycxdy}
\end{aligned}
`;

export const matrixVectorEg = String.raw`\left[\begin{array}{r}
  ${egMatrixX[0]} & ${egMatrixY[0]} \\
  ${egMatrixX[1]} & ${egMatrixY[1]}
  \end{array}\right]\left[\begin{array}{r}
  ${egVector[0]} \\
  ${egVector[1]}
  \end{array}\right]=\left[\begin{array}{l}
  ${egOutputVector[0]} \\
  ${egOutputVector[1]}
  \end{array}\right]`;

const a1 = colorTex(egVector[0], colorXAlt);
const a2 = colorTex(egVector[1], colorYAlt);
// const egVectorTex = String.raw`\left[\begin{array}{r}
//   ${a1} \\
//   ${a2}
//   \end{array}\right]`;

const egVectorTex = colorTex(
	String.raw`\left[\begin{array}{r}
  ${a1} \\
  ${a2}
  \end{array}\right]`,
	colorVector
);

// export const vectorAsLinearComb = String.raw`${egVectorTex}=${colorTex(
// 	egVector[0],
// 	colorXAlt
// )}${colorTex(
// 	String.raw`\left[\begin{array}{l}
//     1 \\
//     0
//     \end{array}\right]`,
// 	colorX
// )}+${colorTex(egVector[1], colorYAlt)}${colorTex(
// 	String.raw`\left[\begin{array}{l}
//       0 \\
//       1
//       \end{array}\right]`,
// 	colorY
// )}`;
export const vectorAsLinearComb = String.raw`${egVectorTex}=${colorTex(
	egVector[0],
	colorXAlt
)}\left[\begin{array}{l}
    ${colorTex(1, colorX)} \\
    ${colorTex(0, colorX)}
    \end{array}\right]
+${colorTex(egVector[1], colorYAlt)}\left[\begin{array}{l}
      ${colorTex(0, colorY)} \\
      ${colorTex(1, colorY)}
      \end{array}\right]
`;
// export const vectorAsLinearComb = String.raw`\left[\begin{array}{r}
//   ${colorTex(-1, colorXAlt)} \\
//   ${colorTex(2, colorYAlt)}
//   \end{array}\right]=${colorTex(-1, colorXAlt)}${colorTex(
// 	String.raw`\left[\begin{array}{l}
//     1 \\
//     0
//     \end{array}\right]`,
// 	colorX
// )}+${colorTex(2, colorYAlt)}${colorTex(
// 	String.raw`\left[\begin{array}{l}
//       0 \\
//       1
//       \end{array}\right]`,
// 	colorY
// )}`;

// export const vectorAsLinearCombAlt = String.raw`\left[\begin{array}{r}
//   ${highlightTex(-1, colorC)} \\
//   ${highlightTex(2, colorD)}
//   \end{array}\right]=${highlightTex(-1, colorC)}${colorTex(
// 	String.raw`\left[\begin{array}{l}
//     1 \\
//     0
//     \end{array}\right]`,
// 	colorX
// )}+${highlightTex(2, colorD)}${colorTex(
// 	String.raw`\left[\begin{array}{l}
//       0 \\
//       1
//       \end{array}\right]`,
// 	colorY
// )}`;

// export const matrixVectorFormulaEg = String.raw`
// \left[\begin{array}{ll}
//   ${colorTex("a", colorX)} & ${colorTex("b", colorY)} \\
//   ${colorTex("c", colorX)} & ${colorTex("d", colorY)}
//   \end{array}\right]\left[\begin{array}{l}
//   x \\
//   y
//   \end{array}\right]=x${colorTex(
// 		String.raw`\left[\begin{array}{l}
//   a \\
//   c
//   \end{array}\right]`,
// 		colorX
// 	)}+y${colorTex(
// 	String.raw`\left[\begin{array}{l}
//   b \\
//   d
//   \end{array}\right]`,
// 	colorY
// )}
// `;

const b1 = colorTex(egMatrixX[0], colorX);
const b2 = colorTex(egMatrixY[0], colorY);
const b3 = colorTex(egMatrixX[1], colorX);
const b4 = colorTex(egMatrixY[1], colorY);

const egMatrixTex = String.raw`\left[\begin{array}{r}
${b1} & ${b2} \\
${b3} & ${b4}
\end{array}\right]`;

// const egMatrixXTex = colorTex(
// 	String.raw`\left[\begin{array}{r}
//   ${egMatrixX[0]} \\
//   ${egMatrixX[1]}
//   \end{array}\right]`,
// 	colorX
// );
const egMatrixXTex = String.raw`\left[\begin{array}{r}
  ${colorTex(egMatrixX[0], colorX)} \\
  ${colorTex(egMatrixX[1], colorX)}
  \end{array}\right]`;

const egMatrixYTex = String.raw`\left[\begin{array}{r}
  ${colorTex(egMatrixY[0], colorY)} \\
  ${colorTex(egMatrixY[1], colorY)}
  \end{array}\right]`;

// const outputVector = colorTex(
// 	String.raw`\left[\begin{array}{l}
//   ${egOutputVector[0]} \\
//   ${egOutputVector[1]}
//   \end{array}\right]`,
// 	colorVector
// );
const outputVector = String.raw`\left[\begin{array}{l}
  ${colorTex(egOutputVector[0], colorVector)} \\
  ${colorTex(egOutputVector[1], colorVector)}
  \end{array}\right]`;

export const matrixVectorFormulaEg = String.raw`\begin{aligned}
{${egMatrixTex}
${egVectorTex} } & =${colorTex(
	egVector[0],
	colorXAlt
)}${egMatrixXTex}+${colorTex(egVector[1], colorYAlt)} ${egMatrixYTex} \\
& = ${outputVector}
\end{aligned}
`;

const c1 = colorTex(eg3dMatrixX[0], colorX);
const c2 = colorTex(eg3dMatrixX[1], colorX);
const c3 = colorTex(eg3dMatrixX[2], colorX);

const c4 = colorTex(eg3dMatrixY[0], colorY);
const c5 = colorTex(eg3dMatrixY[1], colorY);
const c6 = colorTex(eg3dMatrixY[2], colorY);

const c7 = colorTex(eg3dMatrixZ[0], colorZ);
const c8 = colorTex(eg3dMatrixZ[1], colorZ);
const c9 = colorTex(eg3dMatrixZ[2], colorZ);

const eg3dMatrixTex = String.raw`\left[\begin{array}{rrr}
  ${c1} & ${c4} & ${c7} \\
  ${c2} & ${c5} & ${c8} \\
  ${c3} & ${c6} & ${c9}
  \end{array}\right]`;

const c10 = colorTex(eg3dVector[0], colorXAlt);
const c11 = colorTex(eg3dVector[1], colorYAlt);
const c12 = colorTex(eg3dVector[2], colorZAlt);

// const eg3dVectorTex = String.raw`\left[\begin{array}{r}
//   ${c10} \\
//   ${c11} \\
//   ${c12}
//   \end{array}\right]`;
const eg3dVectorTex = colorTex(
	String.raw`\left[\begin{array}{r}
  ${c10} \\
  ${c11} \\
  ${c12}
  \end{array}\right]`,
	colorVector
);

// const eg3dMatrixXTex = colorTex(
// 	String.raw`\left[\begin{array}{r}
//     0 \\
//     1 \\
//     -2
//     \end{array}\right]`,
// 	colorX
// );
const eg3dMatrixXTex = String.raw`\left[\begin{array}{r}
    ${c1} \\
    ${c2} \\
    ${c3}
    \end{array}\right]`;

const c13 = colorTex(eg3dOutputVector[0], colorVector);
const c14 = colorTex(eg3dOutputVector[1], colorVector);
const c15 = colorTex(eg3dOutputVector[2], colorVector);

// TODO: Also include a more general 3D matrix-vector multiplication equation?
export const matrixVectorFormula3dEg = String.raw`\begin{aligned}
& {${eg3dMatrixTex}${eg3dVectorTex}} \\
& ${c10}${eg3dMatrixXTex}+${c11}\left[\begin{array}{r}
${c4} \\
${c5} \\
${c6}
\end{array}\right]${c12}\left[\begin{array}{r}
${c7} \\
${c8} \\
${c9}
\end{array}\right] \\
& =\left[\begin{array}{r}
${c13} \\
${c14} \\
${c15}
\end{array}\right]
\end{aligned}`;
