// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const countElement = document.getElementById('cartCount');
  if (countElement) countElement.textContent = cartCount;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  alert(`${product.name} কার্টে যোগ হয়েছে!`);
}

function openCart() {
  window.location.href = 'checkout.html';
}

updateCartCount();
