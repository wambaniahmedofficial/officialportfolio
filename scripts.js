document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar ul li a');
    const sections = document.querySelectorAll('section');

    function removeActiveClass() {
        navLinks.forEach(link => link.classList.remove('active'));
    }
    function setActiveLink(link) {
        removeActiveClass();
        link.classList.add('active');
    }
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            setActiveLink(this);
        });
    });

    function updateActiveLinkOnScroll() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    function setDefaultActiveLink() {
        const homeLink = document.querySelector('a[href="#home"]');
        setActiveLink(homeLink);
        window.scrollTo({
            top: document.querySelector('#home').offsetTop,
            behavior: 'smooth'
        });
    }
    window.addEventListener('load', setDefaultActiveLink);

    window.addEventListener('scroll', updateActiveLinkOnScroll);

    updateActiveLinkOnScroll();
});


document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('open');
});

document.getElementById('close-icon').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.remove('open');
});

document.querySelectorAll('.mobile-menu ul li a').forEach(function(link) {
    link.addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.remove('open');
    });
});

document.addEventListener('click', function(event) {
    var menu = document.getElementById('mobile-menu');
    var menuIcon = document.getElementById('menu-icon');
    var isClickInsideMenu = menu.contains(event.target);
    var isClickOnMenuIcon = menuIcon.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuIcon) {
        menu.classList.remove('open');
    }
});

window.onload = function() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = 'Good Morning!';
    if (hour >= 12 && hour < 16) {
        greeting = 'Good Afternoon!';
    } else if (hour >= 16) {
        greeting = 'Good Evening!';
    }
    document.getElementById('greeting').innerText = greeting;
}
document.addEventListener('DOMContentLoaded', () => {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Web Developer", "Web Designer", "Graphic Designer", "App Developer"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000; 
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        
            animateBars();
        });
    });
    document.querySelector('.tab[data-tab="technical"]').click();

    function animateBars() {
        document.querySelectorAll('.bar').forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = `${percentage}%`;
            }, 100);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.outer');
    circles.forEach((circle, index) => {
        const percentage = parseInt(circle.querySelector('.number').textContent);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");

        const circleBg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleBg.classList.add('circle-bg');
        circleBg.setAttribute("cx", "50");
        circleBg.setAttribute("cy", "50");
        circleBg.setAttribute("r", "45");

        const circleFg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleFg.classList.add('circle');
        circleFg.setAttribute("cx", "50");
        circleFg.setAttribute("cy", "50");
        circleFg.setAttribute("r", "45");

        svg.appendChild(circleBg);
        svg.appendChild(circleFg);
        circle.appendChild(svg);

        const radius = circleFg.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        circleFg.style.strokeDashoffset = offset;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.learn-more');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.previousElementSibling;
            if (details.style.display === 'block') {
                details.style.display = 'none';
                button.textContent = 'Show more';
            } else {
                details.style.display = 'block';
                button.textContent = 'Show less';
            }
        });
    });
});
var swiper = new Swiper(".review-slider", {
    loop: true, 
    spaceBetween: 20,
    autoplay:{
        delay: 7500,
        disableOnInteraction: false
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
const scriptURL = 'https://script.google.com/macros/s/AKfycbxVcApvzdgmq8biMICFxtos40cX8st3cFCgHCYP6-sMvyZRTVP20ugFIeUhUaMdZGCW/exec'
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const msgModal = document.getElementById("msgModal");
const errorMessageDiv = document.getElementById("error-message");

form.addEventListener('submit', e => {
    e.preventDefault();

    const fullName = form.querySelector('input[name="FullName"]').value.trim();
    const phone = form.querySelector('input[name="PhoneNo"]').value.trim();
    const email = form.querySelector('input[name="Email"]').value.trim();

    let valid = true;
    let errorMessage = "<h4>Oops! Error in Form Submission:</h4>";

    const nameParts = fullName.split(" ");
    const nameRegex = /^[a-zA-Z]+$/;
    if (nameParts.length < 2 || nameParts.length > 4 || !nameParts.every(part => nameRegex.test(part))) {
        valid = false;
        errorMessage += "<p>Please provide a valid full name (between 2 and 4 names, no numbers or special characters).</p>";
    }
    const phoneRegex = /^\+?\d+$/; 
    if (!phoneRegex.test(phone) || 
        (phone.startsWith('+') && phone.length !== 13) || 
        (!phone.startsWith('+') && phone.length !== 10)) {
        valid = false;
        errorMessage += "<p>Please provide a valid phone number (10 digits or in the format +254... with 12 digits).</p>";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        valid = false;
        errorMessage += "<p>Enter a valid email address.</p>";
    }

    if (!valid) {
        errorMessageDiv.innerHTML = errorMessage;
        errorMessageDiv.style.display = "block"; 
        return;
    }
    errorMessageDiv.style.display = "none";
    
    msg.innerHTML = `${fullName}, thank you! Your message has been submitted!`;
    msgModal.style.display = "flex"; 
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            setTimeout(function(){
                msgModal.style.display = "none"; 
                form.reset(); 
            }, 4000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.innerHTML = "There was an error sending the message."; 
            msgModal.style.display = "flex"; 
            setTimeout(function(){
                msgModal.style.display = "none"; 
            }, 5000);
        });
});

document.querySelectorAll('.footer-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const form1 = document.querySelector('.footer-newsletter form');
form1.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = form1.querySelector('input').value;
    if (email) {
        form1.innerHTML = `<p>Thank you for subscribing, ${email}!</p>`;
    }
});

