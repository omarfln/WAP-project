function getAccountIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}


document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token'); // Retrieve the token

    if (!token) {
      window.location.href = 'login.html'; 
    }
    
    
    const payButton = document.getElementById('payButton');

    payButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const accountId = getAccountIdFromURL();


        const amount = parseFloat(document.getElementById('payAmount').value);

        try {
            const response = await fetch(`http://localhost:4000/accounts/pay-account/${accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            if (response.ok) {
                alert('Payment successful');
            } else {
                const data = await response.json();
                alert(data.message);            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    const withdrawButton = document.getElementById('withdrawButton');

    withdrawButton.addEventListener('click', async (event) => {
        event.preventDefault();

        // Get the account ID from the URL
        const accountId = getAccountIdFromURL();

        const amount = parseFloat(document.getElementById('withdrawAmount').value);

        try {
            const response = await fetch(`http://localhost:4000/accounts/withdraw-account/${accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            if (response.ok) {
                alert('Withdrawal successful');
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });


    const changeAccountTypeButton = document.getElementById('changeAccountTypeButton');

    changeAccountTypeButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const accountId = getAccountIdFromURL();
        const newAccountType = document.getElementById('changeAccountType').value;

        try {
            const response = await fetch(`http://localhost:4000/accounts/edit-account-type/${accountId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newAccountType }),
            });

            if (response.ok) {
                alert('Account type changed successfully');
            } else {
                alert('Failed to change account type');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });


    const deleteAccountButton = document.getElementById('deleteAccountButton');

    deleteAccountButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const accountId = getAccountIdFromURL();

        if (confirm('Are you sure you want to delete this account?')) {
            try {
                const response = await fetch(`http://localhost:4000/accounts/delete-account/${accountId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Account deleted successfully');
                    window.location.href = '../show-accounts.html';
                }else {
                    alert('Failed to delete the account');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });


    
});
