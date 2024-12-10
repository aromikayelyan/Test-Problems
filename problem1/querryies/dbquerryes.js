// product querries
export const prodcreateqr = 'INSERT INTO products (product_name, product_plu, uid) VALUES (?, ?, ?)'
export const isproduct = 'SELECT product_plu FROM products WHERE product_plu = ?'
export const getproductid = 'SELECT  uid FROM products WHERE product_plu = ?'
export const getproducts = 'SELECT * FROM products WHERE product_plu = ?'  // this querry return product by plu
export const getallprod = 'SELECT * FROM products'
export const getprodbyname = 'SELECT * FROM products WHERE product_name = ?'
export const deleteprod = 'DELETE FROM products WHERE product_plu = ?'





// market querries
export const marketcreateqr = 'INSERT INTO markets (market_name, market_address, uid) VALUES (?, ?, ?)'
export const marketget = 'SELECT * FROM markets WHERE market_name = ? AND market_address = ?'
export const marketgetbyid = 'SELECT * FROM markets WHERE id = ?'
export const marketgetbyuid = 'SELECT * FROM markets WHERE uid = ?'





// stock querries
export const stockcreate = 'INSERT INTO stocks (product_uid, shop_uid, quantity_on_shelf, quantity_on_order) VALUES (?, ?, ?, ?)'
export const isstock = 'SELECT * FROM stocks WHERE product_uid = ?  AND shop_uid = ?'
export const isstockbyplu = 'SELECT * FROM stocks WHERE product_uid = ?'
export const isstockbyshop = 'SELECT * FROM stocks WHERE shop_uid = ? '
export const getstockcount = 'SELECT quantity_on_order FROM stocks WHERE product_uid = ?  AND shop_uid = ? '
export const stockeadd = 'UPDATE stocks SET quantity_on_order = ?  WHERE product_uid = ?  AND shop_uid = ?'
export const getbyorder = `
                             SELECT market_name,market_address,product_name,product_plu,quantity_on_shelf,quantity_on_order 
                             FROM stocks
                             JOIN markets ON markets.uid = stocks.shop_uid
                             JOIN products ON products.uid = stocks.product_uid
                             ORDER BY  quantity_on_order`
export const getbyshelf = `
                             SELECT market_name,market_address,product_name,product_plu,quantity_on_shelf,quantity_on_order 
                             FROM stocks
                             JOIN markets ON markets.uid = stocks.shop_uid
                             JOIN products ON products.uid = stocks.product_uid
                             ORDER BY  quantity_on_shelf`





//actions querries
export const actionadd = 'INSERT INTO actionshistory (product_id, shop_id, actions) VALUES (?, ?, ?)'
export const getactionsbydate = `
                             SELECT market_name,market_address,product_name,product_plu, actions, actionshistory.created_at 
                             FROM actionshistory
                             JOIN markets ON markets.uid = actionshistory.shop_id
                             JOIN products ON products.uid = actionshistory.product_id
                             ORDER BY  actionshistory.created_at
                             `
export const getactionsbyplu = `
                             SELECT market_name,market_address,product_name,product_plu, actions, actionshistory.created_at 
                             FROM actionshistory
                             JOIN markets ON markets.uid = actionshistory.shop_id
                             JOIN products ON products.uid = actionshistory.product_id
                             WHERE actionshistory.product_id = ?
                             ORDER BY  actionshistory.created_at
                             `  
export const getactions = `
                             SELECT market_name,market_address,product_name,product_plu, actions, actionshistory.created_at 
                             FROM actionshistory
                             JOIN markets ON markets.uid = actionshistory.shop_id
                             JOIN products ON products.uid = actionshistory.product_id
                             ORDER BY actions
                             `
export const getactionsbyshop = `
                             SELECT market_name,market_address,product_name,product_plu, actions, actionshistory.created_at 
                             FROM actionshistory
                             JOIN markets ON markets.uid = actionshistory.shop_id
                             JOIN products ON products.uid = actionshistory.product_id
                             WHERE markets.id = ?
                             ORDER BY actions
                             `                                                          






//SET SQL_SAFE_UPDATES = 0;