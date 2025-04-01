// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and interactions
    initLoader();
    initCursor();
    initMenu();
    initLocalTime();
    

  
    initThreeJS();

    
    // Delay scroll animations to improve initial load performance
    setTimeout(() => {
        initScrollAnimations();
        initProjectInteractions();
        initContactForm(); // Initialize contact form functionality
    }, 100);
});

// Loader Animation
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // Hide loader after animation completes
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Start page animations after loader is hidden
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        });
    }, 2000);
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, .menu-toggle, .menu-close, .project');
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.opacity = '1';
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Expand cursor on hoverable elements
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Menu Interactions
function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-nav a, .menu-socials a');
    
    // Toggle menu open
    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate in menu items
        menuLinks.forEach((link, index) => {
            link.style.opacity = 0;
            link.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                link.style.opacity = 1;
                link.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
    });
    
    // Close menu
    menuClose.addEventListener('click', closeMenu);
    
    // Close menu when clicking on a menu link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    function closeMenu() {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset menu item animations
        menuLinks.forEach(link => {
            link.style.opacity = 0;
            link.style.transform = 'translateY(20px)';
            link.style.transition = 'none';
        });
    }
}

// Local Time Display
function initLocalTime() {
    const timeElement = document.getElementById('local-time');
    
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true,
            timeZone: 'Africa/Addis_Ababa'
        });
        timeElement.textContent = `${timeString} EAT`;
    }
    
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
}

// Three.js 3D Animation
function initThreeJS() {
    const webglContainer = document.getElementById('webgl');
    
    if (!webglContainer) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    webglContainer.appendChild(renderer.domElement);
    
    // Add ambient and directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create geometric shapes
    const shapes = [];
    const shapeCount = 10;
    
    for (let i = 0; i < shapeCount; i++) {
        // Randomly create cubes or spheres
        let geometry, material, mesh;
        
        if (Math.random() > 0.5) {
            // Create cube
            geometry = new THREE.BoxGeometry(1, 1, 1);
        } else {
            // Create sphere
            geometry = new THREE.SphereGeometry(0.5, 16, 16);
        }
        
        // Create material with random color
        material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(Math.random(), Math.random(), Math.random()),
            transparent: true,
            opacity: 0.7,
        });
        
        mesh = new THREE.Mesh(geometry, material);
        
        // Position randomly in 3D space
        mesh.position.x = Math.random() * 16 - 8;
        mesh.position.y = Math.random() * 16 - 8;
        mesh.position.z = Math.random() * 16 - 12;
        
        // Add random rotation speed for animation
        mesh.rotation.speed = {
            x: Math.random() * 0.01,
            y: Math.random() * 0.01,
            z: Math.random() * 0.01
        };
        
        scene.add(mesh);
        shapes.push(mesh);
    }
    
    // Set camera position
    camera.position.z = 4;
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / width) * 2 - 1;
        mouse.y = -(event.clientY / height) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smoothly move to target
        target.x = mouse.x * 0.1;
        target.y = mouse.y * 0.1;
        
        // Rotate camera based on mouse position
        camera.position.x += (target.x - camera.position.x) * 0.05;
        camera.position.y += (target.y - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        // Animate each shape's rotation
        shapes.forEach(shape => {
            shape.rotation.x += shape.rotation.speed.x;
            shape.rotation.y += shape.rotation.speed.y;
            shape.rotation.z += shape.rotation.speed.z;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Scroll Animations
function initScrollAnimations() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section fade in
    gsap.from('.hero-title h1, .hero-title h4, .hero-title p', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Projects section animations
    gsap.from('.project', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 70%'
        }
    });
    
    // About section animations
    gsap.from('.about-text p', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%'
        }
    });
    
    gsap.from('.skills-list div', {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.about-skills',
            start: 'top 80%'
        }
    });
    
    // Experience and education animations
    gsap.from('.experience-item, .education-item', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-experience',
            start: 'top 80%'
        }
    });
    
    // Contact section animation
    gsap.from('.contact-header, .contact-content', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%'
        }
    });
}

