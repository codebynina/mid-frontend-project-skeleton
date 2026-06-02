import { NavLink, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

export default function Layout() {
  const { user, logout } = useAuth();
  const { items } = useCart();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <header className="main-header">
        <nav className="navbar">
          <a
            href="https://www.hackyourfuture.dk/"
            target="_blank"
            rel="noreferrer"
            className="logo-link"
          >
            <img src={hyfLogo} alt="HackYourFuture logo" className="logo" />
          </a>

          <div className="nav-links">
            <NavLink to="/">⌂ Home</NavLink>
            <NavLink to="/events">🎟️ Events</NavLink>

            <NavLink to="/cart" className="cart-link">
              🛒 Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </NavLink>

            {user ? (
              <>
                <NavLink to="/orders">🎫 My Tickets</NavLink>
                <span className="user-pill">{user.email}</span>
                <button className="signout-button" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">🔐 Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
