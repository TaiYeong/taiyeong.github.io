// Custom image lightbox - click image to view full screen, click again to close
// Detects AJAX navigation via pushState/popstate to re-attach on new pages
(function () {
    var overlay = document.createElement('div');
    overlay.id = 'custom-zoom-overlay';
    document.body.appendChild(overlay);

    var zoomedImg = document.createElement('img');
    zoomedImg.id = 'custom-zoom-img';
    overlay.appendChild(zoomedImg);

    function openZoom(src) {
        zoomedImg.src = src;
        overlay.classList.add('active');
    }

    function closeZoom() {
        overlay.classList.remove('active');
    }

    overlay.addEventListener('click', closeZoom);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeZoom();
    });

    // Attach zoom to a single image
    function attachZoom(img) {
        if (img.dataset.zoomAttached) return;
        img.dataset.zoomAttached = 'true';
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openZoom(this.src);
        });
    }

    // Scan and attach zoom to all content images
    function attachZoomToAll() {
        var images = document.querySelectorAll(
            '.book-body img, .markdown-section img, .page-inner img, article img, .post-content img, main img'
        );
        for (var i = 0; i < images.length; i++) {
            attachZoom(images[i]);
        }
    }

    // Initial attach
    attachZoomToAll();

    // Detect AJAX navigation: monkey-patch pushState
    var origPushState = history.pushState;
    history.pushState = function () {
        origPushState.apply(this, arguments);
        setTimeout(attachZoomToAll, 300);
        setTimeout(attachZoomToAll, 800);
        setTimeout(attachZoomToAll, 1500);
    };

    // Detect back/forward navigation
    window.addEventListener('popstate', function () {
        setTimeout(attachZoomToAll, 300);
        setTimeout(attachZoomToAll, 800);
        setTimeout(attachZoomToAll, 1500);
    });

    // Also use MutationObserver as backup
    var observer = new MutationObserver(function () {
        attachZoomToAll();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
