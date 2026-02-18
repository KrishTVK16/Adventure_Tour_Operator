/**
 * Admin Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // Sidebar Toggle Logic
    const sidebar = document.querySelector('.sidebar');
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebarCloseToggle = document.getElementById('sidebar-close-toggle');

    // Open Sidebar
    if (mobileSidebarToggle && sidebar) {
        mobileSidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('show');
        });
    }

    // Close Sidebar
    if (sidebarCloseToggle && sidebar) {
        sidebarCloseToggle.addEventListener('click', () => {
            sidebar.classList.remove('show');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1200 && sidebar.classList.contains('show')) {
            if (!sidebar.contains(e.target) && !mobileSidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });

    // Initialize Charts if present (using Chart.js)
    if (typeof Chart !== 'undefined') {
        const revenueChartEl = document.getElementById('revenueChart');
        if (revenueChartEl) {
            new Chart(revenueChartEl, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue ($)',
                        data: [12000, 19000, 3000, 5000, 20000, 30000],
                        borderColor: '#064E3B',
                        backgroundColor: 'rgba(6, 78, 59, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        const bookingsChartEl = document.getElementById('bookingsChart');
        if (bookingsChartEl) {
            new Chart(bookingsChartEl, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'Pending', 'Cancelled'],
                    datasets: [{
                        data: [300, 50, 100],
                        backgroundColor: ['#14B8A6', '#F97316', '#EF4444']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }
});
