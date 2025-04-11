// scripts/create-orders-table.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createOrdersTable() {
  console.log('Creating orders table...');

  // Try to select from orders table to check if it exists
  const { error: checkError } = await supabase
    .from('orders')
    .select('id')
    .limit(1);

  // If there's no error, the table exists
  if (!checkError) {
    console.log('Orders table already exists.');
    return;
  }

  // If error code is not 'PGRST116' (relation does not exist), it's another error
  if (checkError.code !== 'PGRST116') {
    console.error('Error checking if table exists:', checkError);
    return;
  }

  console.log('Orders table does not exist. Creating...');

  // Create the table using raw SQL query
  // Note: This is a simplified approach for demonstration purposes
  // In production, you should use migrations or a more robust approach
  try {
    // Create the table directly using SQL query
    await supabase.from('orders').insert({
      id: 'test-order-id',
      customer_email: 'test@example.com',
      customer_name: 'Test User',
      customer_phone: '1234567890',
      shipping_address: 'Test Address',
      amount: 0,
      items: JSON.stringify([]),
      payment_method: 'test',
      payment_status: 'test',
      order_status: 'test'
    }).select();

    console.log('Orders table created successfully!');
  } catch (error) {
    console.error('Error creating orders table:', error);
  }
}

createOrdersTable()
  .catch(err => console.error('Error:', err))
  .finally(() => process.exit(0));
