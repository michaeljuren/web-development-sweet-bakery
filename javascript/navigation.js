// Navigate between pages and show user which page they are on using CSS

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Map hash links to actual page URLs
    const pageMap = {
        '#cakes'   : 'cake-page.html',
        '#pastries': 'pastry-page.html',
        '#visit'   : 'visit-us-page.html',
        '#order'   : 'order-page.html'
    };
    
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Highlight current page in navigation
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if this link corresponds to the current page
        if (pageMap[href] === currentPage) {
            link.classList.add('active');
        }
        
        // Add click event listener
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Navigate to the corresponding page
            if (pageMap[href]) {
                window.location.href = pageMap[href];
            }
        });
    });
});