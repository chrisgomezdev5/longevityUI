//Fixed Navbar on Scroll
window.addEventListener('scroll', function () {
    if (window.scrollY >= 500) {
        document.getElementById('nav').classList.remove('home');
    }
    else {
        document.getElementById('nav').classList.add('home');
    }
});


// Video Looping Logic
document.addEventListener('DOMContentLoaded', function () {

    const video = document.getElementById("loopingVideo");
    let current = 0;

    function playNextVideo() {
        if ($(window).width() < 768) {
            video.src = videoMobileFiles[current];
            video.currentTime = 0;
            video.play();
            current = (current + 1) % videoMobileFiles.length;
        }
        else {
            video.src = videoFiles[current];
            video.currentTime = 0;
            video.play();
            current = (current + 1) % videoFiles.length;
        }

    }

    // Handle video ending - play next video or loop if only one
    video.addEventListener("ended", () => {
        if ($(window).width() < 768) {
            if (videoMobileFiles.length === 1) {
                // If only one video, just loop it
                video.currentTime = 0;
                video.play();
            } else {
                // Multiple videos - play the next one
                playNextVideo();
            }
        }
        else {
            if (videoFiles.length === 1) {
                // If only one video, just loop it
                video.currentTime = 0;
                video.play();
            } else {
                // Multiple videos - play the next one
                playNextVideo();
            }
        }

    });

    // Start the loop
    playNextVideo();



});


// Transition Copy Component GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate #svg3 independently
gsap.from("#svg3", {
    x: -100,
    y: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    visibility: "visible",
    scrollTrigger: {
        trigger: "#component2",
        start: "top 40%",
        toggleActions: "play none none none"
    }
});

// Timeline for #svg4 and #intro-copy1
let tlSvg4Intro = gsap.timeline({
    scrollTrigger: {
        trigger: "#component2",
        start: "top 40%",
        toggleActions: "play none none none"
    }
});
tlSvg4Intro.from("#svg4", {
    x: 300,
    y: 300,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    visibility: "visible"
})
    .from("#intro-copy1", {
        y: 50,
        opacity: 0,
        duration: .5,
        ease: "power2.out",
        visibility: "visible"
    })
    .from("#intro-copy2", {
        y: 50,
        opacity: 0,
        duration: .7,
        ease: "power2.out",
        visibility: "visible"
    });

