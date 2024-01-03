import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="box-container">
        <div className="function-box"><Link to="/dashboard/admin/categories" className="box-link">Categories</Link></div>
        <div className="function-box"><Link to="/dashboard/admin/products" className="box-link">Products</Link></div>
        <div className="function-box"><Link to="/dashboard/admin/orders" className="box-link">Orders</Link></div>
        <div className="function-box"><Link to="/dashboard/admin/users" className="box-link">Users</Link></div>
      </div>
    </div>
  )
}

export default AdminDashboard;