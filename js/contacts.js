// Contacts page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Only run this code on the contacts page
    if (window.location.pathname.includes('contacts.html')) {
        // Load contacts content from JSON
        fetch('data/contacts.json')
            .then(response => response.json())
            .then(data => {
                const contactInfo = document.querySelector('.contact-info');
                if (contactInfo) {
                    contactInfo.innerHTML = `
                        <h3 class="contact-info-title">${data.contactInfo.title}</h3>
                        <div class="contact-info-item">
                            <div class="contact-info-icon">📍</div>
                            <div>
                                <strong>Address:</strong><br>
                                ${data.contactInfo.address}
                            </div>
                        </div>
                        <div class="contact-info-item">
                            <div class="contact-info-icon">📞</div>
                            <div>
                                <strong>Phone:</strong><br>
                                ${data.contactInfo.phone}
                            </div>
                        </div>
                        <div class="contact-info-item">
                            <div class="contact-info-icon">✉️</div>
                            <div>
                                <strong>Email:</strong><br>
                                ${data.contactInfo.email}
                            </div>
                        </div>
                    `;
                }
                
                // Update page title and meta description
                document.title = data.pageTitle;
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) {
                    metaDescription.setAttribute('content', data.pageDescription);
                }
                
                // Handle contact form submission
                const contactForm = document.getElementById('contact-form');
                if (contactForm) {
                    contactForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        
                        // Get form values
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const message = document.getElementById('message').value;
                        
                        // Simple validation
                        if (name && email && message) {
                            // In a real application, you would send this data to a server
                            alert('Thank you for your message! We will get back to you soon.');
                            contactForm.reset();
                        } else {
                            alert('Please fill in all fields.');
                        }
                    });
                }
            })
            .catch(error => console.error('Error loading contacts data:', error));
    }
});