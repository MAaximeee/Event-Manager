import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'

const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.json())
app.use('/auth', authRouter) 
app.get('/', (req, res) => {
    res.send("Le serveur fonctionne ");
});

app.listen(process.env.PORT, () => {
    console.log("Le Server est en route")
})