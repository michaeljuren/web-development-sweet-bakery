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