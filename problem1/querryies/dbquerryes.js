// product querries
export const prodcreateqr = 'INSERT INTO products (product_name, product_plu, uid) VALUES (?, ?, ?)'
export const isproduct = 'SELECT product_plu FROM products WHERE product_plu = ?'
export const getproducts = 'SELECT * FROM products WHERE product_plu = ?'  // this querry return product by plu
export const getallprod = 'SELECT * FROM products'
export const getprodbyname = 'SELECT * FROM products WHERE product_name = ?'
export const deleteprod = 'DELETE FROM products WHERE product_plu = ?'


//SET SQL_SAFE_UPDATES = 0;

// SELECT * FROM stocks



// market querries
export const marketcreateqr = 'INSERT INTO markets (market_name, marked_address, uid) VALUES (?, ?, ?)'
export const marketget = 'SELECT * FROM markets WHERE market_name = ? AND marked_address = ?'
export const marketgetbyid = 'SELECT * FROM markets WHERE id = ?'
export const marketgetbyuid = 'SELECT * FROM markets WHERE uid = ?'




// stock querries
export const stockcreate = 'INSERT INTO stocks (product_uid, shop_uid, quantity_on_shelf, quantity_on_order) VALUES (?, ?, ?, ?)'
export const isstock = 'SELECT * FROM stocks WHERE product_uid = ?  AND shop_uid = ?'
export const isstockbyplu = 'SELECT * FROM stocks WHERE product_uid = ? '
export const isstockbyshop = 'SELECT * FROM stocks WHERE shop_uid = ? '
export const getbyorder = `
                             SELECT market_name,marked_address,product_name,product_plu,quantity_on_shelf,quantity_on_order 
                             FROM stocks
                             JOIN markets ON markets.uid = stocks.shop_uid
                             JOIN products ON products.uid = stocks.product_uid
                             ORDER BY  quantity_on_order`
export const getbyshelf = `
                             SELECT market_name,marked_address,product_name,product_plu,quantity_on_shelf,quantity_on_order 
                             FROM stocks
                             JOIN markets ON markets.uid = stocks.shop_uid
                             JOIN products ON products.uid = stocks.product_uid
                             ORDER BY  quantity_on_shelf`


