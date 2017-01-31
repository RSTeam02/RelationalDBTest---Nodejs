# Node relational DB Test - customer, order example

ER - Diagram:

++++++++++  [1]   /\   [n] +++++++++
+customer+-------+  +------+product+
++++++++++        \/       +++++++++
 
a customer orders 1 to n products C -> P
a product is ordered by one customer P -> C 
(1x join) 
 
++++++++++       ++++++++       +++++++++
+customer+-------+orders+-------+product+
++++++++++       ++++++++       +++++++++

a certain product can be ordered more than once by many other customers. => replace relation with entity (2x joins) 


Console Output:
C:\NodeJS\node_relationalDBTest>node dbtest.js
OrderId: 1, Customer: Harry, Product: shelf, Price: 123
OrderId: 2, Customer: Jane, Product: basket, Price: 34
OrderId: 3, Customer: Joe, Product: desk, Price: 200
OrderId: 4, Customer: Kate, Product: couch, Price: 123
OrderId: 5, Customer: Joe, Product: chair, Price: 44
OrderId: 6, Customer: Harry, Product: desk, Price: 200
