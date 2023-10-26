document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form.form');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.querySelector('input[placeholder="Username"]').value;
      const password = document.querySelector('input[placeholder="Password"]').value;
  
      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
  
          // Store the token in sessionStorage
          sessionStorage.setItem('token', token);
          window.location.href = 'bank.html'; // Redirect to the main bank page
        } else {
          // Failed login
          alert('Invalid username or password');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  });
  