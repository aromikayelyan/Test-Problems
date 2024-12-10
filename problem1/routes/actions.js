import { Router } from "express"
import { v4 as uuidv4 } from "uuid"




const router = Router()




router.post('/', async (req, res) => {
    try {
        

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