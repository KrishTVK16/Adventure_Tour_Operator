/**
 * Admin Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

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
