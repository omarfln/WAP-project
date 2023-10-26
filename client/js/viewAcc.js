document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token'); // Retrieve the token

    if (!token) {
      window.location.href = 'login.html'; 
    }
    
    // Get a reference to the <tbody> element where the account data will be displayed
    const accountTableBody = document.getElementById('accountTableBody');

    // Function to fetch account data from the server
    async function fetchAccountData() {
        try {
            const response = await fetch('http://localhost:4000/accounts/get-accounts');
            
            if (response.ok) {
                const data = await response.json();
                displayAccountData(data);
            } else {
                console.error('Failed to fetch account data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to display account data in the table
    function displayAccountData(accountData) {
        // Clear any existing rows in the table
        accountTableBody.innerHTML = '';

        // Iterate through the account data and create table rows
        accountData.forEach(account => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${account.id}</td>
                <td>${account.accountType}</td>
                <td>$${account.balance}</td>
                <td><a href="manage-account.html?id=${account.id}">Manage</a></td>
            `;
            accountTableBody.appendChild(row);
        });
    }

    // Fetch and display account data when the page loads
    fetchAccountData();
});
