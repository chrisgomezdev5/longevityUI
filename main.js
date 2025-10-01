//Fixed Navbar on Scroll
window.addEventListener('scroll', function() {
    if (window.scrollY >= 500) {
        document.getElementById('nav').classList.remove('home');
    }
    else {
        document.getElementById('nav').classList.add('home');
    }
});

// Video Looping Logic
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
(function() {
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

    container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Mouse drag/swipe support for desktop
    let mouseStartX = 0;
    let mouseEndX = 0;
    let isDragging = false;

    container.addEventListener('mousedown', function(e) {
        mouseStartX = e.clientX;
        isDragging = true;
        container.style.cursor = 'grabbing';
        e.preventDefault(); // Prevent text selection
    });

    container.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
    });

    container.addEventListener('mouseup', function(e) {
        if (!isDragging) return;
        mouseEndX = e.clientX;
        isDragging = false;
        container.style.cursor = 'grab';
        handleMouseSwipe();
    });

    container.addEventListener('mouseleave', function(e) {
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
    window.addEventListener('resize', function() {
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
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.plan-your-visit').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showPlanModal();
        });
    });
    document.getElementById('closePlanModal').addEventListener('click', hidePlanModal);
    document.getElementById('planModalOverlay').addEventListener('click', function(e) {
        if (e.target === this) hidePlanModal();
    });
});


