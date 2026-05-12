import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/events">Browse events</Link>
      </div>
    );
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Your cart</h1>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px" }}>
          <h2>{item.name}</h2>
          <p>Price: € {item.price} </p>
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            />
          </label>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h2>Total: €{total} </h2>

      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
}
