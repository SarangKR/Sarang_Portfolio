<<<<<<< HEAD:Portfolio Code/script.js
// Certificates Carousel (Dynamic & Premium)
const certificates = [
  {
    icon: 'fa-certificate',
    title: 'Tata Data Visualization Job Sim.',
    org: 'Forage',
    date: 'May 15th 2025',
    desc: 'Completed the Tata Data Visualization Job Simulation, focusing on data visualization techniques and best practices.'
  },
  {
    icon: 'fa-trophy',
    title: 'Winner - College Data Science Hackathon',
    org: 'SRM Institute of Science and Technology',
    date: '2023',
    desc: 'Secured 1st place in a data science hackathon for building a predictive analytics solution for student performance.'
  }
  // Add more certificates as needed
];

const carousel = document.getElementById('certificates-carousel');
if (carousel) {
  carousel.innerHTML = '';
  certificates.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    card.innerHTML = `
      <div class="certificate-icon"><i class="fas ${cert.icon}"></i></div>
      <div class="certificate-content">
        <h3>${cert.title}</h3>
        <span class="certificate-org">${cert.org}</span>
        <span class="certificate-date">${cert.date}</span>
        <p>${cert.desc}</p>
      </div>
    `;
    carousel.appendChild(card);
  });
}
// Optional: Add drag-to-scroll for certificates carousel for better UX
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('certificates-carousel');
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('active');
    });
    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('active');
    });
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.2; //scroll-fast
      carousel.scrollLeft = scrollLeft - walk;
    });
    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('touchend', () => {
      isDown = false;
    });
    carousel.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }
});
// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Section reveal on scroll
const sections = document.querySelectorAll('.section');
function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Highlight active nav link
const footer = document.getElementById('footer');
function setActiveNav() {
    let index = sections.length;
    while(--index && window.scrollY + 80 < sections[index].offsetTop) {}
    // If scrolled to (or past) the footer, highlight Contact
    if (footer && window.scrollY + window.innerHeight >= footer.offsetTop + 40) {
        navLinks.forEach(link => link.classList.remove('active'));
        const contactLink = document.querySelector('.nav-link[href="#footer"]');
        if (contactLink) contactLink.classList.add('active');
    } else {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Also set active class on nav click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let valid = true;
        [name, email, message].forEach(field => {
            field.style.boxShadow = '';
            if (!field.value.trim()) {
                field.style.boxShadow = '0 0 0 2px #e17055';
                valid = false;
            }
        });
        // Basic email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailPattern.test(email.value)) {
            email.style.boxShadow = '0 0 0 2px #e17055';
            valid = false;
        }
        if (valid) {
            contactForm.reset();
            alert('Thank you for your message!');
        }
    });
}

