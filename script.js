// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typewriter effect for hero section
const roles = ['Data Analyst', 'Cybersecurity Consultant', 'Security Researcher', 'Graphic Designer', 'Web Developer' ,'Pentester'];
let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentCharIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            bar.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Here you would typically send the form data to a server
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
});

// Chat functionality
const chatButton = document.getElementById('chatButton');
const chatModal = document.getElementById('chatModal');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');

chatButton.addEventListener('click', () => {
    chatModal.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
    chatModal.classList.remove('active');
});

// Chat responses
const chatResponses = {
    'skills': "I'm passionate about Data Science and Machine Learning! I work extensively with Python, R, and SQL, and I love diving into cybersecurity projects. I've gotten pretty good with various AI frameworks and data visualization tools too.",
    'projects': "I've worked on some really exciting projects! My favorite ones include AI-powered threat detection systems and predictive analytics models. I particularly enjoy cybersecurity projects where I get to build solutions that actually make a difference.",
    'experience': "I've been working as a Data Scientist and Cybersecurity Analyst, which has been an amazing journey! I love developing ML models for threat detection and creating data-driven security solutions.",
    'contact': "I'd love to connect! You can reach me at vaanis1110@gmail.com or give me a call at +91 9670080395. I'm based in Bareilly, India, and I'm always open to discussing new opportunities!",
    'education': "I'm currently pursuing my BCA from Capital University and studying Cybersecurity through Ethical Learner. I completed my Senior Secondary from Padmawati Academy in Bareilly.",
    'achievements': "I'm proud of several achievements! I attended a Cybersecurity Workshop at IIT Roorkee, completed several hackathons, and was a District Badminton Champion for 5 consecutive years with a career-high ranking of AIR-63!",
    'default': "That's a great question! Feel free to ask me about my skills, projects, experience, education, achievements, or how to contact me. I'm here to help!"
};

function addChatMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateChatResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(chatResponses)) {
        if (key !== 'default' && lowerMessage.includes(key)) {
            return response;
        }
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! Great to meet you! I'm really glad you're taking the time to look through my work. Is there anything specific about my projects or experience you'd like to know more about?";
    }
    
    return chatResponses.default;
}

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addChatMessage(message, true);
    chatInput.value = '';
    
    // Simulate typing delay
    setTimeout(() => {
        const response = generateChatResponse(message);
        addChatMessage(response);
    }, 1000);
}

sendMessage.addEventListener('click', sendChatMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Download CV functionality
function downloadCV() {
    // Create CV content based on actual CV
    const cvContent = `
VAANI SHARMA
CYBER SECURITY ANALYST
Bareilly, India | +91 9670080395 | vaanis110@gmail.com | LinkedIn | Github

As a passionate and driven cybersecurity enthusiast, my objective is to apply my knowledge of compliance and risk management, information security, network security, threat analysis, and ethical hacking to help protect organizational systems from cyber threats. Eager to develop my skills and stay up to date with the latest security trends, I am seeking an opportunity to work in an environment where I can learn from experienced professionals and contribute to the security of digital infrastructures.

WORK EXPERIENCE

Cyber Security Analyst Intern | Ethical Learner                                July 2024 - Present
• Preliminary Analysis of Security Incidents and escalated critical issues to senior analysts.
• Supported the encryption and access control measures to ensure data confidentiality and integrity.
• Maintained detailed records of security incidents, vulnerabilities and remediation efforts.
• Assisted in evaluating new security tools and technologies for potential implementation.

PROJECTS

OSINT Automation Dashboard:
• Developed an OSINT automation tool to streamline data collection, analysis, and monitoring.
• Integrated APIs and web scraping for real-time threat intelligence and investigative research.

LiveShield 24/7 Threat Elimination:
• Provides real-time threat detection and firewall integration for proactive security.
• Instantly neutralizes malware and defends against viruses, ransomware, and phishing.

Phishing Protection System:
• Combines rule-based detection, machine learning, and real-time analysis to combat evolving threats.
• Maintains accuracy through regular updates, user feedback, and adaptive learning mechanisms.

EDUCATION

Capital University, Jharkhand                                                    2022-2025
BCA (Bachelor of Computer Applications)

Padmawati Academy, Bareilly                                                     2020-2022
Senior Secondary +2

ADDITIONAL INFORMATION

• Programming Languages: C, C++, Python, HTML, CSS, JavaScript, Typescript, React.js.
• Tools: MS Office, Google Workspace, Notion, Trello, Asana, Slack, Zoom, Microsoft Teams, Canva, Figma, Adobe Photoshop, Adobe Illustrator, Visual Studio Code, Git, GitHub, Power BI, MySQL, PostgreSQL, Notepad++, Sublime Text, etc.
• Cyber Security Tools: Nmap, Zmap, Angry IP Scanner, Nessus, OpenVAS, Qualys, Burp Suite, OWASP ZAP, SQLmap, Metasploit, BeEF, John the Ripper, Hashcat, Hydra, Aircrack-ng, Kismet, Wireshark, Autopsy, Volatility, IDA Pro, theHarvester, Maltego, Recon-ng, OSINT Framework etc.
• Certifications: Certified Ethical Hacker(CEH), Certified CCNA practitioner by Ethical Learner, Certification in Ethical Hacking by Cisco, Certification in fundamentals of information security by Infosys, CSS, Bootstrap, Python certification by Udemy, Introduction to Quantum Computing with Qiskit from IBM, Ethical Hacking: Hacker Methodology from Udemy.
• ACHIEVEMENTS: Attended a Cyber Security and ethical Hacking Workshop at IIT Roorkee, Achieved 1st Position at the District Badminton Tournament for 5 consecutive years, Played till Quarter-Finals in State tournaments and participated in All-India Senior Ranking Badminton Tournament, Achieved a career-high ranking of AIR-63 in the Women's Singles category under the Badminton Association of India (BAI), Completed a Professional Degree (Prabhakar) in Kathak along with the school curriculum.

CONTACT
Portfolio: [Your Portfolio URL]
LinkedIn: [Your LinkedIn Profile]
GitHub: [Your GitHub Profile]
    `;

    // Create and download the file
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Vaani_Sharma_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Add event listener to download CV button
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
    
    // Add download CV functionality
    const downloadCVBtn = document.querySelector('.btn-secondary');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', downloadCV);
    }
});