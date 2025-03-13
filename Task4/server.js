const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
let userData = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/submit', (req, res) => {
    const { name, email, age, gender, password, comments } = req.body;

    const errors = [];
    if (!name || !email || !age || !gender || !password) {
        errors.push("All fields are required.");
    }
    if (isNaN(age) || age < 0 || age > 120) {
        errors.push("Please enter a valid age between 0 and 120.");
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number.");
    }
    if (errors.length > 0) {
        return res.status(400).render('result', { errors });
    }
    userData.push({ name, email, age, gender, password, comments });
    res.render('result', { errors: [], name, email, age, gender, comments });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
