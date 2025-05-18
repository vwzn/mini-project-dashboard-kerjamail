// Domain actions
function editDomain(id) {
    const domain = appState.domains.find((d) => d.id === id);
    if (domain) {
        // In a real app, you'd populate a modal with the domain data
        alert(`Edit domain: ${domain.name} (Feature coming soon)`);
    }
}

function deleteDomain(id) {
    if (confirm("Are you sure you want to delete this domain?")) {
        appState.deleteDomain(id);
        appState.renderDomains();
    }
}

// Mailbox actions
function editMailbox(id) {
    const mailbox = appState.mailboxes.find((m) => m.id === id);
    if (mailbox) {
        // In a real app, you'd populate a modal with the mailbox data
        alert(
            `Edit mailbox: ${mailbox.email} (Feature coming soon)`
        );
    }
}

function deleteMailbox(id) {
    if (confirm("Are you sure you want to delete this mailbox?")) {
        appState.deleteMailbox(id);
        appState.renderMailboxes();
    }
}