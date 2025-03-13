const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let userData = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { name, email, age, gender, comments } = req.body;

    const errors = [];
    if (!name || !email || !age || !gender) {
        errors.push("All fields are required except comments.");
    }
    if (isNaN(age) || age < 0 || age > 120) {
        errors.push("Please enter a valid age between 0 and 120.");
    }
    if (errors.length > 0) {
        return res.status(400).render('result', { errors });
    }

    // Store validated data in temporary storage
    userData.push({ name, email, age, gender, comments });
    
    // Render result page with the submitted data
    res.render('result', { name, email, age, gender, comments });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
