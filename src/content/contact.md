# Contact Me

I'd love to hear from you! Fill out the form below to get in touch.

<div class="contact-form">
    <form id="contactForm" onsubmit="return handleSubmit(event)">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        
        <div class="form-group">
            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required>
        </div>
        
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        
        <button type="submit" class="submit-btn">Send Message</button>
    </form>
    <div id="formStatus" class="form-status"></div>
</div> 