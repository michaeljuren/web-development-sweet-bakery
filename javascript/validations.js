// Form Validation and Email Script

// Validation functions
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return name.trim() !== '' && nameRegex.test(name.trim());
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && emailRegex.test(email.trim());
}

function validateSAPhoneNumber(phone) {
    const cleaned = phone.replace(/[\s\-()]/g, '');
    const saPhoneRegex = /^(0[1-8]\d{8}|\+27[1-8]\d{8}|27[1-8]\d{8})$/;
    return cleaned !== '' && saPhoneRegex.test(cleaned);
}

function validateSelect(value) {
    return value.trim() !== '';
}

function validateDate(dateValue) {
    return dateValue.trim() !== '';
}

function validateTime(timeValue) {
    return timeValue.trim() !== '';
}

// Display error message
function showError(inputElement, message) {
    removeError(inputElement);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    inputElement.parentElement.appendChild(errorDiv);
    inputElement.style.borderColor = '#dc3545';
}

// Remove error message
function removeError(inputElement) {
    const errorDiv = inputElement.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    inputElement.style.borderColor = '';
}

// Generate order summary for email
function generateOrderSummary() {
    let orderItems = '';
    let total = 0;
    
    // Get cart items from your existing cart object
    if (typeof cart !== 'undefined' && typeof products !== 'undefined') {
        for (const [productId, quantity] of Object.entries(cart)) {
            const product = products[productId];
            const itemTotal = product.price * quantity;
            total += itemTotal;
            
            orderItems += `${quantity}x ${product.name} - R${itemTotal.toFixed(2)}\n`;
        }
    }
    
    return {
        items: orderItems || 'No items in cart',
        total: `R${total.toFixed(2)}`
    };
}

// Send email using EmailJS
function sendOrderEmail(formData, orderSummary) {
    // EmailJS template parameters
    const templateParams = {
        to_email: formData.email,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        order_type: formData.orderType,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        special_instructions: formData.specialInstructions || 'None',
        order_items: orderSummary.items,
        order_total: orderSummary.total
    };
    
    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_PUBLIC_KEY' with your actual EmailJS credentials
    emailjs.send('service_ylxq6gs', 'template_8dxz3xg', templateParams, 'WHM-Ym1km-l06e9pG')
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            alert('Order placed successfully! A confirmation email has been sent to ' + formData.email);
            // Reset form and cart if needed
            // document.querySelector('form').reset();
        }, function(error) {
            console.error('Email failed to send:', error);
            alert('Order received, but there was an issue sending the confirmation email. Please contact us to confirm your order.');
        });
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    let isValid = true;
    
    // Get form elements
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const orderType = document.getElementById('orderType');
    const pickupDate = document.getElementById('pickupDate');
    const pickupTime = document.getElementById('pickupTime');
    const specialInstructions = document.getElementById('specialInstructions');
    
    // Clear all previous errors
    [firstName, lastName, email, phone, orderType, pickupDate, pickupTime].forEach(removeError);
    
    // Validate First Name
    if (!validateName(firstName.value)) {
        showError(firstName, 'Please enter a valid first name');
        isValid = false;
    }
    
    // Validate Last Name
    if (!validateName(lastName.value)) {
        showError(lastName, 'Please enter a valid last name');
        isValid = false;
    }
    
    // Validate Email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Phone Number
    if (!validateSAPhoneNumber(phone.value)) {
        showError(phone, 'Please enter a valid South African phone number (e.g., 0821234567)');
        isValid = false;
    }
    
    // Validate Order Type
    if (!validateSelect(orderType.value)) {
        showError(orderType, 'Please select an order type');
        isValid = false;
    }
    
    // Validate Preferred Date
    if (!validateDate(pickupDate.value)) {
        showError(pickupDate, 'Please select a preferred date');
        isValid = false;
    }
    
    // Validate Preferred Time
    if (!validateTime(pickupTime.value)) {
        showError(pickupTime, 'Please select a preferred time');
        isValid = false;
    }
    
    // Check if cart has items
    if (typeof cart === 'undefined' || Object.keys(cart).length === 0) {
        alert('Please add items to your cart before placing an order.');
        isValid = false;
    }

    // If all validations pass, proceed with email
    if (isValid) {
        console.log('Form is valid! Processing order...');
        
        // Collect form data
        const formData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            orderType: orderType.value,
            preferredDate: pickupDate.value,
            preferredTime: pickupTime.value,
            specialInstructions: specialInstructions.value.trim()
        };
        
        // Generate order summary
        const orderSummary = generateOrderSummary();
        
        // Send email
        sendOrderEmail(formData, orderSummary);
    } else {
        console.log('Form validation failed');
    }
    
    return isValid;
}
    
// Enable submit button when user starts filling the form
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    // Enable button on any input change
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            submitBtn.disabled = false;
        });
    });
    
    // Add real-time validation feedback
    document.getElementById('firstName')?.addEventListener('blur', function() {
        if (this.value && !validateName(this.value)) {
            showError(this, 'Please enter a valid first name');
        } else {
            removeError(this);
        }
    });
    
    document.getElementById('lastName')?.addEventListener('blur', function() {
        if (this.value && !validateName(this.value)) {
            showError(this, 'Please enter a valid last name');
        } else {
            removeError(this);
        }
    });
    
    document.getElementById('email')?.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            removeError(this);
        }
    });
    
    document.getElementById('phone')?.addEventListener('blur', function() {
        if (this.value && !validateSAPhoneNumber(this.value)) {
            showError(this, 'Please enter a valid phone number');
        } else {
            removeError(this);
        }
    });
 
});