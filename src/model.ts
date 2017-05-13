export interface MealListItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    available: boolean;
    properties: MealProperty[];
}

export interface MealDetail extends MealListItem {
    mealId: number;
    description: string;
    properties: MealProperty[];
    weight: number;
    allergens: Allergen[];

    kJ: number;
    kcal: number;
    fat: number;
    saturated: number;
    carbohydrate: number;
    sugar: number;
    protein: number;
    salt: number;
    breadunit: number;
}

export type MealProperty = "Fit mit Genuss" | "XXL" | "Schweinefleischfrei" | "Ohne Zutat Laktose" | "Vegetarisch" | "Ohne Zutat Gluten" | "Vegan" | "BIO";
export type Allergen = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "K" | "L" | "M" | "N" | "O" | "P" | "R";
const validAllergen: {[allergen: string]: boolean} = {
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    F: true,
    G: true,
    H: true,
    K: true,
    L: true,
    M: true,
    N: true,
    O: true,
    P: true,
    R: true
};

export function isValidAllergen(text: string): text is Allergen {
    return !!validAllergen[text];
}
