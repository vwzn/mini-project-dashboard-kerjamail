class AppState {
    constructor() {
        this.domains = StorageManager.getItem("domains") || [];
        this.mailboxes = StorageManager.getItem("mailboxes") || [];
        this.activities =
            StorageManager.getItem("activities") || [];
        this.currentUser =
            StorageManager.getItem("currentUser") || ""; 
    }

    saveDomains() {
        StorageManager.setItem("domains", this.domains);
        this.updateDashboard();
    }

    saveMailboxes() {
        StorageManager.setItem("mailboxes", this.mailboxes);
        this.updateDashboard();
    }

    saveActivities() {
        StorageManager.setItem("activities", this.activities);
    }

    addDomain(domain) {
        domain.id = Date.now().toString();
        domain.status = "Active";
        domain.createdAt = new Date().toLocaleDateString();
        this.domains.push(domain);
        this.saveDomains();
        this.addActivity(
            `Domain ${domain.name} added successfully`
        );
    }

    addMailbox(mailbox) {
        mailbox.id = Date.now().toString();
        mailbox.status = "Active";
        mailbox.createdAt = new Date().toLocaleDateString();
        mailbox.usedQuota = 0;
        this.mailboxes.push(mailbox);
        this.saveMailboxes();
        this.addActivity(
            `Mailbox ${mailbox.email} created successfully`
        );
    }

    deleteDomain(id) {
        this.domains = this.domains.filter(
            (domain) => domain.id !== id
        );
        this.saveDomains();
        this.addActivity("Domain deleted");
    }

    deleteMailbox(id) {
        this.mailboxes = this.mailboxes.filter(
            (mailbox) => mailbox.id !== id
        );
        this.saveMailboxes();
        this.addActivity("Mailbox deleted");
    }

    addActivity(message) {
        const activity = {
            id: Date.now().toString(),
            message,
            timestamp: new Date().toLocaleString(),
        };
        this.activities.unshift(activity);
        if (this.activities.length > 10) {
            this.activities = this.activities.slice(0, 10);
        }
        this.saveActivities();
        this.renderActivities();
    }

    updateDashboard() {
        document.getElementById("totalDomains").textContent =
            this.domains.length;
        document.getElementById("totalMailboxes").textContent =
            this.mailboxes.length;

        const totalStorage = this.mailboxes.reduce(
            (sum, mailbox) => sum + mailbox.usedQuota,
            0
        );
        document.getElementById(
            "storageUsed"
        ).textContent = `${totalStorage.toFixed(1)} GB`;
    }

    renderActivities() {
        const container = document.getElementById("recentActivity");
        container.innerHTML =
            this.activities.length > 0
                ? this.activities
                    .map(
                        (activity) => `
                        <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <div class="flex-1">
                                <p class="text-sm">${activity.message}</p>
                                <p class="text-xs text-gray-500">${activity.timestamp}</p>
                            </div>
                        </div>
                    `
                    )
                    .join("")
                : '<p class="text-gray-500 text-center py-4">No recent activities</p>';
    }

    renderDomains() {
        const container = document.getElementById("domainsList");
        container.innerHTML =
            this.domains.length > 0
                ? this.domains
                    .map(
                        (domain) => `
                        <div class="card-3d bg-white p-6 rounded-lg shadow-lg">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold">${domain.name}</h3>
                                    <p class="text-sm text-gray-600">Type: ${domain.type}</p>
                                    <p class="text-sm text-gray-600">Status: <span class="text-green-600">${domain.status}</span></p>
                                    <p class="text-sm text-gray-600">Created: ${domain.createdAt}</p>
                                </div>
                                <div class="flex space-x-2">
                                    <button onclick="editDomain('${domain.id}')" class="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition-all">
                                        Edit
                                    </button>
                                    <button onclick="deleteDomain('${domain.id}')" class="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition-all">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    `
                    )
                    .join("")
                : '<div class="text-center py-8 text-gray-500">No domains configured yet. Add your first domain to get started.</div>';
    }

    renderMailboxes() {
        const container = document.getElementById("mailboxesList");
        container.innerHTML =
            this.mailboxes.length > 0
                ? this.mailboxes
                    .map(
                        (mailbox) => `
                        <div class="card-3d bg-white p-6 rounded-lg shadow-lg">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold">${mailbox.email}</h3>
                                    <p class="text-sm text-gray-600">Display Name: ${mailbox.displayName}</p>
                                    <p class="text-sm text-gray-600">Quota: ${mailbox.usedQuota}/${mailbox.quota} GB</p>
                                    <p class="text-sm text-gray-600">Status: <span class="text-green-600">${mailbox.status}</span></p>
                                    <p class="text-sm text-gray-600">Created: ${mailbox.createdAt}</p>
                                </div>
                                <div class="flex space-x-2">
                                    <button onclick="editMailbox('${mailbox.id}')" class="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition-all">
                                        Edit
                                    </button>
                                    <button onclick="deleteMailbox('${mailbox.id}')" class="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition-all">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    `
                    )
                    .join("")
                : '<div class="text-center py-8 text-gray-500">No mailboxes created yet. Create your first mailbox to get started.</div>';
    }
}

// Initialize Application
const appState = new AppState();