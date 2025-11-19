// Enquiry validation and Email service for Enquiry confirmation
       
emailjs.init('WHM-Ym1km-l06e9pG');

        const form = document.getElementById('enquiryForm');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        // Validation functions
        function validateName(name) {
            // Check if name is not empty and contains only letters and spaces
            const nameRegex = /^[a-zA-Z\s]+$/;
            return name.trim() !== '' && nameRegex.test(name.trim());
        }

        function validateEmail(email) {
            // Standard email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return email.trim() !== '' && emailRegex.test(email.trim());
        }

        function validateEnquiry(enquiry) {
            return enquiry.trim() !== '';
        }

        function showError(fieldId, errorId) {
            document.getElementById(fieldId).classList.add('error');
            document.getElementById(errorId).classList.add('show');
        }

        function hideError(fieldId, errorId) {
            document.getElementById(fieldId).classList.remove('error');
            document.getElementById(errorId).classList.remove('show');
        }

        // Real-time validation on blur
        document.getElementById('name').addEventListener('blur', function() {
            if (!validateName(this.value)) {
                showError('name', 'nameError');
            } else {
                hideError('name', 'nameError');
            }
        });

        document.getElementById('email').addEventListener('blur', function() {
            if (!validateEmail(this.value)) {
                showError('email', 'emailError');
            } else {
                hideError('email', 'emailError');
            }
        });

        document.getElementById('enquiry').addEventListener('blur', function() {
            if (!validateEnquiry(this.value)) {
                showError('enquiry', 'enquiryError');
            } else {
                hideError('enquiry', 'enquiryError');
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const enquiry = document.getElementById('enquiry').value;

            // Validate all fields
            let isValid = true;

            if (!validateName(name)) {
                showError('name', 'nameError');
                isValid = false;
            } else {
                hideError('name', 'nameError');
            }

            if (!validateEmail(email)) {
                showError('email', 'emailError');
                isValid = false;
            } else {
                hideError('email', 'emailError');
            }

            if (!validateEnquiry(enquiry)) {
                showError('enquiry', 'enquiryError');
                isValid = false;
            } else {
                hideError('enquiry', 'enquiryError');
            }

            // Stop if validation fails
            if (!isValid) {
                return;
            }

            // Disable submit button
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Hide previous messages
            successMessage.classList.remove('show');
            errorMessage.classList.remove('show');

            // EmailJS parameters
            const templateParams = {
                name: name,
                email: email,
                enquiry: enquiry
            };

            // Send email using EmailJS
            emailjs.send('service_ylxq6gs', 'template_tkadqn8', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    successMessage.classList.add('show');
                    
                    // Reset form
                    form.reset();
                    
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Enquiry';
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    errorMessage.classList.add('show');
                    
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Enquiry';
                    
                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        errorMessage.classList.remove('show');
                    }, 5000);
                });
        });