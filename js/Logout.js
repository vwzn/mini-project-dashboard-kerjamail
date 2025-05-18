
document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {
        if (confirm("Are you sure you want to logout?")) {
            // In a real app, you'd handle logout logic here
            alert(
                "Logout successful! Redirecting to login page..."
            );
            window.location.href = '/login.html';
        }
    });