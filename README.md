[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# API for alaclick.gourmet.at

Usage example:
```Typescript
import { GourmetAPI } from "gourmet-api";

const api = new GourmetAPI();

(async () => {
    await api.login('user', 'password');
    const list = await api.getMealList();
    const meal = await api.getMealDetail(list[0].id);
    console.log(meal);
})();
```
Output:
```Javascript
{ name: 'Schweinskarree in Pfeffersauce mit Rosmarinkartoffeln und Gartengemüse',
  mealId: 2302202,
  imageUrl: 'https://gourmetalaclick.blob.core.windows.net/img/mealitems/2302202.png',
  description: 'Zwei zarte Schweinskarrees in Pfeffersauce mit Rosmarinkartoffeln und Gartengemüse mit gelben und grünen Bohnen und Perlkarotten.',
  weight: 420,
  properties: [ 'Fit mit Genuss' ],
  price: 5.98,
  id: 5448,
  available: true,
  kJ: 1698,
  kcal: 405,
  fat: 15.7,
  saturated: 6.3,
  carbohydrate: 29.5,
  sugar: 8.8,
  protein: 33.4,
  salt: 6.1,
  breadunit: 2.5,
  allergens: [ 'A', 'G', 'L' ] }
```
