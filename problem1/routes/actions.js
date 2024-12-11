import { Router } from "express"
import connection from "../utils/connect.js"
import { getactionsbydate, getactionsbyplu, getproductid, getactions, getactionsbyshop, getprobydaction } from "../querryies/dbquerryes.js"




const router = Router()


router.get('/plu/:plu', async (req, res) => {
    try {
        const plu = req.params.plu
        if (!plu) {
            return res.status(400).json({ message: 'Plu are required' });
        }
        connection.query(getproductid, [plu], (err, results) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            } if (results.length == 0) {
                return res.status(404).json({ message: 'Данные не найдены' });
            }
            connection.query(getactionsbyplu, [results[0].uid], (err, joinresults) => {
                if (err) {
                    console.error('Ошибка при выполнении запроса: ', err);
                    return res.status(500).send('Ошибка сервера');
                } if (joinresults.length == 0) {
                    return res.status(404).json({ message: 'Данные не найдены' });
                }
                return res.status(200).json(joinresults);
            })
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})


router.get('/product/:plu', async (req, res) => {
    try {
        const plu = req.params.plu
        if (!plu) {
            return res.status(400).json({ message: 'Plu are required' });
        }
        connection.query(getproductid, [plu], (err, results) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            } if (results.length == 0) {
                return res.status(404).json({ message: 'Данные не найдены' });
            }
            connection.query(getprobydaction, [results[0].uid], (err, joinresults) => {
                if (err) {
                    console.error('Ошибка при выполнении запроса: ', err);
                    return res.status(500).send('Ошибка сервера');
                } if (joinresults.length == 0) {
                    return res.status(404).json({ message: 'Данные не найдены' });
                }
                return res.status(200).json(joinresults);
            })
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/bydate', async (req, res) => {
    try {
        connection.query(getactionsbydate, (err, joinresults) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            } if (joinresults.length == 0) {
                return res.status(404).json({ message: 'Данные не найдены' });
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
            return res.status(400).json({ message: 'ID are required' });
        }
        connection.query(getactionsbyshop, [id], (err, joinresults) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            } if (joinresults.length == 0) {
                return res.status(404).json({ message: 'Данные не найдены' });
            }
            return res.status(200).json(joinresults);
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/', async (req, res) => {
    try {
        connection.query(getactions, (err, joinresults) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            } if (joinresults.length == 0) {
                return res.status(404).json({ message: 'Данные не найдены' });
            }
            return res.status(200).json(joinresults);
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})






export default router