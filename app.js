import express from 'express'
import { apiRouter } from './routes/api.route.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.static('public'))

app.use('/api', apiRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})