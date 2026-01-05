import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const userRegister = (req, res) => {
    const {username, password} = req.body;
    if (!username || !password){
        res.status(401).json({message: 'username and password required!'})
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    //new.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, hashedPassword], (err, result) => {
//query.changes

    pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, hashedPassword], (err, result) => {
        if (err) {
            res.status(500).json({message: 'Internal server error'});
        } else {
            res.status(201).json({message: 'User registered successfully', userId: result.rows[0].id});
        }
    });
}

export const userLogin = (req, res) => {
    const {username, password} = req.body;

    if (!username || !password){
        res.status(401).json({message: 'username and password required!'})
    }

    const user = pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
        if (err) {
            res.status(500).json({message: 'Internal server error'});
        } else {
            if (result.rows.length === 0) {
                res.status(401).json({message: 'Invalid credentials'});
            } else {
                const validPassword = bcrypt.compareSync(password, result.rows[0].password);
                if (!validPassword) {
                    res.status(401).json({message: 'Invalid credentials'});
                } else {
                    const token = jwt.sign({id: result.rows[0].id}, process.env.JWT_SECRET, {expiresIn: '1h'});
                    res.status(200).json({token});
                }
            }
        }
    });
}