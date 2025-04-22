// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if(mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }
  
  // Header Scroll Effect
  const header = document.getElementById('main-header');
  
  if(header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Project & Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  if(filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter items based on projects or portfolio page
        const items = document.querySelector('.projects') 
          ? document.querySelectorAll('.project-item')
          : document.querySelectorAll('.portfolio-item');
        
        items.forEach(item => {
          if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  if(faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', function() {
        // Close other open FAQs
        faqItems.forEach(faq => {
          if(faq !== item && faq.classList.contains('active')) {
            faq.classList.remove('active');
          }
        });
        
        // Toggle current FAQ
        item.classList.toggle('active');
        
        // Update toggle sign
        const toggle = this.querySelector('.faq-toggle');
        if(toggle) {
          toggle.textContent = item.classList.contains('active') ? '−' : '+';
        }
      });
    });
  }
  
  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if(!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if(isValid) {
        // Would normally submit the form or make an AJAX request here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if(elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };
  
  // Add animation classes to elements
  const addAnimationClasses = function() {
    // Add to section headers
    document.querySelectorAll('.section-header').forEach(el => {
      el.classList.add('animate-on-scroll');
    });
    
    // Add to cards and items
    document.querySelectorAll('.service-card, .featured-item, .project-item, .portfolio-item, .team-member, .testimonial-card').forEach(el => {
      el.classList.add('animate-on-scroll');
    });
  };
  
  // Initialize animations
  addAnimationClasses();
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
});

// Add CSS for mobile menu and animations
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 767px) {
    .nav-links {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      background-color: white;
      padding: 1rem;
      flex-direction: column;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      transform: translateY(-150%);
      transition: transform 0.3s ease;
      z-index: 100;
    }
    
    .nav-links.active {
      transform: translateY(0);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  }
  
  #main-header.scrolled {
    background-color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-on-scroll.animated {
    opacity: 1;
    transform: translateY(0);
  }
  
  .error {
    border-color: var(--color-error) !important;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
  }
`;

document.head.appendChild(style);