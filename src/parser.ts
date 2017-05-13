import * as cheerio from 'cheerio';
import { Allergen, isValidAllergen, MealDetail, MealListItem, MealProperty } from "./model";

export function parseProductList(html: string): MealListItem[] {
    const $ = cheerio.load(html);
    return $(".meal").toArray().map(rawEl => {
        const el = $(rawEl);
        return {
            id: nr(el.find('.open_info').attr('data-target')),
            name: el.find('.title').text(),
            price: nr(el.find('.price').text()),
            imageUrl: el.find('.meal_img > img').attr('src'),
            available: el.find('.btn-wishlist').length === 0,
            properties: parseProperties(el)
        };
    });
}

export function parseProductDetail(html: string): MealDetail {
    const $ = cheerio.load(html);
    return {
        name: $('h2').contents()[0].nodeValue.trim(),
        mealId: nr($('.mealnumber').text()),
        imageUrl: $('img').attr('src'),
        description: $('.description').text().trim(),
        weight: nr($('.attributes').text()),
        properties: parseProperties($.root()),
        price: nr($('.price').text()),
        id: nr($('.order').attr('data-target')),
        available: $('.btn-wishlist').length === 0,
        kJ: nr($('tbody tr').eq(0).find('td').eq(2).text()),
        kcal: nr($('tbody tr').eq(1).find('td').eq(2).text()),
        fat: nr($('tbody tr').eq(2).find('td').eq(2).text()),
        saturated: nr($('tbody tr').eq(3).find('td').eq(2).text()),
        carbohydrate: nr($('tbody tr').eq(4).find('td').eq(2).text()),
        sugar: nr($('tbody tr').eq(5).find('td').eq(2).text()),
        protein: nr($('tbody tr').eq(6).find('td').eq(2).text()),
        salt: nr($('tbody tr').eq(7).find('td').eq(2).text()),
        breadunit: nr($('tbody tr').eq(8).find('td').eq(2).text()),
        allergens: parseAllergens($.root())
    };
}

function parseProperties(meal: Cheerio): MealProperty[] {
    return meal.find('.allergen img').toArray()
        .map(el => el.attribs['alt'] as MealProperty);
}

function parseAllergens(meal: Cheerio): Allergen[] {
    const allergens = meal.find('.allergennames').text().split(',').map(it => it.trim() as Allergen);
    if (allergens.some(it => !isValidAllergen(it))) {
        return null;
    } else {
        return allergens;
    }
}

function nr(input: string): number {
    const match = input.match(/\d+(,\d+)?/);
    if (match === null) {
        return null;
    } else {
        return +match[0].replace(',', '.');
    }
}
