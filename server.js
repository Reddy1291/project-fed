const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Load users
const usersPath = path.join(__dirname, 'users.json');
let users = [];
if(fs.existsSync(usersPath)){
  users = JSON.parse(fs.readFileSync(usersPath));
} else {
  console.error("users.json not found!");
}

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if(user){
    if(user.role === 'student') return res.redirect('/dashboard.html');
    if(user.role === 'admin') return res.redirect('/admindashboard.html');
  }
  res.redirect('/errorpage.html');
});

// Register
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if(users.find(u => u.email === email)){
    return res.redirect('/errorpage.html');
  }
  users.push({ email, password, role: 'student' });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.redirect('/LoginPage.html');
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
