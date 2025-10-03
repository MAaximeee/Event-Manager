import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    

    
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length > 0) {
            return res.status(409).json({message : "Utilisateur déjà existant"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
            [username, email, hashPassword])
        
        return res.status(201).json({message: "Utilisateur créé avec succès"})
    } catch(err) {
        console.error('Register error:', err.message)
        return res.status(500).json({message: "Erreur du serveur"})
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    

    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length === 0) {
            return res.status(404).json({message : "Utilisateur non trouvé"})
        }
        const isMatch = await bcrypt.compare(password, rows[0].password)
        if(!isMatch) {
            return res.status(401).json({message : "Mauvais mot de passe"}); 
        }
        const token = jwt.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'})
        
        return res.status(201).json({token: token})
    } catch(err) {
        console.error('Login error:', err.message)
        return res.status(500).json({message: "Erreur du serveur"})
    }
})

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader) {
            return res.status(403).json({message: "Aucun token fourni"})
        }
        const token = authHeader.split(' ')[1];
        if(!token) {
            return res.status(403).json({message: "Aucun token fourni"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
        next()
    }  catch(err) {
        console.error('Token verification error:', err.message)
        return res.status(500).json({message: "Erreur du serveur"})
    }
}

router.get('/home', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId])
        if(rows.length === 0) {
            return res.status(404).json({message : "utilisateur non trouvé"});
        }

        return res.status(201).json({user: rows[0]})
    }catch(err) {
        return res.status(500).json({message: "erreur du serveur"})
    }
})

export default router;