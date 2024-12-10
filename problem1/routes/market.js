import { Router } from "express"
import connection from "../utils/connect.js"
import { marketcreateqr, marketget } from "../querryies/dbquerryes.js"
import { v4 as uuidv4 } from "uuid"



const router = Router()


router.post('/', async (req, res) => {
    try {
        const { market_name, market_address } = req.body

        connection.query(marketget, [market_name, market_address], (err, results) => {
            if (err) {
                console.error('Ошибка при вставке данных: ', err);
                return res.status(500).send('Ошибка сервера');
            }
            if (results.length != 0 && results[0].market_name == market_name && results[0].marked_address) {
                return res.status(200).json(`Такой Магазин уже есть под ID: ${results[0].id}`);
            }
            const uid = uuidv4()
            connection.query(marketcreateqr, [market_name, market_address, uid], (err, results) => {
                if (err) {
                    console.error('Ошибка при вставке данных: ', err);
                    return res.status(500).json('Ошибка сервера');
                }
                return res.status(200).json(`Магазин добавлен с ID: ${results.insertId}`);
            })
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/:plu', async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/', async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.delete('/', async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})





export default router