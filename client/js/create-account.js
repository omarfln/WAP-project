document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token'); // Retrieve the token

    if (!token) {
      window.location.href = 'login.html'; 
    }

    const createAccountButton = document.getElementById('createAccountButton');

    createAccountButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const accountType = document.getElementById('accountType').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const ssn = document.getElementById('ssn').value;
        const balance = parseFloat(document.getElementById('initialDeposit').value);
        console.log(balance);

        const accountData = {
            accountType,
            firstName,
            lastName,
            ssn,
            balance,
        };

        try {
            let settings = {
                method: "POST",
                body: JSON.stringify(accountData),
                headers: { "Content-Type": 'application/json' }
            }
            const response = await fetch('http://localhost:4000/accounts/create-account', settings);

            if (response.ok) {
                alert('Account created successfully.');
                // You can add further actions here, such as redirecting the user.
            } else {
                alert('Failed to create an account.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});


