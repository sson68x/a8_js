const axios = require('axios');

// Function to get sales tax data
async function getSalesTax(zipCode, subtotal) {
    const url = `http://localhost:5000/sales-tax`;
    try {
        console.log("Starting test program...")
        const response = await axios.get(url, {
            params: {
                zip: zipCode,
                subtotal: subtotal
            }
        });

        const data = response.data;
        console.log('Status: Success')
        console.log(`Sales Tax Rate: ${data.sales_tax_rate}`);
        console.log(`Sales Tax Amount: ${data.sales_tax}`);

    } catch (error) {
        if (error.response) {
            console.log("Error: Something went wrong...");

        } else {
            console.log("Error:", error.message);
        }
    }
}

// Test the microservice with no zip code
// getSalesTax("", 100.00);

// Test the microservice with invalid zip code
// getSalesTax("11", 100.00);

// Test the microservice with valid input
// Corvallis, OR
// getSalesTax("97331", 100.00);

// Test the microservice with valid input
// Seattle, WA
getSalesTax("98104", 100.00);

