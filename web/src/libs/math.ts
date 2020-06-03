export function rad(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function lerp(valueA: number, valueB: number, blend: number) {
  return valueA * (1 - blend) + valueB * blend;
}
