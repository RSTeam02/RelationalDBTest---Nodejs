var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('orders.db');

//3x entities with examples in JSON
var customer = [
    { "Name": "Harry" },
    { "Name": "Jane" },
    { "Name": "Joe" },
    { "Name": "Kate" }
];

var orders = [
    { "pId": 1, "cId": 1 },
    { "pId": 2, "cId": 2 },
    { "pId": 3, "cId": 3 },
    { "pId": 4, "cId": 4 },
    { "pId": 5, "cId": 3 },
    { "pId": 3, "cId": 1 }
];

var product = [
    { "Product": "shelf", "Price": 123 },
    { "Product": "basket", "Price": 34 },
    { "Product": "desk", "Price": 200 },
    { "Product": "couch", "Price": 123 },
    { "Product": "chair", "Price": 44 }
];

//drop create tables
db.run("DROP TABLE if exists CUSTOMER");
db.run("DROP TABLE if exists PRODUCT");
db.run("DROP TABLE if exists ORDERS");
db.serialize(function () {
    db.run("CREATE TABLE if not exists CUSTOMER (cId integer primary key, name TEXT)");
    var customerStmt = db.prepare("INSERT INTO CUSTOMER VALUES (null,?)");
    customer.forEach(function (obj) {
        customerStmt.run(obj.Name);
    });
    customerStmt.finalize();

    db.run("CREATE TABLE if not exists PRODUCT (pId integer primary key,product TEXT, price integer)");
    var productStmt = db.prepare("INSERT INTO PRODUCT VALUES (null,?,?)");
    product.forEach(function (obj) {
        productStmt.run(obj.Product, obj.Price);
    });
    productStmt.finalize();

    db.run("CREATE TABLE if not exists ORDERS (oId integer primary key, pId integer, cId integer)");
    var orderStmt = db.prepare("INSERT INTO ORDERS VALUES (null,?,?)");
    orders.forEach(function (obj) {
        orderStmt.run(obj.pId, obj.cId);
    });
    orderStmt.finalize();
    
    //inner joins stmt of all tables
    db.each("select o.oId, c.name, p.product, p.price from CUSTOMER c inner join ORDERS o on c.cId = o.cId inner join PRODUCT p on p.pId = o.pId",
        function (err, row) {
            console.log(`OrderId: ${row.oId}, Customer: ${row.name}, Product: ${row.product}, Price: ${row.price}`);
        });

});
db.close();