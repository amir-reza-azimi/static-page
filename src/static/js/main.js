function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formStatus = document.getElementById('formStatus');
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    formStatus.textContent = 'Message sent successfully!';
    formStatus.className = 'form-status success';
    form.reset();
    
    return false;
} 