// Timeline for Flipping Cards Animation
let tlCards = gsap.timeline({
    scrollTrigger: {
        trigger: ".component-flipping-cards",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});
gsap.from("#card1", {
    x: -300,
    y: -600,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    visibility: "visible",
    scrollTrigger: {
        trigger: ".component-flipping-cards",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});
gsap.from("#card2", {
    x: -200,
    y: -900,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    visibility: "visible",
    scrollTrigger: {
        trigger: ".component-flipping-cards",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});
gsap.from("#card3", {
    x: -100,
    y: -1300,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    visibility: "visible",
    scrollTrigger: {
        trigger: ".component-flipping-cards",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});
gsap.from("#card4", {
    x: 100,
    y: -600,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    visibility: "visible",
    scrollTrigger: {
        trigger: ".component-flipping-cards",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});
gsap.from("#card5", {
    x: 200,
    y: -400,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    visibility: "visible",
    scrollTrigger: {
        trigger: ".component-flipping-cards",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Flipping Cards slider logic with mobile support
(function () {
    const container = document.querySelector('.cards-container');

    if (!container) return; // Exit if container not found
    const cards = Array.from(container.querySelectorAll('.flip-card'));
    let startIdx = 0;

    function getMaxVisible() {
        return window.innerWidth <= 600 ? 1 : 5;
    }

    function updateVisibleCards() {
        const maxVisible = getMaxVisible();
        cards.forEach((card, i) => {
            if (i >= startIdx && i < startIdx + maxVisible) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function nextCard() {
        const maxVisible = getMaxVisible();
        if (startIdx + maxVisible < cards.length) {
            startIdx++;
            updateVisibleCards();
            updateButtonVisibility();
        }
    }

    function prevCard() {
        if (startIdx > 0) {
            startIdx--;
            updateVisibleCards();
            updateButtonVisibility();
        }
    }

    function updateButtonVisibility() {
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const maxVisible = getMaxVisible();

        if (prevButton) {
            if (startIdx === 0) {
                prevButton.classList.add('hide');
            } else {
                prevButton.classList.remove('hide');
            }
        }

        if (nextButton) {
            if (startIdx + maxVisible >= cards.length) {
                nextButton.classList.add('hide');
            } else {
                nextButton.classList.remove('hide');
            }
        }
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    container.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Mouse drag/swipe support for desktop
    let mouseStartX = 0;
    let mouseEndX = 0;
    let isDragging = false;

    container.addEventListener('mousedown', function (e) {
        mouseStartX = e.clientX;
        isDragging = true;
        container.style.cursor = 'grabbing';
        e.preventDefault(); // Prevent text selection
    });

    container.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        e.preventDefault();
    });

    container.addEventListener('mouseup', function (e) {
        if (!isDragging) return;
        mouseEndX = e.clientX;
        isDragging = false;
        container.style.cursor = 'grab';
        handleMouseSwipe();
    });

    container.addEventListener('mouseleave', function (e) {
        if (!isDragging) return;
        mouseEndX = e.clientX;
        isDragging = false;
        container.style.cursor = 'grab';
        handleMouseSwipe();
    });

    // Set initial cursor style
    container.style.cursor = 'grab';

    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swiped left - show next card
                nextCard();
            } else {
                // Swiped right - show previous card
                prevCard();
            }
        }
    }

    function handleMouseSwipe() {
        const swipeDistance = mouseStartX - mouseEndX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Dragged left - show next card
                nextCard();
            } else {
                // Dragged right - show previous card
                prevCard();
            }
        }
    }

    document.querySelector('.next-button').addEventListener('click', nextCard);
    document.querySelector('.prev-button').addEventListener('click', prevCard);

    // Update on resize
    window.addEventListener('resize', function () {
        // Clamp startIdx if needed
        const maxVisible = getMaxVisible();
        if (startIdx + maxVisible > cards.length) {
            startIdx = Math.max(0, cards.length - maxVisible);
        }
        updateVisibleCards();
        updateButtonVisibility();
    });

    // Initialize
    updateVisibleCards();
    updateButtonVisibility();
})();


// Modal logic for Plan Your Visit Form
function showPlanModal() {
    document.getElementById('planModalOverlay').style.display = 'flex';
}
function hidePlanModal() {
    document.getElementById('planModalOverlay').style.display = 'none';
}
// Attach to all .plan-your-visit elements
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.plan-your-visit').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            showPlanModal();
        });
    });
    document.getElementById('closePlanModal').addEventListener('click', hidePlanModal);
    document.getElementById('planModalOverlay').addEventListener('click', function (e) {
        if (e.target === this) hidePlanModal();
    });
});

