function logoutUser() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token'); // Retrieve the token

    if (!token) {
      window.location.href = 'login.html'; 
    }
    
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser);
    }
});