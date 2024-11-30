class SKUManager {
    private skus: string[] = [];
    
    private pricingObj: Record<string, number> = {
        'ipd': 549.99,
        'mbp': 1399.99,
        'atv': 109.50,
        'vga': 30.00
    };

    constructor() {}

    public getSKUsPricing(): Record<string, number> {
        return this.pricingObj;
    }
}

class DiscountManager {
     
     private bulkDiscountModel: Record<string, { quantity: number; pricePayable: number }> = {
        'ipd' :{
        "quantity": 4,
        "pricePayable": 499.99
         }
     };

     private multiProductDiscountModel: Record<string, { quantity: number; quantityPayable: number }> = {
        "atv": {
    "quantity": 3,
    "quantityPayable": 2
  }
     };

     constructor() {}

    public isBulkDiscountable(item:string, quantity:number):boolean{
      
      if((item in this.bulkDiscountModel) && quantity > this.bulkDiscountModel[item]?.quantity){
        return true;
      }

      return false;
    }
    
    public isMultiBuyDiscountable(item:string):boolean{
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

    private cart: Record<string, number > ={};

    public scan(item:string){
        
        if(!this.cart[item]){
            this.cart[item] = 1;
        }else{
             this.cart[item] = this.cart[item] +1;
        }
        return this.cart;
    }

    public total(discountManager:DiscountManager, skuManager: SKUManager) : number{
        
        let cost = 0;
        const cart = this.cart;
        let price = skuManager.getSKUsPricing();
        
        try{
        
            Object.keys(cart).forEach((item)=>{
              
              let reqQuantity = cart[item];
              let bulkDiscountModel = discountManager.getBulkDiscounts();
              let multiProductDiscountModel = discountManager.getMultiBuyDiscounts();
              

              console.log("item",item, "bulkDiscountModel",bulkDiscountModel, "multiProductDiscountModel", multiProductDiscountModel, 'cart', cart, 'Pricing',price);

              if(discountManager.isBulkDiscountable(item, reqQuantity) && reqQuantity >= bulkDiscountModel[item]?.quantity){
                  cost= cost + reqQuantity * bulkDiscountModel[item].pricePayable;
              
              }else if(discountManager.isMultiBuyDiscountable(item)){
                   const quantityApplicable=multiProductDiscountModel[item].quantity;
                   const productQuantityPayable = multiProductDiscountModel[item].quantityPayable;
                   const quantityPayable = Math.floor(reqQuantity/quantityApplicable) * productQuantityPayable + (reqQuantity % quantityApplicable); 
                   cost = cost + price[item] * quantityPayable ;
              }else {
                    cost = cost + reqQuantity * price[item];
              }
            }

            );

        }catch(err:any){
            console.log('Error',err)
            throw(err)
        }

         console.log('total Price with available discounts', cost)
        return cost;
    }
    
}

let skuManager : SKUManager = new SKUManager();
let discountManager:DiscountManager = new DiscountManager();


// Start the program
const checkoutManager = new Checkout();

/* 1 set */

// checkoutManager.scan("atv");
// checkoutManager.scan("atv");
// checkoutManager.scan("atv");
// checkoutManager.scan("vga");

/* 2nd set */

checkoutManager.scan("atv");
checkoutManager.scan("ipd");
checkoutManager.scan("ipd");
checkoutManager.scan("atv");
checkoutManager.scan("ipd");
checkoutManager.scan("ipd");
checkoutManager.scan("ipd");

checkoutManager.total(discountManager,skuManager);





