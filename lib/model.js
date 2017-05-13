"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validAllergen = {
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
function isValidAllergen(text) {
    return !!validAllergen[text];
}
exports.isValidAllergen = isValidAllergen;
