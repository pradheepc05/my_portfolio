// your code goes here
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // prevent normal form submission

        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                status.innerHTML = "<p style='color:green;'>Thanks! Your message has been sent.</p>";
                form.reset();
            } else {
                response.json().then(data => {
                    if (data.errors) {
                        status.innerHTML = `<p style='color:red;'>${data.errors.map(error => error.message).join(", ")}</p>`;
                    } else {
                        status.innerHTML = "<p style='color:red;'>Oops! There was a problem submitting your form.</p>";
                    }
                });
            }
        })
        .catch(() => {
            status.innerHTML = "<p style='color:red;'>Oops! There was a problem submitting your form.</p>";
        });
    });
});