// Email service for Enquiry confirmation
       
    emailjs.init('WHM-Ym1km-l06e9pG');

    const form = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const enquiry = document.getElementById('enquiry').value;

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