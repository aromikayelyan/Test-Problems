import { Router } from "express"
import connection from "../utils/connect.js"
import { prodcreateqr, getproducts, getprodbyname, getallprod, deleteprod, actionadd } from "../querryies/dbquerryes.js"
import { v4 as uuidv4 } from "uuid"




const router = Router()




router.post('/', async (req, res) => {
    try {
        const { name, plu } = req.body
        if (!name || !plu) {
            return res.status(400).json({ message: 'Name and PLU are required' });
        }
        connection.query(getproducts, [plu], (err, getresults) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            }
            if (getresults.length != 0 && getresults[0].product_plu == plu) {
                return res.status(200).json(`Продукт с таким артикулем уже есть под ID: ${getresults[0].id}`);
            }
            const uid = uuidv4()
            connection.query(prodcreateqr, [name, plu, uid], (err, results) => {
                if (err) {
                    console.error('Ошибка при вставке данных: ', err);
                    return res.status(500).send('Ошибка сервера');     
                }
                connection.query(actionadd,  [uid, '', `Добавлен новый продукт. артикул - ${plu}` ], (err, inresults) => {
                    if (err) {
                        console.error('Ошибка при вставке данных: ', err);
                        return res.status(500).send('Ошибка сервера');
                    }
                   res.status(200).send(`Продукт добавлен с ID: ${results.insertId}`);
                })
            })
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})


router.get('/plu/:plu', async (req, res) => {
    try {
        const  plu  = req.params.plu
        if (!plu) {
            return res.status(400).json({ message: 'Plu are required' });
        }
        connection.query(getproducts, [plu], (err, results) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            }if(results.length == 0 ){
                return res.status(200).json({message:'Прдукт не найден'});
            }
             return res.status(200).json(results);
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})


router.get('/name/:name', async (req, res) => {
    try {
        const  name  = req.params.name
        console.log(name)
        if (!name) {
            return res.status(400).json({ message: 'Name are required' });
        }
        connection.query(getprodbyname, [name], (err, results) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            }if(results.length == 0 ){
                return res.status(200).json({message:'Прдукт не найден'});
            }
             return res.status(200).json(results);
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})


router.get('/', async (req, res) => {
    try {
        connection.query(getallprod, (err, results) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            }if(results.affectedRows === 0){
                return res.status(200).json({message:'Прдукт не найден'});
            }
             return res.status(200).json(results);
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})


router.delete('/:plu', async (req, res) => {
    try {
        const  plu  = req.params.plu
        if (!plu) {
            return res.status(400).json({ message: 'Plu are required' });
        }
        connection.query(deleteprod, [plu], (err, results) => {
            if (err) {
                console.error('Ошибка при выполнении запроса: ', err);
                return res.status(500).send('Ошибка сервера');
            }if(results.affectedRows === 0){
                return res.status(200).json({message:'Прдукт не найден'});
            }
             return res.status(200).json({message:'Прдукт удален'});
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})




export default router