// Certificates Carousel (Dynamic & Premium)
const certificates = [
  {
    icon: 'fa-certificate',
    title: 'Tata-Data Visualization Job Sim',
    certLink: 'https://drive.google.com/file/d/1F4HF4A4HcNHfK5sTLmva3iNUX1GwGx8b/view?usp=drivesdk',
    org: 'Forage',
    orgLink: 'https://www.theforage.com/',
    date: 'May 2025',
    desc: 'Completed a Job Simulation offered by Tata that helped me learn and apply data visualization techniques using Power BI.'
  },
  {
    icon: 'fa-certificate',
    title: 'Power BI Desktop for Business Intelligence',
    certLink: 'https://drive.google.com/file/d/1HackathonWinnerCert',
    org: 'Udemy',
    orgLink: 'https://www.udemy.com/',
    date: '2023',
    desc: 'Completed a course on Power BI Desktop for Business Intelligence and created interactive dashboards and reports.'
  },
  {
    icon: 'fa-database',
    title: 'SQL for Data Science',
    certLink: 'https://drive.google.com/file/d/1SQLDataScienceCert',
    org: 'Coursera',
    orgLink: 'https://www.coursera.org/',
    date: '2024',
    desc: 'Completed a comprehensive course covering SQL fundamentals, queries, and data analysis for data science applications.'
  },
  {
    icon: 'fa-chart-line',
    title: 'Power BI Data Analyst Associate',
    certLink: 'https://drive.google.com/file/d/1PowerBICert',
    org: 'Microsoft',
    orgLink: 'https://www.microsoft.com/en-in/',
    date: '2024',
    desc: 'Earned certification for demonstrating skills in data modeling, visualization, and business intelligence using Power BI.'
  },
  {
    icon: 'fa-brain',
    title: 'Machine Learning Specialization',
    certLink: 'https://drive.google.com/file/d/1MLSpecializationCert',
    org: 'DeepLearning.AI',
    orgLink: 'https://www.deeplearning.ai/',
    date: '2023',
    desc: 'Completed a multi-course specialization covering supervised, unsupervised learning, and real-world ML projects.'
  }
];

const carousel = document.querySelector('.certificates-list');
if (carousel) {
  carousel.innerHTML = '';
  certificates.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'certificate-card premium';
    card.innerHTML = `
      <div class="certificate-icon premium"><i class="fas ${cert.icon}"></i></div>
      <div class="certificate-content">
        <h3 class="certificate-title"><a href="${cert.certLink}" target="_blank" class="certificate-title-link">${cert.title}</a></h3>
        <div class="certificate-meta">
          <a href="${cert.orgLink}" target="_blank" class="certificate-org">${cert.org}</a>
          <span class="certificate-date">${cert.date}</span>
        </div>
        <p class="certificate-desc">${cert.desc}</p>
      </div>
    `;
    carousel.appendChild(card);
  });
}
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
const timelineItems = document.querySelectorAll('.timeline-item');
const experienceCards = document.querySelectorAll('.experience-card');

function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
    
    // Animate timeline items (if any exist)
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 200); // Stagger animation
        }
    });
    
    // Animate experience cards
    experienceCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 150); // Stagger animation
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

// Skills Carousel (horizontal infinite scroll, always running)
document.addEventListener('DOMContentLoaded', function() {
  const skills = [
    { icon: '<i class="fab fa-python"></i>', name: 'Python' },
    { icon: '<i class="fas fa-database"></i>', name: 'MySQL' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/powerbi.svg" alt="PowerBI">', name: 'PowerBI' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tensorflow.svg" alt="Tensorflow">', name: 'TensorFlow' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pandas.svg" alt="Pandas">', name: 'Pandas' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/numpy.svg" alt="Numpy">', name: 'NumPy' },
    { icon: '<i class="fab fa-html5"></i>', name: 'HTML5' },
    { icon: '<i class="fab fa-css3-alt"></i>', name: 'CSS3' },
    { icon: '<i class="fab fa-js-square"></i>', name: 'JavaScript' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/scikitlearn.svg" alt="Scikit-learn">', name: 'Scikit-learn' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/jupyter.svg" alt="Jupyter">', name: 'Jupyter' },
    { icon: '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/git.svg" alt="Git">', name: 'Git' }
  ];
  
  const carousel = document.getElementById('skills-carousel');
  if (carousel) {
    // Create multiple copies for seamless infinite scroll
    let html = '';
    const copies = 4; // Create 4 copies for ultra-smooth scrolling
    
    for (let i = 0; i < copies; i++) {
      skills.forEach(skill => {
        html += `<div class="skill-card">${skill.icon}<span>${skill.name}</span></div>`;
      });
    }
    
    carousel.innerHTML = html;

    // Animation variables
    let position = 0;
    const speed = 0.4; // Reduced speed for slower, more relaxed scrolling
    const skillCards = carousel.querySelectorAll('.skill-card');
    const cardWidth = 190; // 140px card + 50px gap
    const singleSetWidth = skills.length * cardWidth;
    
    function animate() {
      position -= speed;
      
      // Reset position when we've scrolled through one complete set
      if (Math.abs(position) >= singleSetWidth) {
        position = 0;
      }
      
      carousel.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    }
    
    // Start the animation immediately
    animate();
    
    // Optional: Add subtle pause on hover (you can remove this if you want continuous scroll)
    const carouselOuter = document.querySelector('.skills-carousel-outer');
    if (carouselOuter) {
      let isPaused = false;
      let pausedPosition = 0;
      
      carouselOuter.addEventListener('mouseenter', () => {
        isPaused = true;
        pausedPosition = position;
      });
      
      carouselOuter.addEventListener('mouseleave', () => {
        isPaused = false;
        position = pausedPosition;
      });
      
      // Modified animate function to handle pause
      function animateWithPause() {
        if (!isPaused) {
          position -= speed;
          
          if (Math.abs(position) >= singleSetWidth) {
            position = 0;
          }
        }
        
        carousel.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateWithPause);
      }
      
      // Use the pause-enabled animation
      animateWithPause();
    }
  }
});
