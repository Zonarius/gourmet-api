import * as chai from "chai";
import * as fs from 'fs';
import * as path from 'path';

import * as parser from '../src/parser';

const expect = chai.expect;

describe("parser", () => {
  describe("meal list", () => {
    it("parses available meals", () => {
      const meals = parser.parseProductList(loadTestHtml('available-meals'));
      expect(meals).to.have.lengthOf(28);
      const meal = meals[0];
      expect(meal.name).to.equal('Schweinskarree in Pfeffersauce mit Gemüse');
      expect(meal.id).to.equal(5448);
      expect(meal.available).to.be.true;
      expect(meal.price).to.equal(5.98);
      expect(meal.imageUrl).to.equal('https://gourmetalaclick.blob.core.windows.net/img/mealitems/2302202.png');
      expect(meal.properties).to.eql(['Fit mit Genuss']);
    });

    it("parses unavailable meals", () => {
      const meals = parser.parseProductList(loadTestHtml('unavailable-meals'));
      expect(meals).to.have.lengthOf(141);
      const meal = meals[0];
      expect(meal.name).to.equal('Tafelspitz mit Kartoffeln und Semmelkren');
      expect(meal.id).to.equal(4337);
      expect(meal.available).to.be.false;
      expect(meal.price).to.equal(6.59);
      expect(meal.imageUrl).to.equal('https://gourmetalaclick.blob.core.windows.net/img/mealitems/2301304.png');
    });
  });

  describe("product detail", () => {
    it('parses available meal', () => {
      const meal = parser.parseProductDetail(loadTestHtml('meal-detail'));
      expect(meal.name).to.equal('Schweinskarree in Pfeffersauce mit Rosmarinkartoffeln und Gartengemüse');
      expect(meal.mealId).to.equal(2302202);
      expect(meal.imageUrl).to.equal('https://gourmetalaclick.blob.core.windows.net/img/mealitems/2302202.png');
      expect(meal.description).to.equal('Zwei zarte Schweinskarrees in Pfeffersauce mit Rosmarinkartoffeln und Gartengemüse mit gelben und grünen Bohnen und Perlkarotten.');
      expect(meal.weight).to.equal(420);
      expect(meal.properties).to.eql(['Fit mit Genuss']);
      expect(meal.price).to.equal(5.98);
      expect(meal.id).to.equal(5448);
      expect(meal.kJ).to.equal(1698);
      expect(meal.kcal).to.equal(405);
      expect(meal.fat).to.equal(15.7);
      expect(meal.saturated).to.equal(6.3);
      expect(meal.carbohydrate).to.equal(29.5);
      expect(meal.sugar).to.equal(8.8);
      expect(meal.protein).to.equal(33.4);
      expect(meal.salt).to.equal(6.1);
      expect(meal.breadunit).to.equal(2.5);
      expect(meal.allergens).to.eql(['A', 'G', 'L']);
      expect(meal.available).to.be.true;
    });

    it('parses unavailable meal', () => {
      const meal = parser.parseProductDetail(loadTestHtml('meal-detail-unavailable'));
      expect(meal.name).to.equal('Tafelspitz mit Röstkartoffeln, Wurzelgemüse und Semmelkren');
      expect(meal.mealId).to.equal(2301304);
      expect(meal.imageUrl).to.equal('https://gourmetalaclick.blob.core.windows.net/img/mealitems/2301304.png');
      expect(meal.description).to.equal('Feiner Tafelspitz in kräftiger Rindsuppe mit Wurzelgemüse, Röstkartoffeln und Semmelkren.');
      expect(meal.weight).to.equal(460);
      expect(meal.properties).to.eql(['Schweinefleischfrei']);
      expect(meal.price).to.equal(6.59);
      expect(meal.id).to.equal(4337);
      expect(meal.kJ).to.equal(2443);
      expect(meal.kcal).to.equal(584);
      expect(meal.fat).to.equal(28.9);
      expect(meal.saturated).to.equal(12);
      expect(meal.carbohydrate).to.equal(38.7);
      expect(meal.sugar).to.equal(5.9);
      expect(meal.protein).to.equal(37.7);
      expect(meal.salt).to.equal(6.5);
      expect(meal.breadunit).to.equal(3.2);
      expect(meal.allergens).to.eql(['A', 'G', 'L', 'O']);
      expect(meal.available).to.be.false;
    });

    it('must be able to handle missing data', () => {
      const meal = parser.parseProductDetail(loadTestHtml('missing-data'));
      expect(meal.name).to.equal('BIO-Karpfen "serbische Art" mit Nockerl');
      expect(meal.mealId).to.equal(2301658);
      expect(meal.imageUrl).to.equal('https://gourmetalaclick.blob.core.windows.net/img/mealitems/2301658.png');
      expect(meal.description).to.equal('Gebratener BIO-Karpfen in einer leichten Paprikasauce, mit rotem Paprikagemüse und Nockerln mit Petersilie verfeinert.');
      expect(meal.weight).to.be.null;
      expect(meal.properties).to.eql(['Schweinefleischfrei', 'BIO']);
      expect(meal.price).to.equal(7.91);
      expect(meal.id).to.equal(1000055);
      expect(meal.kJ).to.be.null;
      expect(meal.kcal).to.be.null;
      expect(meal.fat).to.be.null;
      expect(meal.saturated).to.be.null;
      expect(meal.carbohydrate).to.be.null;
      expect(meal.sugar).to.be.null;
      expect(meal.protein).to.be.null;
      expect(meal.salt).to.be.null;
      expect(meal.breadunit).to.be.null;
      expect(meal.allergens).to.be.null;
      expect(meal.available).to.be.false;
    });
  });
});

function loadTestHtml(name: string): string {
  return fs.readFileSync(path.join(__dirname, 'data', `${name}.html`), 'utf-8');
}