// Animate arrows on SVG hover using GSAP
document.addEventListener('DOMContentLoaded', function () {
    const svg = document.getElementById('svg-chart');
    const acceleratedLabel = document.getElementById('svg-chart-accelerated');
    const acceleratedDesc = document.getElementById('svg-chart-accelerated-desc');
    const acceleratedArrow = document.getElementById('svg-chart-accelerated-arrow');
    const normalLabel = document.getElementById('svg-chart-normal');
    const normalDesc = document.getElementById('svg-chart-normal-desc');
    const normalArrow = document.getElementById('svg-chart-normal-arrow');
    const superLabel = document.getElementById('svg-chart-super');
    const superDesc = document.getElementById('svg-chart-super-desc');
    const superArrow = document.getElementById('svg-chart-super-arrow');
    //var secondBackground = document.getElementById('svg-chart-second-background');

    // Set initial scale to 0
    gsap.set([acceleratedArrow, normalArrow, superArrow], { transformOrigin: '50% 50%', scale: 0 });

    // Animation function to be reused
    function animateChart() {
        gsap.timeline()
            .to(normalArrow, { scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, "+=0.05")
            .to(normalLabel, { opacity: 1, duration: 0.8, ease: 'back.out(1.7)' })
            .to(normalDesc, { opacity: 1, duration: 0.8, ease: 'back.out(1.7)' })
            .to(acceleratedArrow, { scale: 1, duration: 0.8, ease: 'back.out(1.7)' })
            .to(acceleratedLabel, { opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
            .to(acceleratedDesc, { opacity: 1, duration: 0.8, ease: 'back.out(1.7)' })
            .to(normalArrow, { opacity: .3, duration: 0.3, ease: 'back.out(1.7)' }, "+=0.05")
            .to(normalLabel, { opacity: .3, duration: 0.3, ease: 'back.out(1.7)' })
            .to(normalDesc, { opacity: .3, duration: 0.3, ease: 'back.out(1.7)' })
            .to(superArrow, { scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, "+=0.05")
            .to(superLabel, { opacity: 1, duration: 0.8, ease: 'back.out(1.7)' })
            .to(superDesc, { opacity: 1, duration: 0.8, ease: 'back.out(1.7)' })
            .to(acceleratedArrow, { opacity: .3, duration: 0.3, ease: 'back.out(1.7)' })
            .to(acceleratedLabel, { opacity: .3, duration: 0.3, ease: 'back.out(1.7)' })
            .to(acceleratedDesc, { opacity: .3, duration: 0.3, ease: 'back.out(1.7)' });
    }

    // Hover animation
    svg.addEventListener('mouseenter', animateChart);

    // Scroll animation for all devices
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: svg,
            start: 'top 80%',
            once: true,
            onEnter: animateChart
        });
    }

    svg.addEventListener('mouseleave', function () {
        //gsap.to([first, second, third], {scale: 0, duration: 0.3, stagger: 0.05, ease: 'power1.in'});
    });
});


// Modal logic for Movie Player
function showMovieModal() {
    var overlay = document.getElementById('movieModalOverlay');
    //var player = document.getElementById('modalMoviePlayer');
    //player.pause();
    //player.querySelector('source').src = src;
    //player.load();
    overlay.style.display = 'flex';
}
function hideMovieModal() {
    var overlay = document.getElementById('movieModalOverlay');
    //var player = document.getElementById('modalMoviePlayer');
    //player.pause();
    overlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    // Attach to all .video containers
    document.querySelectorAll('.video').forEach(function (vid) {
        vid.addEventListener('click', function (e) {
            // Try to get the first <source> inside the video
            showMovieModal();
            //var videoTag = vid.querySelector('video');
            //var src = videoTag ? (videoTag.querySelector('source') ? videoTag.querySelector('source').src : videoTag.src) : '';
            //if (src) {
            //    showMovieModal(src);
            //}
        });
    });
    document.getElementById('closeMovieModal').addEventListener('click', hideMovieModal);
    document.getElementById('movieModalOverlay').addEventListener('click', function (e) {
        if (e.target === this) hideMovieModal();
    });
});


// About page, who we are component
// GSAP: Animate .section elements on scroll (appear at top 30%)
if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray('.section').forEach(function (section) {
        gsap.set(section, { autoAlpha: 0, y: 60 });
        gsap.to(section, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 70%', // top of section hits 70% from top (== 30% from top)
                toggleActions: 'play none none reverse',
                once: false
            }
        });
    });
}

