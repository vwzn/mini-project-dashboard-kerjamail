
document.addEventListener("DOMContentLoaded", function () {
    // Set welcome message
    document.getElementById(
        "welcomeUser"
    ).textContent = ` ${appState.currentUser}`;
    document
        .getElementById("welcomeUser")
        .classList.remove("hidden");

    // Initialize dashboard
    appState.updateDashboard();
    appState.renderActivities();
    appState.renderDomains();
    appState.renderMailboxes();

    // Navigation event listeners
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const section = this.getAttribute("data-section");
            showSection(section);

            // Update active nav link
            document
                .querySelectorAll(".nav-link")
                .forEach((l) =>
                    l.classList.remove(
                        "bg-blue-100",
                        "text-blue-700"
                    )
                );
            this.classList.add("bg-blue-100", "text-blue-700");
        });
    });

    // Set dashboard as default active
    document
        .querySelector('.nav-link[data-section="dashboard"]')
        .classList.add("bg-blue-100", "text-blue-700");
});