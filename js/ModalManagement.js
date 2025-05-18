
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

// Close modals when clicking outside
document.addEventListener("click", function (e) {
    if (
        e.target.classList.contains("fixed") &&
        e.target.classList.contains("inset-0")
    ) {
        const modals = ["domainModal", "mailboxModal"];
        modals.forEach((modalId) => {
            const modal = document.getElementById(modalId);
            if (!modal.classList.contains("hidden")) {
                hideModal(modalId);
            }
        });
    }
});