//// About page, team members button
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    const btn = document.querySelector('.play-timeline-button');
    const container = document.querySelector('.timeline-container');
    if (btn && container) {
        btn.addEventListener('click', function () {
            // Use jQuery animate for smooth scroll
            $(container).animate({ scrollLeft: container.scrollWidth }, 15000, 'swing');
        });
    }

    const teamBtn = document.querySelector('.play-team-button');
    const teamContainer = document.querySelector('.team-members');
    if (teamBtn && teamContainer) {
        teamBtn.addEventListener('click', function () {
            // Use jQuery animate for smooth scroll
            $(teamContainer).animate({ scrollLeft: teamContainer.scrollWidth }, 5000, 'swing');
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {

    $('.slides-nav-item').click(function () {
        if (window.innerWidth < 786) {
            // Desktop: keep default slide switching behavior
            $('.slides-nav-item').removeClass('active');
            $(this).addClass('active');
            var $content = $(this).find('.content-container');
            // Close all others first
            $('.slides-nav-item .content-container').not($content).slideUp(200);
            if ($content.length) {
                if ($content.is(':visible')) {
                    $content.stop(true, true).slideUp(200);
                } else {
                    $content.stop(true, true).slideDown(300);
                }
            }
        } else {
            // Desktop: keep default slide switching behavior
            $('.slides-nav-item').removeClass('active');
            $(this).addClass('active');
            const targetId = $(this).data('slide');
            const targetElement = $('.' + targetId);
            if (targetElement.length) {
                $('.slide').removeClass('show');
                $(targetElement).addClass('show');
            }
        }
    });
});


// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeIcon = document.getElementById('closeIcon');

    function closeMobileMenu() {
        // Slide out and hide
        gsap.to(mobileMenu, {
            x: '-100%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: function () {
                mobileMenu.style.display = 'none';
            }
        });

        // Reset aria attributes
        menuIcon.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }

    if (menuIcon && mobileMenu) {
        menuIcon.addEventListener('click', function () {
            const isExpanded = menuIcon.getAttribute('aria-expanded') === 'true';

            // Toggle aria-expanded for accessibility
            menuIcon.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);

            // Toggle the menu visibility and slide animation
            if (!isExpanded) {
                mobileMenu.style.display = 'block';
                // Use GSAP for smooth slide animation from left to right
                gsap.fromTo(mobileMenu,
                    { x: '-100%', opacity: 0 },
                    { x: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' }
                );
            } else {
                closeMobileMenu();
            }
        });

        // Close menu when close icon is clicked
        if (closeIcon) {
            closeIcon.addEventListener('click', function () {
                closeMobileMenu();
            });
        }
    }
});


// Start Timeline Mobile Component
$('.timeline-nav-item').click(function () {
    // Update nav-info display
    const currentIndex = $(this).data('index') || 1;
    const totalItems = $('.component-timeline-mobile .timeline-nav-item').length;
    $('.nav-info-index').text(currentIndex + '/' + totalItems);
    $('.nav-info-title').text($(this).find('span').text());
    console.log('clicked', $(this).data('event'));

    const targetEvent = $(this).data('event');

    // Remove active class from all timeline nav items
    $('.timeline-nav-item').removeClass('active');
    // Add active class to the clicked item
    $(this).addClass('active');

    // Remove active class from all image-containers and info-items
    $('.image-container').removeClass('active');
    $('.info-item').removeClass('active');

    // Add active class to image-container and info-item with matching data-event
    $('.image-container[data-event="' + targetEvent + '"]').addClass('active');
    $('.info-item[data-event="' + targetEvent + '"]').addClass('active');

    const targetId = targetEvent;
    const targetElement = $('#' + targetId);
    if (targetElement.length) {
        const parentOffset = $(targetElement)[0].offsetLeft;
        const ctaOffset = $(targetElement).find('.inset-text-cta').position()?.left || 0;
        const totalOffset = parentOffset + ctaOffset - 50;

        console.log('scrolling to', totalOffset);
        $('.timeline-container').animate({
            scrollLeft: totalOffset
        }, 3000);
    }

});




$(document).ready(function () {
    // Timeline mobile menu toggle functionality
    $('.timeline-nav-bottom .menu-icon').click(function () {
        const $timelineNavItems = $('.timeline-nav-items');
        const $menuIcon = $(this);
        const $menuClose = $('.timeline-nav-bottom .menu-close');

        // Show timeline nav items with slide up animation
        $timelineNavItems.slideDown(400, function () {
            // After animation completes, hide menu icon and show close icon
            $menuIcon.hide();
            $menuClose.show();
        });
    });

    $('.timeline-nav-bottom .menu-close').click(function () {
        const $timelineNavItems = $('.timeline-nav-items');
        const $menuIcon = $('.timeline-nav-bottom .menu-icon');
        const $menuClose = $(this);

        // Hide timeline nav items with slide down animation
        $timelineNavItems.slideUp(400, function () {
            // After animation completes, show menu icon and hide close icon
            $menuIcon.show();
            $menuClose.hide();
        });
    });
});

// End Timeline Mobile Component