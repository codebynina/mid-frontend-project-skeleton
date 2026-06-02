"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import hyfLogo from "@/assets/hyf.svg";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Layout({ children }) {
  const pathname = usePathname();

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
            <img src={hyfLogo.src} alt="HackYourFuture logo" className="logo" />
          </a>

          <div className="nav-links">
            <Link href="/" className={pathname === "/" ? "active-link" : ""}>
              ⌂ Home
            </Link>

            <Link
              href="/events"
              className={pathname === "/events" ? "active-link" : ""}
            >
              🎟️ Events
            </Link>

            <Link
              href="/cart"
              className={
                pathname === "/cart" ? "active-link cart-link" : "cart-link"
              }
            >
              🛒 Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>

            {user ? (
              <>
                <Link
                  href="/orders"
                  className={pathname === "/orders" ? "active-link" : ""}
                >
                  🎫 My Tickets
                </Link>

                <span className="user-pill">{user.email}</span>

                <button className="signout-button" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={pathname === "/login" ? "active-link" : ""}
                >
                  🔐 Login
                </Link>

                <Link
                  href="/register"
                  className={pathname === "/register" ? "active-link" : ""}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