// Dynamic Skills Rotator (show 3 at a time)
(function() {
  const skills = [
    { icon: '<i class="fab fa-python"></i>', name: 'Python' },
    { icon: '<i class="fas fa-database"></i>', name: 'MySQL' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/powerbi.svg" alt="PowerBI" style="width:2.2rem;height:2.2rem;filter:invert(38%) sepia(77%) saturate(7496%) hue-rotate(249deg) brightness(97%) contrast(101%);">', name: 'PowerBI' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tensorflow.svg" alt="Tensorflow" style="width:2.2rem;height:2.2rem;filter:invert(38%) sepia(77%) saturate(7496%) hue-rotate(249deg) brightness(97%) contrast(101%);">', name: 'Tensorflow' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pandas.svg" alt="Pandas" style="width:2.2rem;height:2.2rem;filter:invert(38%) sepia(77%) saturate(7496%) hue-rotate(249deg) brightness(97%) contrast(101%);">', name: 'Pandas' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/numpy.svg" alt="Numpy" style="width:2.2rem;height:2.2rem;filter:invert(38%) sepia(77%) saturate(7496%) hue-rotate(249deg) brightness(97%) contrast(101%);">', name: 'Numpy' },
    { icon: '<i class="fab fa-html5"></i>', name: 'HTML' },
    { icon: '<i class="fab fa-css3-alt"></i>', name: 'CSS' },
    { icon: '<i class="fab fa-js-square"></i>', name: 'JavaScript' }
  ];
  let idx = 0;
  function showSkills(i) {
    var skillDiv = document.getElementById('dynamic-skill');
    if (!skillDiv) return;
    skillDiv.style.opacity = 0;
    setTimeout(() => {
      let html = '';
      for (let j = 0; j < 3; j++) {
        const skill = skills[(i + j) % skills.length];
        html += '<div class="skill-card" style="display:inline-flex;flex-direction:column;align-items:center;margin:0 18px;">' + skill.icon + '<span>' + skill.name + '</span></div>';
      }
      skillDiv.innerHTML = html;
      skillDiv.style.animation = 'none';
      void skillDiv.offsetWidth;
      skillDiv.style.animation = null;
      skillDiv.style.opacity = 1;
    }, 300);
  }
  document.addEventListener('DOMContentLoaded', function() {
    showSkills(idx);
    setInterval(() => {
      idx = (idx + 1) % skills.length;
      showSkills(idx);
    }, 1800);
  });
})();

// Skills Carousel (horizontal infinite scroll, JS-driven)
document.addEventListener('DOMContentLoaded', function() {
  const skills = [
    { icon: '<i class="fab fa-python"></i>', name: 'Python' },
    { icon: '<i class="fas fa-database"></i>', name: 'MySQL' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/powerbi.svg" alt="PowerBI">', name: 'PowerBI' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tensorflow.svg" alt="Tensorflow">', name: 'Tensorflow' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pandas.svg" alt="Pandas">', name: 'Pandas' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/numpy.svg" alt="Numpy">', name: 'Numpy' },
    { icon: '<i class="fab fa-html5"></i>', name: 'HTML' },
    { icon: '<i class="fab fa-css3-alt"></i>', name: 'CSS' },
    { icon: '<i class="fab fa-js-square"></i>', name: 'JavaScript' }
  ];
  const carousel = document.getElementById('skills-carousel');
  if (carousel) {
    let html = '';
    for (const skill of skills) {
      html += `<div class="skill-card">${skill.icon}<span>${skill.name}</span></div>`;
    }
    // Duplicate for seamless scroll
    for (const skill of skills) {
      html += `<div class="skill-card">${skill.icon}<span>${skill.name}</span></div>`;
    }
    carousel.innerHTML = html;

    // Animation logic
    let pos = 0;
    const speed = 0.7; // px per frame
    const totalWidth = carousel.scrollWidth / 2;
    function animate() {
      pos -= speed;
      if (Math.abs(pos) >= totalWidth) {
        pos = 0;
      }
      carousel.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }
});
=======
// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Section reveal on scroll
const sections = document.querySelectorAll('.section');
function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Highlight active nav link
const footer = document.getElementById('footer');
function setActiveNav() {
    let index = sections.length;
    while(--index && window.scrollY + 80 < sections[index].offsetTop) {}
    // If scrolled to (or past) the footer, highlight Contact
    if (footer && window.scrollY + window.innerHeight >= footer.offsetTop + 40) {
        navLinks.forEach(link => link.classList.remove('active'));
        const contactLink = document.querySelector('.nav-link[href="#footer"]');
        if (contactLink) contactLink.classList.add('active');
    } else {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Also set active class on nav click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let valid = true;
        [name, email, message].forEach(field => {
            field.style.boxShadow = '';
            if (!field.value.trim()) {
                field.style.boxShadow = '0 0 0 2px #e17055';
                valid = false;
            }
        });
        // Basic email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailPattern.test(email.value)) {
            email.style.boxShadow = '0 0 0 2px #e17055';
            valid = false;
        }
        if (valid) {
            contactForm.reset();
            alert('Thank you for your message!');
        }
    });
}

// Dynamic Skills Rotator (show 3 at a time)
(function() {
  const skills = [
    { icon: '<i class="fab fa-python"></i>', name: 'Python' },
    { icon: '<i class="fas fa-database"></i>', name: 'MySQL' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/powerbi.svg" alt="PowerBI" style="width:2.2rem;height:2.2rem;filter:invert(38%) sepia(77%) saturate(7496%) hue-rotate(249deg) brightness(97%) contrast(101%);">', name: 'PowerBI' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tensorflow.svg" alt="Tensorflow" style="width:2.2rem;height:2.2rem;filter:invert(38%) sepia(77%) saturate(7496%) hue-rotate(249deg) brightness(97%) contrast(101%);">', name: 'Tensorflow' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pandas.svg" alt="Pandas" style="width:2.2rem;height:2.2rem;filter:invert(38%) sepia(77%) saturate(7496%) hue-rotate(249deg) brightness(97%) contrast(101%);">', name: 'Pandas' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/numpy.svg" alt="Numpy" style="width:2.2rem;height:2.2rem;filter:invert(38%) sepia(77%) saturate(7496%) hue-rotate(249deg) brightness(97%) contrast(101%);">', name: 'Numpy' },
    { icon: '<i class="fab fa-html5"></i>', name: 'HTML' },
    { icon: '<i class="fab fa-css3-alt"></i>', name: 'CSS' },
    { icon: '<i class="fab fa-js-square"></i>', name: 'JavaScript' }
  ];
  let idx = 0;
  function showSkills(i) {
    var skillDiv = document.getElementById('dynamic-skill');
    if (!skillDiv) return;
    skillDiv.style.opacity = 0;
    setTimeout(() => {
      let html = '';
      for (let j = 0; j < 3; j++) {
        const skill = skills[(i + j) % skills.length];
        html += '<div class="skill-card" style="display:inline-flex;flex-direction:column;align-items:center;margin:0 18px;">' + skill.icon + '<span>' + skill.name + '</span></div>';
      }
      skillDiv.innerHTML = html;
      skillDiv.style.animation = 'none';
      void skillDiv.offsetWidth;
      skillDiv.style.animation = null;
      skillDiv.style.opacity = 1;
    }, 300);
  }
  document.addEventListener('DOMContentLoaded', function() {
    showSkills(idx);
    setInterval(() => {
      idx = (idx + 1) % skills.length;
      showSkills(idx);
    }, 1800);
  });
})();

// Skills Carousel (horizontal infinite scroll, JS-driven)
document.addEventListener('DOMContentLoaded', function() {
  const skills = [
    { icon: '<i class="fab fa-python"></i>', name: 'Python' },
    { icon: '<i class="fas fa-database"></i>', name: 'MySQL' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/powerbi.svg" alt="PowerBI">', name: 'PowerBI' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tensorflow.svg" alt="Tensorflow">', name: 'Tensorflow' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pandas.svg" alt="Pandas">', name: 'Pandas' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/numpy.svg" alt="Numpy">', name: 'Numpy' },
    { icon: '<i class="fab fa-html5"></i>', name: 'HTML' },
    { icon: '<i class="fab fa-css3-alt"></i>', name: 'CSS' },
    { icon: '<i class="fab fa-js-square"></i>', name: 'JavaScript' }
  ];
  const carousel = document.getElementById('skills-carousel');
  if (carousel) {
    let html = '';
    for (const skill of skills) {
      html += `<div class="skill-card">${skill.icon}<span>${skill.name}</span></div>`;
    }
    // Duplicate for seamless scroll
    for (const skill of skills) {
      html += `<div class="skill-card">${skill.icon}<span>${skill.name}</span></div>`;
    }
    carousel.innerHTML = html;

    // Animation logic
    let pos = 0;
    const speed = 0.7; // px per frame
    const totalWidth = carousel.scrollWidth / 2;
    function animate() {
      pos -= speed;
      if (Math.abs(pos) >= totalWidth) {
        pos = 0;
      }
      carousel.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }
});
>>>>>>> 0476eef8dad089186a0ee77882bfbc2c9aeaff30:script.js
