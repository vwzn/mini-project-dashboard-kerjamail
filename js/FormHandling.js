
document
    .getElementById("domainForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const domain = {
            name: document.getElementById("domainName").value,
            type: document.getElementById("domainType").value,
        };

        if (domain.name) {
            appState.addDomain(domain);
            e.target.reset();
            hideModal("domainModal");
            appState.renderDomains();
        }
    });

document
    .getElementById("mailboxForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const mailbox = {
            email: document.getElementById("mailboxEmail").value,
            displayName:
                document.getElementById("mailboxDisplayName").value,
            quota: parseInt(
                document.getElementById("mailboxQuota").value
            ),
        };

        if (mailbox.email && mailbox.displayName && mailbox.quota) {
            appState.addMailbox(mailbox);
            e.target.reset();
            hideModal("mailboxModal");
            appState.renderMailboxes();
        }
    });