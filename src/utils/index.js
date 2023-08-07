

export function formatCoord(coord) {
  return coord.toFixed(1).replace(/[.,]0$/, "");
}