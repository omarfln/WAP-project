const express = require('express');
const cors = require('cors'); // Import the cors package
const accountRouter = require("./router/accountRouter")
const jwt = require('jsonwebtoken');

const app = express();

const port = process.env.PORT || 4000;

// Use the cors middleware to enable CORS

app.use(cors());


app.use(express.json());

app.use('/accounts', accountRouter);

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Predefined login users
    const users = [
      { username: 'Omar', password: '123456' },
      { username: 'Omar2', password: '654321' },
    ];
  
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (user) {
      // Successful login, now Generate a token
      const token = jwt.sign({ username }, 'secret1', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });


app.use((err, req, res, next) => {
    res.status(500).json({ message: "Something went wrong: " + err.message });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
