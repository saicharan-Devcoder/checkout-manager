# **Checkout Manager**

A simple implementation of a **Checkout Manager** for managing product pricing, bulk discounts, and multi-product offers.

---

## **Product Catalog**

| SKU  | Name         | Price     |
|------|--------------|-----------|
| ipd  | Super iPad   | $549.99   |
| mbp  | MacBook Pro  | $1399.99  |
| atv  | Apple TV     | $109.50   |
| vga  | VGA adapter  | $30.00    |

---

## **Key Features**

1. **Data Models**  
   Designed and implemented data models to handle checkout operations seamlessly.  
   
2. **Hardcoded Offers**  
   Offers and discounts are predefined as key-value pairs in the code.  

3. **Unit Tests**  
   Comprehensive unit tests implemented to ensure the accuracy of calculations and logic.

---

## **Pricing Object**

Represents the standard pricing of products without any discounts applied.

| SKU  | Price        |
|------|--------------|
| ipd  | $549.99      |
| mbp  | $1399.99     |
| atv  | $109.50      |
| vga  | $30.00       |

---

## **Bulk Discount Object**

Represents discounts applicable on bulk purchases for specific products.

| SKU  | Quantity Required | Discounted Price |
|------|-------------------|------------------|
| ipd  | 4                 | $499.99          |
| mbp  | -                 | -                |
| atv  | -                 | -                |
| vga  | -                 | -                |

---

## **Multi-Product Discount Object**

Represents "Buy X, Get Y" style discounts.

| SKU  | Quantity Required | Quantity Payable |
|------|-------------------|------------------|
| atv  | 3                 | 2                |
| mbp  | -                 | -                |
| vga  | -                 | -                |
| ipd  | -                 | -                |

---

### **How to Use**
- Clone the repository to your local environment.
- instructions in the code comments or additional documentation.
- Run the tests to validate functionality.