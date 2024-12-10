import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import products from './routes/products.js'
import market from './routes/market.js'
import stocks from './routes/stocks.js'



dotenv.config()




const PORT = process.env.PORT || 4603


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())




app.use('/products', products)
app.use('/market', market)
app.use('/stocks', stocks)




async function start(){
    try {
        app.listen(PORT,()=>{
            console.log(`server run on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()


