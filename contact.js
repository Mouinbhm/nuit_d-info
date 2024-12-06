document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        if (name === "" || email === "" || message === "") {
            alert("Tous les champs sont obligatoires.");
            return;
        }
        responseMessage.style.display = "block"; 
        responseMessage.textContent = `Merci, ${name} ! Votre message a bien été envoyé.`;
        form.reset();
    });
});
