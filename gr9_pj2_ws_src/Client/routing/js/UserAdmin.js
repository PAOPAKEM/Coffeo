document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch user data
    function fetchUserData() {
        fetch('http://203.159.93.114:8038/userservices/users')
            .then(response => response.json())
            .then(data => updateTable(data))
            .catch(error => console.error('Error:', error));
    }

    // Function to update the table with user data
    function updateTable(users) {
        const tableBody = document.querySelector('.container-table tbody');
        tableBody.innerHTML = ''; // Clear existing table data
        console.log(users);
        console.log(typeof users);
        users.data.forEach((user, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
              <td>${user.ID}</td>
              <td>${user.fname + " " + user.lname}</td>
              <td>${user.username}</td>
              <td>
                  <a href="/update-user"><button title="Update">Update</button></a>
                  <button title="Delete" type="submit" id="delete">Delete</button>
              </td>
          `;

            tableBody.appendChild(row);
        });
    }

    function handleDelete(userId) {
        fetch('http://203.159.93.114:8038/userservices/user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ID: userId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error:', data.message);
                } else {
                    console.log('User deleted:', data);
                    fetchUserData(); // Refresh the table
                }
            })
            .catch(error => console.error('Error:', error));
    }
    document.addEventListener('click', function (event) {
        if (event.target.title === 'Delete') {
            const row = event.target.closest('tr');
            const userId = row.firstElementChild.textContent; // Assuming the first cell contains the user ID
            handleDelete(userId);
        }
    });
    // Fetch user data when the DOM is fully loaded
    fetchUserData();
});
