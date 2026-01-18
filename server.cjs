const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPass = process.env.ADMIN_PASS || 'admin123'
  const userUser = process.env.USER_USER || 'user'
  const userPass = process.env.USER_PASS || 'user123'

  if (
    (username === adminUser && password === adminPass) ||
    (username === userUser && password === userPass)
  ) {
    res.json({ success: true, message: 'Login successful', username })
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})