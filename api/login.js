module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { username, password } = req.body

  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPass = process.env.ADMIN_PASS || 'admin123'
  const userUser = process.env.USER_USER || 'user'
  const userPass = process.env.USER_PASS || 'user123'

  if (
    (username === adminUser && password === adminPass) ||
    (username === userUser && password === userPass)
  ) {
    res.status(200).json({ success: true, message: 'Login successful', username })
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' })
  }
}