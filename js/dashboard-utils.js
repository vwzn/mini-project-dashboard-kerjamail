
// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
    // Escape to close modals
    if (e.key === "Escape") {
        const modals = ["domainModal", "mailboxModal"];
        modals.forEach((modalId) => {
            const modal = document.getElementById(modalId);
            if (!modal.classList.contains("hidden")) {
                hideModal(modalId);
            }
        });
    }
});

// Auto-save functionality for settings
const settingsForm = document.querySelector(
    "#settings-content form"
);
if (settingsForm) {
    settingsForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const settings = Object.fromEntries(formData);
        StorageManager.setItem("settings", settings);
        appState.addActivity("Settings updated successfully");

        // Show success message
        const button = e.target.querySelector(
            'button[type="submit"]'
        );
        const originalText = button.textContent;
        button.textContent = "Saved!";
        button.classList.remove("bg-blue-600", "hover:bg-blue-700");
        button.classList.add("bg-green-600", "hover:bg-green-700");

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove(
                "bg-green-600",
                "hover:bg-green-700"
            );
            button.classList.add(
                "bg-blue-600",
                "hover:bg-blue-700"
            );
        }, 2000);
    });
}

// Performance monitoring
window.addEventListener("load", function () {
    const loadTime = performance.now();
    console.log(`Dashboard loaded in ${loadTime.toFixed(2)}ms`);

    // Log to activity feed
    setTimeout(() => {
        appState.addActivity(
            `Dashboard loaded successfully in ${loadTime.toFixed(
                0
            )}ms`
        );
    }, 500);
});