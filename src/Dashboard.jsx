import { useState, useEffect } from 'react'
import './Dashboard.css'

const initialItems = [
  { id: 1, name: 'Laptop Dell XPS 15', category: 'Electronics', quantity: 5, price: 1299.99, status: 'In Stock' },
  { id: 2, name: 'Office Chair Ergonomic', category: 'Furniture', quantity: 12, price: 349.99, status: 'In Stock' },
  { id: 3, name: 'Wireless Mouse Logitech', category: 'Electronics', quantity: 45, price: 29.99, status: 'In Stock' },
  { id: 4, name: 'Standing Desk', category: 'Furniture', quantity: 3, price: 599.99, status: 'Low Stock' },
  { id: 5, name: 'Monitor 27" 4K', category: 'Electronics', quantity: 8, price: 449.99, status: 'In Stock' },
  { id: 6, name: 'Keyboard Mechanical', category: 'Electronics', quantity: 15, price: 129.99, status: 'In Stock' },
  { id: 7, name: 'Webcam HD 1080p', category: 'Electronics', quantity: 0, price: 79.99, status: 'Out of Stock' },
  { id: 8, name: 'Filing Cabinet', category: 'Furniture', quantity: 6, price: 189.99, status: 'In Stock' },
]

function Dashboard({ user, onLogout }) {
  const [items, setItems] = useState(initialItems)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const categories = ['All', ...new Set(items.map(item => item.category))]

  const filteredItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'price') return b.price - a.price
      if (sortBy === 'quantity') return b.quantity - a.quantity
      return 0
    })

  const stats = {
    totalItems: items.length,
    totalValue: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    lowStock: items.filter(item => item.quantity > 0 && item.quantity <= 5).length,
    outOfStock: items.filter(item => item.quantity === 0).length,
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1>Inventory Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-avatar">{user.charAt(0).toUpperCase()}</span>
            <span className="user-name">{user}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">📊</span>
            Dashboard
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📦</span>
            Items
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📥</span>
            Orders
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👥</span>
            Users
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            Settings
          </a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">📦</div>
            <div className="stat-info">
              <h3>{stats.totalItems}</h3>
              <p>Total Items</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">💰</div>
            <div className="stat-info">
              <h3>${stats.totalValue.toLocaleString()}</h3>
              <p>Total Value</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">⚠️</div>
            <div className="stat-info">
              <h3>{stats.lowStock}</h3>
              <p>Low Stock</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">❌</div>
            <div className="stat-info">
              <h3>{stats.outOfStock}</h3>
              <p>Out of Stock</p>
            </div>
          </div>
        </div>

        <div className="items-section">
          <div className="items-header">
            <h2>Inventory Items</h2>
            <button className="add-btn">+ Add Item</button>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="quantity">Sort by Quantity</option>
            </select>
          </div>

          <div className="items-table-wrapper">
            <table className="items-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td className="item-name">{item.name}</td>
                    <td>
                      <span className={`category-tag ${item.category.toLowerCase()}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="quantity">{item.quantity}</td>
                    <td className="price">${item.price.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button className="action-btn edit">✏️</button>
                      <button className="action-btn delete">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard