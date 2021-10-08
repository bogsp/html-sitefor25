// Variables
var staggerFrom = 'center';
if (screen.width <= 425) {
    staggerFrom = 'start';
}
// Durations
const durationFast = .5;
const durationMid = .8;
const durationSlow = 1;

// Utilities Animations
const fadeIn = (element, visibility = 1, dur = durationFast, display = 'block') => {
    element.style.display = display;
    gsap.fromTo(element, { opacity: 0 }, { opacity: visibility, duration: dur });
}

const fadeOut = (element, visibility = 1, dur = durationFast) => {
    gsap.fromTo(element, { opacity: visibility }, {
        opacity: 0,
        duration: dur,
        onComplete: () => {
            element.style.display = 'none';
        }
    });
}

// fade in from bottom
const fadeFromBottom = (element, del = 0, target = null, tf = false, sf = staggerFrom) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target ? target : element,
            start: tf ? 'top center' : 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        y: '100%',
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
const fadeFromRight = (element, del = 0, target = null, tf = false, sf = staggerFrom) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target ? target : element,
            start: tf ? 'top center' : 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        x: '100%',
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
const fadeFromLeft = (element, del = 0, target = null, tf = false, sf = staggerFrom) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target ? target : element,
            start: tf ? 'top center' : 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        x: '-100%',
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
const logo = header.querySelectorAll('.logo');

const hamburger = header.querySelector('.hamburger');
hamburger.classList.add('closed');

const navLinksContainer = header.querySelector('.nav-links');
fadeOut(navLinksContainer, 1, 0);
const navLinks = navLinksContainer.children;

const overlay = header.querySelector('.overlay');
gsap.to(overlay, { x: 100, opacity: 0, duration: 0 });

const openMobileNav = () => {
    fadeIn(navLinksContainer, 1, 0, 'flex');
    gsap.to(overlay, { x: 0, opacity: 1, duration: .3 })
    gsap.to(navLinks, { x: 0, opacity: 1, stagger: .1, duration: .2 });
}

const closeMobileNav = () => {
    gsap.to(navLinks, { x: '500%', opacity: 0, duration: .5, stagger: 0, onComplete: () => { fadeOut(navLinksContainer, 1, 0) } })
    gsap.to(overlay, { x: '100%', opacity: 0, duration: durationFast });
    fadeIn(navLinksContainer, 1, 0, 'flex');
}

if (screen.width <= 425) {

    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('closed') && !hamburger.classList.contains('open')) {
            hamburger.classList.add('open');
            hamburger.classList.remove('closed');
            openMobileNav();
        } else {
            hamburger.classList.remove('open');
            hamburger.classList.add('closed');
            closeMobileNav();
        }
    });
} else {
    fadeIn(navLinksContainer, 1, 0, 'flex');
    gsap.from(header, { y: -150, duration: durationFast, delay: .5 })
}

// Footer
const footer = document.querySelector('footer');
if (footer) {
    const copyright = footer.querySelector('.copyright');
    fadeFromBottom(copyright, .5, footer);

    const social = footer.querySelector('.social').children;
    fadeFromBottom(social, .5, footer, false, 'end');

}

// Hero Section
const hero = document.querySelector('#hero');
if (hero) {
    const heroChildren = hero.querySelector('.grid-content').children;
    gsap.from(heroChildren, {
        y: 100,
        opacity: 0,
        duration: durationFast,
        stagger: .2,
        delay: durationSlow
    })
}

// Blurbs Section
const blurbsContainer = document.querySelector('#blurbs');
if (blurbsContainer) {
    const blurbsText = blurbsContainer.querySelectorAll('.fade-from-bottom');
    fadeFromBottom(blurbsText);
    const blurbs = blurbsContainer.querySelectorAll('.blurb-container .blurb');
    fadeFromBottom(blurbs, 0, blurbsContainer);

}

// gallery Section
const galleryContainer = document.querySelector('#gallery');
if (galleryContainer) {
    const galleryText = galleryContainer.querySelectorAll('.fade-from-bottom');
    fadeFromBottom(galleryText);
    const gallery = galleryContainer.querySelectorAll('.gallery-container .gallery-img');
    fadeFromBottom(gallery, durationFast, galleryContainer);

    // Lightbox
    var elem = document.createElement("img");
    const lightbox = document.querySelector('.lightbox');

    const showLightbox = (src) => {
        fadeIn(lightbox);
        lightbox.appendChild(elem);
        elem.src = src;
    }

    lightbox.addEventListener('click', () => {
        fadeOut(lightbox);
    });

    gallery.forEach(element => {

        element.addEventListener('click', () => {
            showLightbox(element.querySelector('img').src);
        })
    });
}

// pricing Section
const pricingContainer = document.querySelector('#pricing');
if (pricingContainer) {
    const pricingText = pricingContainer.querySelectorAll('.fade-from-bottom');
    fadeFromBottom(pricingText);
    const pricing = pricingContainer.querySelectorAll('.blurb-container .blurb')
    fadeFromBottom(pricing, durationFast, pricingContainer);
}

// About Section
const aboutContainer = document.querySelector('#about');
if (aboutContainer) {
    const aboutSpecial = aboutContainer.querySelector('.about-headline');
    fadeFromLeft(aboutSpecial);

    const aboutContent = aboutContainer.querySelector('.about-content').children;
    fadeFromBottom(aboutContent, 0, null, false, 'start');

    const aboutProfile = aboutContainer.querySelector('.about-profile');
    fadeFromRight(aboutProfile);
}

// Contact Section
const contactContainer = document.querySelector('#contact');
if (contactContainer) {
    const contactSpecial = contactContainer.querySelector('.contact-headline');
    fadeFromLeft(contactSpecial);

    const contactContent = contactContainer.querySelector('.contact-content').children;
    fadeFromLeft(contactContent, 0, null, false, 'start');

    const contactForm = contactContainer.querySelector('.form-container');
    fadeFromRight(contactForm);
}