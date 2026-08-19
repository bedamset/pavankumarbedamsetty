'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling offset calculation for sticky navigation
    const topNav = document.querySelector('.top-nav');
    const navHeight = topNav ? topNav.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                const elementPosition = targetElem.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (navHeight + 20);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
