import express from 'express'
const app = express()
app.use(express.json())

const PORT = 5000

app.get('/', (_req, _res) => {
    _res.send('OK')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})