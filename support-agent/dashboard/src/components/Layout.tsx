import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth";

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="swatch" />
          <span>Support Agent</span>
        </div>
        <NavLink to="/" end className="nav-link">
          Overview
        </NavLink>
        <NavLink to="/inbox" className="nav-link">
          Inbox
        </NavLink>
        <NavLink to="/leads" className="nav-link">
          Leads
        </NavLink>
        <NavLink to="/knowledge-base" className="nav-link">
          Knowledge Base
        </NavLink>
        <NavLink to="/tickets" className="nav-link">
          Tickets
        </NavLink>
        <NavLink to="/appointments" className="nav-link">
          Appointments
        </NavLink>
        <NavLink to="/settings" className="nav-link">
          Settings
        </NavLink>
        <div className="sidebar-footer">
          <div style={{ marginBottom: 6 }}>
            {user?.name}
            <br />
            <span style={{ opacity: 0.7 }}>{user?.role}</span>
          </div>
          <button onClick={logout}>Sign out</button>
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
