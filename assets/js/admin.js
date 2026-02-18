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
        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        const textColor = isDark ? '#9CA3AF' : '#6B7280';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

        Chart.defaults.color = textColor;
        Chart.defaults.borderColor = gridColor;

        const revenueChartEl = document.getElementById('revenueChart');
        if (revenueChartEl) {
            window.revenueChart = new Chart(revenueChartEl, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue ($)',
                        data: [12000, 19000, 3000, 5000, 20000, 30000],
                        borderColor: '#10B8A6',
                        backgroundColor: 'rgba(16, 184, 166, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            grid: { color: gridColor },
                            ticks: { color: textColor }
                        },
                        x: {
                            grid: { color: gridColor },
                            ticks: { color: textColor }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: textColor } }
                    }
                }
            });
        }

        const bookingsChartEl = document.getElementById('bookingsChart');
        if (bookingsChartEl) {
            window.bookingsChart = new Chart(bookingsChartEl, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'Pending', 'Cancelled'],
                    datasets: [{
                        data: [300, 50, 100],
                        backgroundColor: ['#10B8A6', '#F97316', '#EF4444'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: textColor, padding: 20 }
                        }
                    }
                }
            });
        }

        // Listen for theme changes to update charts
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(() => {
                    const newIsDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
                    const newTextColor = newIsDark ? '#9CA3AF' : '#6B7280';
                    const newGridColor = newIsDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

                    [window.revenueChart, window.bookingsChart].forEach(chart => {
                        if (chart) {
                            if (chart.options.scales) {
                                Object.values(chart.options.scales).forEach(scale => {
                                    scale.grid.color = newGridColor;
                                    scale.ticks.color = newTextColor;
                                });
                            }
                            if (chart.options.plugins.legend) {
                                chart.options.plugins.legend.labels.color = newTextColor;
                            }
                            chart.update();
                        }
                    });
                }, 100);
            });
        });
    }
});
