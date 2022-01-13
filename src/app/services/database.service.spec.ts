import {BehaviorSubject, Observable} from 'rxjs';
import {SQLiteObject} from '@ionic-native/sqlite';
import {Platform} from '@ionic/angular';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {Injectable, Input} from '@angular/core';
import {ProductsService} from './products.service';
import {HttpClient} from '@angular/common/http';
import {SQLite} from '@ionic-native/sqlite/ngx';

export interface Dev {
    id: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    isWishlist: boolean;
    quantity: number;
    category: string;
}

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    developers = new BehaviorSubject([]);
    products = new BehaviorSubject([]);

    constructor(private plt: Platform,
                private productsService: ProductsService, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
        this.plt.ready().then(() => {
            this.sqlite.create({
                name: 'product.db',
                location: 'default'
            })
                .then((db: SQLiteObject) => {
                    this.database = db;
                    this.seedDatabase();
                });
        });
    }

    seedDatabase() {
        this.productsService.getData().then((data => {
            this.sqlitePorter.importSqlToDb(this.database, data)
                .then(_ => {
                    this.loadProducts();
                    this.dbReady.next(true);
                })
                .catch(e => console.error(e));
        }));
    }

    getDatabaseState() {
        return this.dbReady.asObservable();
    }

    getProducts(): Observable<any[]> {
        return this.products.asObservable();
    }

    loadProducts() {
        const query = 'SELECT  product.id, product.description, product.price, product.image, product.stock, product.quantity, product.isWishlist , product.category FROM product';
        return this.database.executeSql(query, []).then(data => {
            const products = [];
            if (data.rows.length > 0) {
                for (let i = 0; i < data.rows.length; i++) {
                    products.push({
                        name: data.rows.item(i).name,
                        id: data.rows.item(i).id,
                        creator: data.rows.item(i).creator,
                    });
                }
            }
            this.products.next(products);
        });
    }

    addProduct(name, creator) {
        const data = [name, creator];
        return this.database.executeSql('INSERT INTO product (  id  ,description, price , image, stock,  quantity , isWishlist, category ) VALUES (?, ?,?,?,?,?,?,?)', data).then(data => {
            this.loadProducts();
        });
    }
}
