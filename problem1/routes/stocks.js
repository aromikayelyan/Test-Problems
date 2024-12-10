import { Router } from "express"
import { isstock, stockcreate, getproducts, getallprod, marketget, isstockbyplu, isstockbyshop, 
        marketgetbyid, marketgetbyuid, getbyorder, getbyshelf} from "../querryies/dbquerryes.js"
import connection from "../utils/connect.js"




const router = Router()




router.post('/', async (req, res) => {
    try {
        const { plu, market_address, market_name, quantity_on_shelf, quantity_on_order } = req.body
        if (!market_address|| !plu) {
            return res.status(400).json({ message: 'market address and PLU are required' });
        }
        connection.query(getproducts, [plu], (err, prodresults) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            }if(prodresults.length == 0 ){
                return res.status(404).json({message:'Прдукт не найден'});
            }
            connection.query(marketget, [market_name, market_address], (err, markresults) =>{
                if (err) {
                    console.error('Ошибка при выполнении запроса: ', err);
                    return res.status(500).send('Ошибка сервера');
                }if(markresults.length == 0 ){
                    return res.status(404).json({message:'Магазин не найден'});
                }
                connection.query(isstock, [prodresults[0].uid, markresults[0].uid], (err, isresults) =>{
                    if (err) {
                        console.error('Ошибка при выполнении запроса: ', err);
                        return res.status(500).send('Ошибка сервера');
                    }
                    if (isresults.length != 0 && isresults[0].product_uid == prodresults[0].uid && isresults[0].shop_uid == markresults[0].uid) {
                        return res.status(200).json(`Сток с таким артикулем уже есть в стоке под ID: ${isresults[0].id}`);
                    }
                    connection.query(stockcreate, [prodresults[0].uid, markresults[0].uid, quantity_on_shelf, quantity_on_order], (err, results) =>{
                        if (err) {
                            console.error('Ошибка при выполнении запроса: ', err);
                            return res.status(500).send('Ошибка сервера');
                        }if(results.length == 0 ){
                            return res.status(404).json({message:'stock не найден'});
                        }
                        return res.status(200).json({message: "данныие добавлены"});
                    })
                })
            }) 
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.put('/addcount', async (req, res) => {
    try {
        const {plu, market_name, marked_address, count } = req.body

        
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.put('/reducecount', async (req, res) => {
    try {
        const {plu, market_name, marked_address, count } = req.body
        

       
        
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/plu/:plu', async (req, res) => {
    try {
        const plu = req.params.plu
        if (!plu) {
            return res.status(400).json({ message: 'Plu are required' });
        }
        connection.query(getproducts, [plu], (err, prodresults) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            } if (prodresults.length == 0) {
                return res.status(404).json({ message: 'Прдукт не найден' });
            }
            connection.query(isstockbyplu, [prodresults[0].uid], async (err, isresults) => {
                if (err) {
                    console.error('Ошибка при выполнении запроса: ', err);
                    return res.status(500).send('Ошибка сервера');
                }
                if (isresults.length == 0) {
                    return res.status(404).json({ message: 'Прдукт не найден' });
                }
                let data = []
                const promises = isresults.map((element) =>
                    new Promise((resolve, reject) => {
                        connection.query(marketgetbyuid, [element.shop_uid], (err, markresults) => {
                            if (err) {
                                console.error('Ошибка при выполнении запроса: ', err);
                                return reject(err);
                            }
                
                            if (markresults.length === 0) {
                                resolve({
                                    prodct_name: prodresults[0].prodct_name,
                                    market_name: 'not found',
                                    quantity_on_shelf: element.quantity_on_shelf,
                                    quantity_on_order: element.quantity_on_order,
                                });
                            } else {
                                resolve({
                                    prodct_name: prodresults[0].product_name,
                                    market_name: markresults[0].market_name + ' ' + markresults[0].marked_address ,
                                    quantity_on_shelf: element.quantity_on_shelf,
                                    quantity_on_order: element.quantity_on_order,
                                });
                            }
                        });
                    })
                )
                data = await Promise.all(promises);
                return res.status(200).json(data);
            })
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/byorder', async (req, res) => {
    try {
        connection.query(getbyorder, (err, joinresults) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            } if (joinresults.length == 0) {
                return res.status(404).json({ message: 'Прдукт не найден' });
            }
            return res.status(200).json(joinresults);
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/byshelf', async (req, res) => {
    try {
        connection.query(getbyshelf, (err, joinresults) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            } if (joinresults.length == 0) {
                return res.status(404).json({ message: 'Прдукт не найден' });
            }
            return res.status(200).json(joinresults);
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/shop/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: 'id are required' });
        }
        connection.query(getallprod, (err, prodresults) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            } if (prodresults.length == 0) {
                return res.status(404).json({ message: 'Прдукт не найден' });
            }
            connection.query(marketgetbyid, [id], (err, marketres) => {
                if (err) {
                    console.error('Ошибка при выполнении запроса: ', err);
                    return res.status(500).send('Ошибка сервера');
                } if (marketres.length == 0) {
                    return res.status(404).json({ message: 'Магазин не найден' });
                }
                connection.query(isstockbyshop, [marketres[0].uid], async (err, isresults) => {
                    if (err) {
                        console.error('Ошибка при выполнении запроса: ', err);
                        return res.status(500).send('Ошибка сервера');
                    }
                    if (isresults.length == 0) {
                        return res.status(404).json({ message: 'Прдукт не найден' });
                    }
                    let data = []
                    const promises = isresults.map((element) =>
                        new Promise((resolve, reject) => {
                            connection.query(marketgetbyuid, [element.shop_uid], (err, markresults) => {
                                if (err) {
                                    console.error('Ошибка при выполнении запроса: ', err);
                                    return reject(err);
                                }
                                if (markresults.length === 0) {
                                    resolve({
                                        prodct_name: prodresults[0].prodct_name,
                                        market_name: 'not found',
                                        quantity_on_shelf: element.quantity_on_shelf,
                                        quantity_on_order: element.quantity_on_order,
                                    });
                                } else {
                                    resolve({
                                        prodct_name: prodresults[0].product_name,
                                        market_name: markresults[0].market_name + ' ' + markresults[0].marked_address,
                                        quantity_on_shelf: element.quantity_on_shelf,
                                        quantity_on_order: element.quantity_on_order,
                                    });
                                }
                            });
                        })
                    )
                    data = await Promise.all(promises);
                    return res.status(200).json(data);
                })
            })

        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})


export default router