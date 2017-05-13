import { MealDetail, MealListItem } from "./model";
export * from './model';
export declare class GourmetAPI {
    private http;
    constructor();
    login(username: string, password: string): Promise<void>;
    getMealList(wishlist?: boolean): Promise<MealListItem[]>;
    getMealDetail(id: number): Promise<MealDetail>;
}
