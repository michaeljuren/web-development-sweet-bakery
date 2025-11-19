// Simple lightbox gallery to enlarge images when users clicks on an image

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    location.reload(); // Refresh the page
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        location.reload(); // Refresh on Escape key
    }
});