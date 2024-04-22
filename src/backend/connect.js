const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing
const app = express();
const port = 8080; 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user'
});
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/users', async (req, res) => {
    try {
        const formData = req.body;
        // Hash password before saving to database
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        const query = `INSERT INTO users (username, fullname, email, password, gender, dob, address, avatarUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [formData.username, formData.fullname, formData.email, hashedPassword, formData.gender, formData.dob, formData.address, formData.avatarUrl], (err, result) => {
            if (err) {
                console.error('Error connecting to database:', err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('User created:', result.insertId);
                res.status(200).send('New user created successfully');
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
