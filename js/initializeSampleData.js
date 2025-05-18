// Sample data initialization (for demo purposes)
function initializeSampleData() {
    if (
        appState.domains.length === 0 &&
        appState.mailboxes.length === 0
    ) {
        // Add sample domains
        const sampleDomains = [
            { name: "kerja.mail.co", type: "primary" },
            { name: "company.com", type: "secondary" },
        ];

        sampleDomains.forEach((domain) => {
            appState.addDomain(domain);
        });

        // Add sample mailboxes
        const sampleMailboxes = [
            {
                email: "admin@kerja.mail.co",
                displayName: "Administrator",
                quota: 50,
            },
            {
                email: "support@kerja.mail.co",
                displayName: "Support Team",
                quota: 25,
            },
            {
                email: "sales@company.com",
                displayName: "Sales Team",
                quota: 15,
            },
        ];

        sampleMailboxes.forEach((mailbox) => {
            mailbox.usedQuota = Math.floor(
                Math.random() * (mailbox.quota * 0.8)
            );
            appState.addMailbox(mailbox);
        });

        // Update dashboard with new data
        appState.updateDashboard();
        appState.renderDomains();
        appState.renderMailboxes();
    }
}

// Initialize sample data if none exists
setTimeout(() => {
    if (
        appState.domains.length === 0 &&
        appState.mailboxes.length === 0
    ) {
        const shouldInitialize = confirm(
            "No data found. Would you like to load some sample data to explore the dashboard?"
        );
        if (shouldInitialize) {
            initializeSampleData();
        }
    }
}, 1000);

observer.observe(document.getElementById("content"), {
    childList: true,
    subtree: true,
});