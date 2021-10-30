import { useState, useEffect, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [localCart, setLocalCart] = useState([]);
	const [count, setCount] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0.00);
	const [done, setDone] = useState(false);

	useEffect(() => {
		const getLocalCart = async () => {
			try {
				const { fetchedCart } = localStorage.getItem('cart');
				if (fetchedCart === null) {
					return;
				} else {
					const { cart } = JSON.parse(localStorage.getItem('cart'));
					setLocalCart(cart);
					setCount(cart.length);
				}
			} catch (err) {
				console.log('\nCart get ERROR: ', err);
			}
		};
		getLocalCart();
	}, []);

	return (
		<CartContext.Provider
			value={{
				cart: localCart,
				setCart: setLocalCart,
				count,
				setCount,
				done,
				setDone,
				totalPrice,
				setTotalPrice,
			}}>
			{children}
		</CartContext.Provider>
	);
};
