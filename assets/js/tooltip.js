// Tooltip functionality
// Simple Tooltip Solution
document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.getElementById('custom-tooltip');
    const containers = document.querySelectorAll('.tooltip-container');
    
    function showTooltip(event) {
        const sidebar = document.querySelector('aside');
        const sidebarWidth = sidebar.offsetWidth;
        
        // Check if sidebar is collapsed (width 96px or 6rem)
        if (sidebarWidth <= 100) {
            const title = event.currentTarget.querySelector('[data-title]')?.getAttribute('data-title');
            if (title) {
                tooltip.textContent = title;
                tooltip.style.left = (sidebarWidth + 10) + 'px';
                tooltip.style.top = (event.clientY - 20) + 'px';
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            }
        }
    }
    
    function hideTooltip() {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
    }
    
    containers.forEach(container => {
        container.addEventListener('mouseenter', showTooltip);
        container.addEventListener('mousemove', function(e) {
            if (tooltip.style.visibility === 'visible') {
                tooltip.style.top = (e.clientY - 20) + 'px';
            }
        });
        container.addEventListener('mouseleave', hideTooltip);
    });
});

/*Active Menu*/
document.addEventListener('alpine:init', () => {
    Alpine.store('global', {
        activeMenu: 'home',
        init() {
            const path = window.location.pathname;
            const segments = path.split('/').filter(item => item);
            this.activeMenu = segments.length > 0 ? segments[segments.length - 1].replace('.html', '') : 'home';
            console.log('Active Menu:', this.activeMenu);
        }
    });
});
