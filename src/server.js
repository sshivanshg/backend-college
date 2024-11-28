const app = require('./app'); // Correct relative path to app.js
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});