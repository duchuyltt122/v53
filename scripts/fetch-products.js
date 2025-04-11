// scripts/fetch-products.js
const fs = require('fs');

async function fetchProducts() {
  try {
    const response = await fetch('https://ipaionbpmtgtfmlkkaer.supabase.co/rest/v1/products?select=*', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwYWlvbmJwbXRndGZtbGtrYWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTEyNTcsImV4cCI6MjA1ODQ2NzI1N30._MfrbZn9evsd6HXu0tbYExzG7B3yeXIzWY-qaffGr9g',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Products fetched successfully!');
    
    // Save to a file for inspection
    fs.writeFileSync('products-data.json', JSON.stringify(data, null, 2));
    console.log('Data saved to products-data.json');
    
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

fetchProducts();
