import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
})

export class CrudService {

    private dbInstance: SQLiteObject;
    readonly dbName: string = 'products.db';
    readonly dbTable: string = 'productsTable';
    PRODUCTS: Array<any>;

    constructor(
        private platform: Platform,
        private sqlite: SQLite
    ) {
        this.databaseConn();
    }

    // Create SQLite database if not existed
    databaseConn() {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: this.dbName,
                location: 'default'
            }).then((sqLite: SQLiteObject) => {
                this.dbInstance = sqLite;
                sqLite.executeSql(`
                    CREATE TABLE IF NOT EXISTS ${this.dbTable}
                    (
                        id          varchar(255) PRIMARY KEY,
                        description varchar(255),
                        price       REAL,
                        image       varchar(5000),
                        stock       INTEGER,
                        quantity    INTEGER,
                        isWishlist  INTEGER
                    )`, [])
                    .then((res) => {
                        alert(JSON.stringify(res));
                    })
                    .catch((error) => alert(JSON.stringify(error)));
            })
                .catch((error) => alert(JSON.stringify(error)));
        });
    }

    // adding product to the SQLite DB
    public addProduct(id, description, price, image, stock, quantity, isWishlist) {
        // validation
        this.dbInstance.executeSql(`
            INSERT INTO ${this.dbTable} (id, description, price, image, stock, quantity, isWishlist)
            VALUES ('${id}', ('${description}', ('${price}', ('${image}', ('${stock}', ('${quantity}', ('${isWishlist}')`, [])
            .then(() => {
                alert('Success');
                this.getAllProducts();
            }, (e) => {
                alert(JSON.stringify(e.err));
            });
    }
   // get all products from the SQLite db
    getAllProducts() {
        return this.dbInstance.executeSql(`SELECT *
                                           FROM ${this.dbTable}`, []).then((res) => {
            this.PRODUCTS = [];
            if (res.rows.length > 0) {
                for (let i = 0; i < res.rows.length; i++) {
                    this.PRODUCTS.push(res.rows.item(i));
                }
                return this.PRODUCTS;
            }
        }, (e) => {
            alert(JSON.stringify(e));
        });
    }

    // Get product
    getProduct(id): Promise<any> {
        return this.dbInstance.executeSql(`SELECT *
                                           FROM ${this.dbTable}
                                           WHERE user_id = ?`, [id])
            .then((res) => {
                return {
                    user_id: res.rows.item(0).user_id,
                    name: res.rows.item(0).name,
                    email: res.rows.item(0).email
                };
            });
    }

    // Update SQLite DB
    updateProduct(id, description, price, image, stock, quantity, isWishlist) {
        const data = [id, description, price, image, stock, quantity, isWishlist];
        return this.dbInstance.executeSql(`UPDATE ${this.dbTable}
                                           SET id          = ?,
                                               description = ?,
                                               price       = ?,
                                               image       = ?,
                                               stock       = ?,
                                               quantity    = ?,
                                               isWishlist  = ?

                                           WHERE id = ${id}`, data);
    }

    // Delete
    deleteProduct(productID) {
        this.dbInstance.executeSql(`
            DELETE
            FROM ${this.dbTable}
            WHERE user_id = ${productID}`, [])
            .then(() => {
                alert('Product deleted!');
                this.getAllProducts();
            })
            .catch(e => {
                alert(JSON.stringify(e));
            });
    }

}
