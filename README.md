# checkout-manager

# Implementing  checkout manager


| SKU     | Name        | Price    |
| --------|:-----------:| --------:|
| ipd     | Super iPad  | $549.99  |
| mbp     | MacBook Pro | $1399.99 |
| atv     | Apple TV    | $109.50  |
| vga     | VGA adapter | $30.00   |


# Considered Data models for the checkout manager

# Pricing Object - Represents the actual pricing of the products without offers.

| SKU     |   Price     |
| --------|:-----------:|
| ipd     |   $549.99   |
| mbp     |   $1399.99  |
| atv     |   $109.50   |
| vga     |   $30.00    |


# Bulk Discount Object - Represents discountable products on bulk buying.

| SKU     | quantity    | Price    |
| --------|:-----------:| --------:|
| ipd     |     4       | $499.99  |
| mbp     |     -       |     -    |
| atv     |     -       |     -    |
| vga     |     -       |     -    |


# Multi Product Discount Object - Represents dicountable products on multibuy ( LIKE Buy X, Get Y).


| SKU     | quantity    | quantityPayable  |
| --------|:-----------:| ----------------:|
| atv     |     3       |           2      |
| mbp     |     -       |           -      |
| vga     |     -       |           -      |
| ipd     |     -       |           -      |

