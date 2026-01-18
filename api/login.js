const fs = require('fs')
const path = require('path')

const USERS_FILE = path.join(process.cwd(), 'users.json')

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { username, password } = req.body

  try {
    const usersData = fs.readFileSync(USERS_FILE, 'utf8')
    const users = JSON.parse(usersData)

    const user = users.find(u => u.username === username && u.password === password)

    if (user) {
      res.status(200).json({ success: true, message: 'Login successful', username: user.username })
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' })
    }
  } catch (error) {
    console.error('Error reading users file:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}