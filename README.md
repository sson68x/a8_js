
# Microservice A: Sales Tax Calculator

This document describes how to programmatically interact with the **Sales Tax Calculator** that retrieves sales tax rates and amounts based on a given ZIP code.

---

## 1. Requesting Data from the Microservice

To retrieve sales tax information from the microservice, you need to make an HTTP **GET** request. The request requires two parameters:

- **zip**: The 5-digit ZIP code of the location you want the sales tax data for.
- **subtotal**: The total amount (before tax) of the purchase.

### Endpoint

`GET http://localhost:5000/sales-tax?zip=<zip_code>&subtotal=<subtotal>`

### Example Request

To make a request, use the following URL (replace `12345` with the actual ZIP code and `100.00` with the actual subtotal):

`GET http://localhost:5000/sales-tax?zip=12345&subtotal=100.00`

---

## 2. Receiving Data from the Microservice

The microservice will respond with a JSON object containing the sales tax rate and the calculated sales tax amount. If the request is successful, the response will look like this:

### Example Successful Response

```json
{
    "sales_tax_rate": 0.075,
    "sales_tax": 7.50
}
