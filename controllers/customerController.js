import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const getCustomers = (req, res) => {
    pool.query('SELECT * FROM customers', (err, result) => {
        if (err) {
            res.status(500).json({message: 'Internal server error'});
        } else {
            res.status(200).json(result.rows);
        }
    });
};

export const createCustomer = (req, res) => {
    const { name, email } = req.body;
    const userId = req.user.id; 

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    pool.query(
        `INSERT INTO customers (user_id, name, email)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [userId, name, email],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            res.status(201).json({
                message: "Customer created successfully",
                customerId: result.rows[0].id
            });
        }
    );
};

export const getCustomerById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM customers WHERE id = $1', [id], (err, result) => {
        if (err) {
            res.status(500).json({message: 'Internal server error'});
        } else {
            if (result.rows.length === 0) {
                res.status(404).json({message: 'Customer not found'});
            } else {
                res.status(200).json(result.rows[0]);
            }
        }
    });
};

export const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    pool.query('UPDATE customers SET name = $1, email = $2 WHERE id = $3', [name, email, id], (err, result) => {
        if (err) {
            res.status(500).json({message: 'Internal server error'});
        } else {
            res.status(200).json({message: 'Customer updated successfully'});
        }
    });
};

export const deleteCustomer = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM customers WHERE id = $1', [id], (err, result) => {
        if (err) {
            res.status(500).json({message: 'Internal server error'});
        } else {
            res.status(200).json({message: 'Customer deleted successfully'});
        }
    });
};

