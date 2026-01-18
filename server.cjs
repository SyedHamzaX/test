const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

const USERS_FILE = path.join(__dirname, 'users.json')

app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  try {
    const usersData = fs.readFileSync(USERS_FILE, 'utf8')
    const users = JSON.parse(usersData)

    const user = users.find(u => u.username === username && u.password === password)

    if (user) {
      res.json({ success: true, message: 'Login successful', username: user.username })
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' })
    }
  } catch (error) {
    console.error('Error reading users file:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})