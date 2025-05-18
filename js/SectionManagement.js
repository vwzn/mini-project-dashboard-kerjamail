
function showSection(sectionName) {
    // Hide all sections
    document
        .querySelectorAll(".section-content")
        .forEach((section) => {
            section.classList.add("hidden");
        });

    // Show selected section
    const targetSection = document.getElementById(
        `${sectionName}-content`
    );
    if (targetSection) {
        targetSection.classList.remove("hidden");
        targetSection.classList.add("content-fade");

        // Re-render content for specific sections
        if (sectionName === "domains") {
            appState.renderDomains();
        } else if (sectionName === "mailboxes") {
            appState.renderMailboxes();
        }
    }
}