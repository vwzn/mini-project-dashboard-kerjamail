
document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('sidebar-open');
    });

    // Tutup sidebar ketika mengklik di luar area sidebar di mobile
    document.addEventListener('click', function (event) {
        if (window.innerWidth < 768 &&
            !sidebar.contains(event.target) &&
            event.target !== sidebarToggle) {
            sidebar.classList.remove('sidebar-open');
        }
    });
});

const sidebarOverlay = document.getElementById('sidebarOverlay');

sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('sidebar-open');
    sidebarOverlay.classList.toggle('hidden');
});

sidebarOverlay.addEventListener('click', function() {
    sidebar.classList.remove('sidebar-open');
    sidebarOverlay.classList.add('hidden');
});