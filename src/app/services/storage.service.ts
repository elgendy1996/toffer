import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {Product} from '../models/product.model';

const {Storage} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    async setObject(product: Product, ITEMS_KEY) {
        await Storage.get({key: ITEMS_KEY}).then(async (products: any) => {

            if (products.value) {
                const newProducts: any = JSON.parse(products.value);
                newProducts.push(product);

                await Storage.set({
                    key: ITEMS_KEY,
                    value: JSON.stringify(newProducts)
                });
            } else {
                await Storage.set({
                    key: ITEMS_KEY,
                    value: JSON.stringify([product])
                });
            }
        });
    }

    async getObject(ITEMS_KEY) {
        const ret: any = await Storage.get({key: ITEMS_KEY});
        return JSON.parse(ret.value);
    }

    async removeStorageValue(id: number, ITEMS_KEY) {
        const ret: any = await Storage.get({key: ITEMS_KEY});
        const products = JSON.parse(ret.value);

        if (!products || products.length === 0) {
            return null;
        }

        const toKeep: Product[] = [];

        for (const i of products) {
            if (i.id !== id) {
                toKeep.push(i);
            }
        }

        await Storage.set({
            key: ITEMS_KEY,
            value: JSON.stringify(toKeep)
        });

        return true;
    }

    async clear() {
        await Storage.clear();
    }
}
