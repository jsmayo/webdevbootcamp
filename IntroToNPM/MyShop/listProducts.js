var product = require("faker");

console.log("==========================="); 
console.log("WELCOME TO MY SHOP!");
console.log("===========================");
    
for(var i = 0; i < 10; i++) 
    console.log(product.commerce.color() + " " + 
    product.commerce.productAdjective() + " " +
    product.commerce.product() + " - $" + product.commerce.price());
    
    // shortcut: console.log(product.commerce.productName());