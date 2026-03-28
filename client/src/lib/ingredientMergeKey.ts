/** Aligné sur `server/src/lib/shopping.ts` (agrégation + suppressedAggKeys). */
export function normalizeIngredientName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function ingredientMergeKey(
  aisle: string,
  unit: string,
  name: string
): string {
  return `${aisle}||${unit}||${normalizeIngredientName(name)}`;
}
