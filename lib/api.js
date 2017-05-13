"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise-native");
const parser_1 = require("./parser");
__export(require("./model"));
const baseUrl = 'https://alaclick.gourmet.at/frontend4/';
const page = 'default.aspx';
class GourmetAPI {
    constructor() {
        this.http = rp.defaults({
            baseUrl,
            jar: rp.jar()
        });
    }
    login(username, password) {
        return this.http.post(page, {
            qs: { c: 'Login' },
            formData: {
                login: username,
                password,
                btnSubmit: 1
            }
        }).promise();
    }
    getMealList(wishlist = false) {
        const requests = [];
        requests.push(this.http.get(page, { qs: { c: 'ProductList' } }).promise());
        if (wishlist) {
            requests.push(this.http.get(page, { qs: { c: 'ProductListNotInStock' } }).promise());
        }
        return Promise.all(requests).then(bodies => bodies.map(it => parser_1.parseProductList(it))
            .reduce((arr, it) => {
            return arr.concat(it);
        }, []));
    }
    getMealDetail(id) {
        return this.http.get(page, {
            qs: {
                c: 'ProductDetail',
                ProductCatalogID: id
            }
        }).promise().then(parser_1.parseProductDetail);
    }
}
exports.GourmetAPI = GourmetAPI;
