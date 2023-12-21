document.querySelector('#login-btn').addEventListener('click', function submitForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log('user,pass'+username,password); 

    fetch('http://203.159.93.114:8038/userserviceswithjwt/log-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(response => response.json())
        .then(data => {
            console.log('data'+data);
            if (data.success) {
                // Redirect to the home page after successful login
                window.location.replace('/')
            }
        })
        .catch(error => console.error('Error:', error));
})
