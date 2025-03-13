const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Temporary storage for validated data
let userData = [];

// Set up EJS for server-side rendering
app.set('view engine', 'ejs');

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the form
app.get('/', (req, res) => {
    res.render('index');
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, age, gender, comments } = req.body;

    // Server-side validation
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
    res.render('result', { errors: [], name, email, age, gender, comments });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