// Project Interactions
function initProjectInteractions() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        project.addEventListener('click', () => {
            const description = project.querySelector('.project-description');
            
            if (description) {
                if (project.classList.contains('expanded')) {
                    // Close the expanded project
                    project.classList.remove('expanded');
                    gsap.to(description, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            description.classList.add('hidden');
                            description.style.height = '';
                        }
                    });
                } else {
                    // Close any previously expanded projects
                    const expandedProjects = document.querySelectorAll('.project.expanded');
                    expandedProjects.forEach(expandedProject => {
                        if (expandedProject !== project) {
                            const expandedDescription = expandedProject.querySelector('.project-description');
                            expandedProject.classList.remove('expanded');
                            gsap.to(expandedDescription, {
                                height: 0,
                                opacity: 0,
                                duration: 0.3,
                                onComplete: () => {
                                    expandedDescription.classList.add('hidden');
                                    expandedDescription.style.height = '';
                                }
                            });
                        }
                    });
                    
                    // Open the clicked project
                    project.classList.add('expanded');
                    description.classList.remove('hidden');
                    gsap.fromTo(description, 
                        { height: 0, opacity: 0 },
                        { 
                            height: 'auto', 
                            opacity: 1, 
                            duration: 0.5,
                            ease: 'power2.out'
                        }
                    );
                    
                    // Scroll to project if it's not fully visible
                    const projectRect = project.getBoundingClientRect();
                    if (projectRect.bottom > window.innerHeight) {
                        const offset = projectRect.top + window.scrollY - 100;
                        window.scrollTo({
                            top: offset,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
}

// Contact Form Submission
function initContactForm() {
    const contactTrigger = document.getElementById('contact-trigger');
    const cancelForm = document.getElementById('cancel-form');
    const formContainer = document.querySelector('.contact-form-container');
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const contactCta = document.querySelector('.contact-cta');
    
    if (!contactTrigger || !form) return;
    
    // Show form when clicking "Get in touch"
    contactTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        formContainer.classList.remove('hidden');
        
        // Animate form appearing with GSAP if available
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(formContainer, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
        
        // Hide the contact trigger button
        contactCta.style.display = 'none';
        
        // Focus the first input
        setTimeout(() => {
            form.querySelector('input').focus();
        }, 100);
    });
    
    // Hide form when clicking "Cancel"
    if (cancelForm) {
        cancelForm.addEventListener('click', function() {
            // Animate form disappearing with GSAP if available
            if (typeof gsap !== 'undefined') {
                gsap.to(formContainer, {
                    opacity: 0, 
                    y: 20, 
                    duration: 0.3,
                    onComplete: () => {
                        formContainer.classList.add('hidden');
                        contactCta.style.display = 'block';
                        
                        // Reset form
                        form.reset();
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }
                });
            } else {
                formContainer.classList.add('hidden');
                contactCta.style.display = 'block';
                
                // Reset form
                form.reset();
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }
        });
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading message
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
        
        // Send data to our API endpoint
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Success message
            formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
            formStatus.className = 'form-status success';
            
            // Reset form
            form.reset();
            
            // Hide form after 3 seconds
            setTimeout(() => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(formContainer, {
                        opacity: 0, 
                        y: 20, 
                        duration: 0.3,
                        onComplete: () => {
                            formContainer.classList.add('hidden');
                            contactCta.style.display = 'block';
                            
                            // Reset status
                            setTimeout(() => {
                                formStatus.textContent = '';
                                formStatus.className = 'form-status';
                            }, 500);
                        }
                    });
                } else {
                    formContainer.classList.add('hidden');
                    contactCta.style.display = 'block';
                    
                    // Reset status
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }
            }, 3000);
        })
        .catch(error => {
            // Error message
            console.error('Error:', error);
            formStatus.textContent = 'There was a problem sending your message. Please try again.';
            formStatus.className = 'form-status error';
        });
    });
}