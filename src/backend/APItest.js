const db = require('../backend/connect')

const newUser = {
    username: 'john_doe',
    fullname: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    gender: 'Nam',
    dob: '1990-01-01',
    address: '123 Street, City, Country',
    avatarUrl: null
};

connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) throw err;
    console.log('User đã tạo:', result.insertId);
});

connection.end((err) => {
    if (err) throw err;
    console.log('Mất kết nối MySQL database');
});
