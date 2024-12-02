class SKUManager {
    private skus: string[] = [];

    private pricingObj: Record<string, number> = {
        'ipd': 549.99,
        'mbp': 1399.99,
        'atv': 109.50,
        'vga': 30.00
    };

    constructor() { }

    public getSKUsPricing(): Record<string, number> {
        return this.pricingObj;
    }
}

class DiscountManager {

    /* The below is the bulkDiscount data stored to offer discount on product 'X' bought more than 'Y' Quantity*/

    private bulkDiscountModel: Record<string, { quantity: number; pricePayable: number }> = {
        'ipd': {
            "quantity": 4,
            "pricePayable": 499.99
        }
    };

    /* The below is the multiDicount data stored to offers buy 'X' Quan & PAY for 'Y' Quan */

    private multiProductDiscountModel: Record<string, { quantity: number; quantityPayable: number }> = {
        "atv": {
            "quantity": 3,
            "quantityPayable": 2
        }
    };

    constructor() { }

    public isBulkDiscountable(item: string, quantity: number): boolean {

        if ((item in this.bulkDiscountModel) && quantity > this.bulkDiscountModel[item]?.quantity) {
            return true;
        }

        return false;
    }

    public isMultiBuyDiscountable(item: string): boolean {
        return item in this.multiProductDiscountModel;

    }

    public getBulkDiscounts(): Record<string, { quantity: number; pricePayable: number }> {
        return this.bulkDiscountModel;
    }

    public getMultiBuyDiscounts(): Record<string, { quantity: number; quantityPayable: number }> {
        return this.multiProductDiscountModel;
    }
}

class Checkout {

    private cart: Record<string, number> = {};

    public scan(item: string) {

        if (!this.cart[item]) {
            this.cart[item] = 1;
        } else {
            this.cart[item] = this.cart[item] + 1;
        }
        return this.cart;
    }

    public total(discountManager: DiscountManager, skuManager: SKUManager): number {

        let cost = 0;
        const cart = this.cart;
        let price = skuManager.getSKUsPricing();

        try {

            Object.keys(cart).forEach((item) => {

                let reqQuantity = cart[item];
                let bulkDiscountModel = discountManager.getBulkDiscounts();
                let multiProductDiscountModel = discountManager.getMultiBuyDiscounts();


                //   console.log("item",item, "bulkDiscountModel",bulkDiscountModel, "multiProductDiscountModel", multiProductDiscountModel, 'cart', cart, 'Pricing',price);

                if (discountManager.isBulkDiscountable(item, reqQuantity) && reqQuantity >= bulkDiscountModel[item]?.quantity) {
                    cost = cost + reqQuantity * bulkDiscountModel[item].pricePayable;

                } else if (discountManager.isMultiBuyDiscountable(item)) {
                    const quantityApplicable = multiProductDiscountModel[item].quantity;
                    const productQuantityPayable = multiProductDiscountModel[item].quantityPayable;
                    const quantityPayable = Math.floor(reqQuantity / quantityApplicable) * productQuantityPayable + (reqQuantity % quantityApplicable);
                    cost = cost + price[item] * quantityPayable;
                } else {
                    cost = cost + reqQuantity * price[item];
                }
            }

            );

        } catch (err: any) {
            console.log('Error', err)
            throw (err)
        }

        console.log('total Price with available discounts', cost)
        return cost;
    }

}

let skuManager: SKUManager = new SKUManager();
let discountManager: DiscountManager = new DiscountManager();


// Start the program
const checkout = new Checkout();

/* 1 set */

// checkoutManager.scan("atv");
// checkoutManager.scan("atv");
// checkoutManager.scan("atv");
// checkoutManager.scan("vga");

/* 2nd set */

checkout.scan("atv");
checkout.scan("ipd");
checkout.scan("ipd");
checkout.scan("atv");
checkout.scan("ipd");
checkout.scan("ipd");
checkout.scan("ipd");

const cost = checkout.total(discountManager, skuManager);

console.log('Cart value is', cost)



/************************************************
            Test cases for below 
***************************************************/



function runTests(): void {
    console.log("Starting Tests...");

    /* Test SKUManager */
    testSKUManager();

    /* Test DiscountManager */
    testDiscountManager();

    /* Test Checkout */
    testCheckoutWithFirstSet();
    testCheckoutWithSecondSet()

    console.log("All Tests Completed.");
}


var mockedPricingObj = {
    'ipd': 549.99,
    'mbp': 1399.99,
    'atv': 109.50,
    'vga': 30.00
}


function testSKUManager(): void {
    console.log("Testing SKUManager...");

    const skuManager: SKUManager = new SKUManager();
    const pricing: any = skuManager.getSKUsPricing();

    if (pricing["ipd"] !== mockedPricingObj["ipd"]) console.log("SKUManager Test Failed: Incorrect price for 'ipd'.");

    if (pricing["mbp"] !== mockedPricingObj["mbp"]) console.log("SKUManager Test Failed: Incorrect price for 'mbp'");

    if (Object.keys(pricing).length !== 4) console.log("SKUManager Test Failed: Incorrect number of SKUs.");

    console.log("SKUManager Tests Passed.");
}


/* Testing DiscountManager */

function testDiscountManager() {
    console.log("Testing DiscountManager...");

    const discountManager = new DiscountManager();

    if (discountManager.isBulkDiscountable("ipd", 5) !== true) console.log("DiscountManager Test Failed: Bulk discount not detected for 'ipd'.");

    if (discountManager.isBulkDiscountable("ipd", 2) !== false) console.log("DiscountManager Test Failed: Incorrect bulk discount detection for 'ipd'.");

    if (discountManager.isMultiBuyDiscountable("atv") !== true) console.log("DiscountManager Test Failed: Multi-buy discount not detected for 'atv'.");

    if (discountManager.isMultiBuyDiscountable("vga") !== false) console.log("DiscountManager Test Failed: Incorrect multi-buy discount detection for 'vga'.");

    console.log("DiscountManager Tests Passed.");
}

/* Testing checkout */

function testCheckoutWithSecondSet() {
    console.log("Testing Checkout...");

    const skuManager: SKUManager = new SKUManager();
    const discountManager: DiscountManager = new DiscountManager();
    const checkout: Checkout = new Checkout();

    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");


    const total = checkout.total(discountManager, skuManager);

    if (total !== 2718.95) console.log(`Checkout Test Failed: Expected total 2718.95, but got ${total}`);

    const cart = checkout.scan("mbp");

    if (cart["mbp"] !== 1) console.log("Checkout Test Failed: Incorrect cart quantity for mbp");

    console.log("Checkout Tests Passed.");
}

function testCheckoutWithFirstSet() {
    console.log("Testing Checkout with first set...");

    const skuManager: SKUManager = new SKUManager();
    const discountManager: DiscountManager = new DiscountManager();
    const checkout: Checkout = new Checkout();

    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("vga");


    const total: number = checkout.total(discountManager, skuManager);

    if (total !== 249) console.log(`Checkout Test Failed: Expected total 249, but got ${total}`);

    const cart = checkout.scan("mbp");

    if (cart["mbp"] !== 1) console.log("Checkout Test Failed: Incorrect cart quantity for mbp");

    console.log("Checkout Tests Passed.");
}

runTests();



