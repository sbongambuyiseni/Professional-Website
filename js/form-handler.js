// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    // Verify EmailJS is initialized
    if (!window.emailjs) {
        console.error('EmailJS not loaded');
        alert('Email service not initialized. Please try again later.');
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        return;
    }

    // Send email using EmailJS
    const templateParams = {
        from_name: name,
        to_name: "Recipient Name", // Replace with the actual recipient name or get it from an input
        from_email: email,
        message: message,
    };

    // Go to https://dashboard.emailjs.com/admin
    // Look for "Email Services" to get YOUR_SERVICE_ID
    // Look for "Email Templates" to get YOUR_TEMPLATE_ID
    emailjs.send(
        "service_6itmqwf",     // Your Service ID
        "template_dzd95iw",    // Your Template ID
        templateParams
    ).then(
        function(response) {
            console.log("SUCCESS", response);
            alert("Message sent successfully!");
            document.getElementById('contact-form').reset();
        },
        function(error) {
            console.error("FAILED", error);
            alert("Failed to send message: " + error.text);
        }
    ).finally(() => {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    });
}); 