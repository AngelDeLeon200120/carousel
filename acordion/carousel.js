

const pages = [
    { image: './img/img1.jpg', title: 'Welcome Home', content: 'This is our beautiful homepage.' },
    { image: './img/img2.jpg', title: 'About Us', content: 'Learn more about our company and values.' },
    { image: './img/img3.jpg', title: 'Our Services', content: 'Discover what we can do for you.' },
    { image: './img/img1.jpg', title: 'Contact Us', content: 'Get in touch with our team.' },
    { image: './img/img1.jpg', title: 'Contact Us', content: 'Get in touch with our team.' },
    { image: './img/img1.jpg', title: 'Contact Us', content: 'Get in touch with our team.' },

];

const accordion = document.getElementById('accordion');
const nav = document.getElementById('nav');
let currentPage = -1;

function createAccordion() {
    pages.forEach((page, index) => {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        item.style.backgroundImage = `url(${page.image})`;
        accordion.appendChild(item);
    });
}

function createPage(index) {
    const page = document.createElement('div');
    page.className = 'page';
    page.style.backgroundImage = `url(${pages[index].image})`;
    
    const content = document.createElement('div');
    content.className = 'page-content';
    content.innerHTML = `
        <h2>${pages[index].title}</h2>
        <p>${pages[index].content}</p>
    `;
    
    page.appendChild(content);
    document.body.appendChild(page);
    
    setTimeout(() => {
        page.classList.add('active');
        currentPage = index;
    }, 50);
}

function changePage(index) {
    if (index === currentPage) return;
    
    // Remove the current page
    const oldPage = document.querySelector('.page.active');
    if (oldPage) {
        oldPage.classList.remove('active');
        setTimeout(() => oldPage.remove(), 1000);
    }
    
    // Perform the accordion animation
    animateAccordion().then(() => {
        createPage(index);
    });
}

function animateAccordion() {
    return new Promise((resolve) => {
        const items = document.querySelectorAll('.accordion-item');
        let delay = 0;
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
                setTimeout(() => item.classList.remove('active'), 350);
                if (index === items.length - 1) {
                    setTimeout(resolve, 300);
                }
            }, delay);
            delay += 100;
        });
    });
}

createAccordion();

// Set up navigation
nav.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageIndex = parseInt(item.getAttribute('data-page'));
        changePage(pageIndex);
    });
});

// Initial animation and auto-entry to Home page
window.addEventListener('load', () => {
    animateAccordion().then(() => {
        changePage(0);  // Go to Home page
    });
});