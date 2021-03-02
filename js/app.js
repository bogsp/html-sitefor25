// Register Plugins
gsap.registerPlugin(ScrollTrigger);

// Durations
const durationFast = .5;
const durationMid = .8;
const durationSlow = 1;

// Utilities Animations
const fadeIn = (element, visibility = 1) => {
    element.style.display = 'block';
    gsap.fromTo(element, { opacity: 0 }, { opacity: visibility, duration: durationFast });
}

const fadeOut = (element, visibility = 1) => {
    gsap.fromTo(element, { opacity: visibility }, {
        opacity: 0,
        duration: durationFast,
        onComplete: () => {
            element.style.display = 'none';
        }
    });
}

// Content Animations
// fade in from top
const fadeFromTop = (element, target, del = 0, sf = 'center') => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target,
            start: 'top center',
            toggleActions: 'restart pause resume reverse'
        },
        y: -100,
        opacity: 0,
        duration: durationFast,
        stagger: {
            from: sf,
            amount: durationFast
        },
        delay: del
    })
}

// fade in from bottom
const fadeFromBottom = (element, target, del = 0, sf = 'center') => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target,
            start: 'top center',
            toggleActions: 'restart pause resume reverse'
        },
        y: 100,
        opacity: 0,
        duration: durationFast,
        stagger: {
            from: sf,
            amount: durationFast
        },
        delay: del
    })
}

// fade in from left
const fadeFromLeft = (element, target, del = 0, sf = 'center') => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target,
            start: 'top center',
            toggleActions: 'restart pause resume reverse'
        },
        x: -100,
        opacity: 0,
        duration: durationFast,
        stagger: {
            from: sf,
            amount: durationFast
        },
        delay: del
    })
}

// fade in from right
const fadeFromRight = (element, target, del = 0, sf = 'center') => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target,
            start: 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        x: 100,
        opacity: 0,
        duration: durationFast,
        stagger: {
            from: sf,
            amount: durationFast
        },
        delay: del
    })
}

// Mobile Menu
const header = document.querySelector('header');
header.classList.add('closed');

const logo = header.querySelectorAll('.logo');
const navLinks = header.querySelectorAll('.nav-links');
const hamburger = document.querySelector('.hamburger');

const openMobileNav = gsap.timeline({ paused: true });

const closeMobileNav = gsap.timeline({ paused: true });

function screenReady() {
    if (screen.width <= 425) {
        openMobileNav
            .from('.overlay', durationMid, { x: 250, opacity: 0 })
            .from('.nav-links a', durationMid, { x: 100, opacity: 0, stagger: .1 }, "-= .2");
        closeMobileNav
            .to('.overlay', durationSlow, { x: 250, opacity: 0 })
            .to('.nav-links a', durationFast, { x: 100, stagger: .1 }, "-= .2")
            .to('.nav-links a', .2, { opacity: 0 }, "-= durationMid");
        hamburger.addEventListener('click', () => {
            if (header.classList.contains('closed') && !header.classList.contains('open')) {
                openMobileNav.restart();
                header.classList.add('open');
                header.classList.remove('closed')
            } else {
                closeMobileNav.restart();
                header.classList.remove('open')
                header.classList.add('closed');
            }
        })
    } else {
        gsap.from(logo, {
            y: -100,
            opacity: 0,
            duration: durationFast
        });
        gsap.from(navLinks, {
            y: -100,
            opacity: 0,
            duration: durationFast,
            stagger: {
                from: 'center',
                amount: durationFast
            }
        })
    }
}

// Footer
const footer = document.querySelector('footer');
if (footer) {
    const copyright = footer.querySelector('.copyright');
    gsap.from(copyright, {
        scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        x: -100,
        opacity: 0,
        duration: durationFast
    })
    const social = footer.querySelector('.social').children;
    gsap.from(social, {
        scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        x: 100,
        opacity: 0,
        duration: durationFast,
        stagger: {
            from: 'end',
            amount: durationFast
        }
    })
}

// Lightbox
var elem = document.createElement("img");
const lightbox = document.querySelector('.lightbox');

const galleryLinks = [];

const showLightbox = (src) => {
    fadeIn(lightbox);
    lightbox.appendChild(elem);
    elem.src = src;
}

const getGalleryItems = () => {
    if (lightbox) {
        lightbox.addEventListener('click', () => {
            fadeOut(lightbox);
        });
    }

    document.querySelectorAll('.gallery-img img').forEach(element => {

        galleryLinks.push(element.src);

        element.addEventListener('click', () => {
            showLightbox(element.src);
        })
    });
}

// Section Animations
// Hero Section
const hero = document.querySelector('#hero');
if (hero) {
    const heroChildren = hero.querySelector('.grid-content').children;
    gsap.from(heroChildren, {
        y: 100,
        opacity: 0,
        duration: durationFast,
        stagger: durationFast
    })
}

// Blurbs Section
const blurbsContainer = document.querySelector('#blurbs');
if (blurbsContainer) {
    const blurbsText = blurbsContainer.querySelectorAll('.fade-from-bottom');
    fadeFromBottom(blurbsText, blurbsContainer);
    const blurbs = blurbsContainer.querySelectorAll('.blurb-container .blurb');
    fadeFromBottom(blurbs, blurbsContainer, durationSlow);
}

// gallery Section
const galleryContainer = document.querySelector('#gallery');
if (galleryContainer) {
    const galleryText = galleryContainer.querySelectorAll('.fade-from-bottom');
    fadeFromBottom(galleryText, galleryContainer);
    const gallery = galleryContainer.querySelectorAll('.gallery-container .gallery-img');
    fadeFromBottom(gallery, galleryContainer, durationFast);
}

// pricing Section
const pricingContainer = document.querySelector('#pricing');
if (pricingContainer) {
    const pricingText = pricingContainer.querySelectorAll('.fade-from-bottom');
    fadeFromBottom(pricingText, pricingContainer);
    const pricing = pricingContainer.querySelectorAll('.blurb-container .blurb')
    fadeFromBottom(pricing, pricingContainer, durationFast);
}

// About Section
const aboutContainer = document.querySelector('#about');
if (aboutContainer) {
    const aboutSpecial = aboutContainer.querySelector('.about-headline');
    gsap.from(aboutSpecial, {
        x: -100,
        opacity: 0,
        duration: durationFast
    })
    const aboutContent = aboutContainer.querySelector('.about-content').children;
    gsap.from(aboutContent, {
        y: 100,
        opacity: 0,
        duration: durationFast,
        stagger: .2,
        delay: durationMid
    })
    const aboutProfile = aboutContainer.querySelector('.about-profile');
    gsap.from(aboutProfile, {
        x: 100,
        opacity: 0,
        duration: durationFast,
    })
}

// Contact Section
const contactContainer = document.querySelector('#contact');
if (contactContainer) {
    const contactSpecial = contactContainer.querySelector('.contact-headline');
    gsap.from(contactSpecial, {
        x: -100,
        opacity: 0,
        duration: durationFast
    })
    const contactContent = contactContainer.querySelector('.contact-content').children;
    gsap.from(contactContent, {
        y: 100,
        opacity: 0,
        duration: durationFast,
        stagger: .2,
        delay: durationMid
    })
    const contactForm = contactContainer.querySelector('.form-container');
    gsap.from(contactForm, {
        x: 100,
        opacity: 0,
        duration: durationFast
    })
}
// Run all ready functions
const runAll = () => {
    screenReady();
    getGalleryItems();
}

runAll();