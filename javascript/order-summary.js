// Update Order Summary and Total

const products = {
            'chocolate-cake'     : { name: 'Triple Chocolate Cake', price: 380.00 },
            'vanilla-cake'       : { name: 'Classic Vanilla Cake' , price: 320.50 },
            'red-velvet-cake'    : { name: 'Red Velvet Cake'      , price: 390.90 },
            'blueberry-muffin'   : { name: 'BlueBerry Muffin'     , price: 13.50  },
            'choc-chip-cookie'   : { name: 'Chocolate Chip Cookie', price: 9.50   },
            'chocolate-croissant': { name: 'Chocolate Croissant'  , price: 12.50  },
        };

        let cart = {};

        function updateQuantity(productId, change) {
            const currentQty = cart[productId] || 0;
            const newQty = Math.max(0, currentQty + change);
            
            if (newQty === 0) {
                delete cart[productId];
            } else {
                cart[productId] = newQty;
            }
            
            document.getElementById(`qty-${productId}`).textContent = newQty;
            updateSummary();
        }

        function updateSummary() {
            const summaryItems = document.getElementById('summaryItems');
            const summaryTotal = document.getElementById('summaryTotal');
            const submitBtn = document.getElementById('submitBtn');
            
            if (Object.keys(cart).length === 0) {
                summaryItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                summaryTotal.style.display = 'none';
                submitBtn.disabled = true;
                return;
            }
            
            let html = '';
            let total = 0;
            
            for (const [productId, quantity] of Object.entries(cart)) {
                const product = products[productId];
                const itemTotal = product.price * quantity;
                total += itemTotal;
                
                html += `
                    <div class="summary-item">
                        <span>${quantity}x ${product.name}</span>
                        <span>R${itemTotal.toFixed(2)}</span>
                    </div>
                `;
            }
            
            summaryItems.innerHTML = html;
            summaryTotal.style.display = 'block';
            document.getElementById('totalPrice').textContent = `R${total.toFixed(2)}`;
            submitBtn.disabled = false;
        }

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('pickupDate').setAttribute('min', today);