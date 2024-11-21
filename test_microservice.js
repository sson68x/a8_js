const express = require('express');
const Taxjar = require('taxjar');
const app = express();
const port = 5000;

require('dotenv').config();

// Initialize TaxJar client with API key
const client = new Taxjar({
    apiKey: process.env.TAXJAR_API_KEY
});

// Function to fetch tax rate from TaxJar
async function getSalesTaxRate(zipCode) {
    try {
        // Using the TaxJar API to fetch rates for a location (zip code)
        const response = await client.ratesForLocation(zipCode);
        console.log('TaxJar API response:', response);
        return response;

    } catch (error) {
        console.error('Error fetching tax rate from TaxJar:', error.message);
        if (error.response) {
            console.error('TaxJar Error Details:', error.response.data);
        }
        throw error;
    }
}

// Route for the root path
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to Sales Tax Service</title>
        </head>
        <body>
            <h1>Welcome to the Sales Tax Service</h1>
            <p>Use the <code>/sales-tax</code> endpoint to calculate sales tax.</p>
            <p>Example: <code>/sales-tax?zip=12345&subtotal=100.00</code></p>
        </body>
        </html>
    `);
});

// Route to get sales tax based on zip code and subtotal
app.get('/sales-tax', async (req, res) => {
    const zipCode = req.query.zip;
    let subtotal = req.query.subtotal;
    subtotal = parseFloat(subtotal);

    try {
        // Fetch tax rates from TaxJar
        const taxRateData = await getSalesTaxRate(zipCode);

        // Extract the combined rate from the response
        const combinedRate = taxRateData.rate.combined_rate;

        // Calculate the sales tax
        const salesTax = (combinedRate * subtotal).toFixed(2);

        // Return the sales tax rate, amount, and total as a JSON response
        res.json({
            sales_tax_rate: combinedRate,
            sales_tax: salesTax,
        });

    } catch (error) {
        // Handle custom error for no valid tax rate
        if (error.message.includes("No valid tax rate available")) {
            return res.status(404).json({ error: error.message });
        }

        // Handle other errors from the TaxJar API
        res.status(500).json({ error: "TaxJar API error: " + error.message });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
