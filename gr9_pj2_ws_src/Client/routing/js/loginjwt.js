document.querySelector('#login-btn').addEventListener('click', function () {
  let username = document.getElementById('username').value;
  let passwd = document.getElementById('password').value;

  console.log(username,passwd);


  if (!username || !password) {
    console.log("Username or password is required");
  }

  let apiUrl = 'http://203.159.93.114:8038/userserviceswithjwt/login';

  fetch(apiUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      username: username,
      password: passwd
    }),
  })
  .then(response => {
    if (!username && !passwd) {
      alert("Please enter Username and Password");
      throw new Error('Login failed');
    }
    else if (!username) {
      alert("Please enter Username");
      throw new Error('Login failed');
    }
    else if (!passwd) {
      alert("Please enter Password");
      throw new Error('Login failed');
    }
    else if (!response.ok) {
      alert("Wrong usernamr or password!");
      throw new Error('Login failed');
    }
    else {
      return response.json();
    }
    // if (!response.ok) {
    //   alert("Wrong usernamr or password!");
    //   throw new Error('Login failed');
    // }
    // return response.json();
  })
  .then(data => {
    const token = data.token;
    console.log(data.data);
    console.log("Login successful, token:", token);
    window.location.href = '/home';
  })
  .catch(error => console.error("Error:", error));
});
