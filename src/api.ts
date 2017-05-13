import * as req from 'request';
import * as rp from 'request-promise-native';
import { MealDetail, MealListItem } from "./model";
import { parseProductDetail, parseProductList } from "./parser";

export * from './model';

const baseUrl = 'https://alaclick.gourmet.at/frontend4/';
const page = 'default.aspx';

export class GourmetAPI {
    private http: req.RequestAPI<rp.RequestPromise, rp.RequestPromiseOptions, req.RequiredUriUrl>;

    constructor() {
        this.http = rp.defaults({
            baseUrl,
            jar: rp.jar()
        });
    }

    /**
     * Logs in to the site.
     */
    public login(username: string, password: string): Promise<void> {
        return this.http.post(page, {
            qs: { c: 'Login' },
            formData: {
                login: username,
                password,
                btnSubmit: 1
            }
        }).promise();
    }

    /**
     * Gets the overview of all meals.
     * @argument wishlist Also gets all meals that are unavailable at the moment.
     */
    public getMealList(wishlist: boolean = false): Promise<MealListItem[]> {
        const requests: Array<Promise<string>> = [];
        requests.push(this.http.get(page, { qs: { c: 'ProductList' } }).promise());
        if (wishlist) {
            requests.push(this.http.get(page, { qs: { c: 'ProductListNotInStock' } }).promise());
        }
        return Promise.all(requests).then(bodies =>
            bodies.map(it => parseProductList(it))
                .reduce((arr, it) => {
                    return arr.concat(it);
                }, [])
        );
    }

    /**
     * Gets details about a meal.
     * @argument id Id of meal received from getMealList()
     */
    public getMealDetail(id: number): Promise<MealDetail> {
        return this.http.get(page, {
            qs: {
                c: 'ProductDetail',
                ProductCatalogID: id
            }
        }).promise().then(parseProductDetail);
    }
}
