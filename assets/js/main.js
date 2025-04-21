// Menu Mobile e Chatbot
document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburguer
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Chatbot Toggle
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const chatbotContainer = document.getElementById('chatbot-ia');
    const closeChatbot = document.getElementById('close-chatbot');

    chatbotTrigger.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        chatbotTrigger.style.display = 'none'; // Esconde o botão de trigger quando o chat abre
    });

    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        chatbotTrigger.style.display = 'flex'; // Mostra o botão de trigger quando o chat fecha
    });

    // Inicializa o chatbot
    new BioReactorChatbot();
});

// JavaScript para o menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        
        // Bloqueia/libera o scroll da página quando o menu está aberto
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

/// Contador animado com Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    const speed = 600; // Velocidade da animação (quanto menor, mais rápido)
    let animationStarted = false;

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('+', '');
        const increment = target / speed;
        
        if(count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target + '+';
        }
    }

    function startCounters() {
        if (!animationStarted) {
            counters.forEach(counter => {
                counter.innerText = '0'; // Reset para garantir animação
                animateCounter(counter);
            });
            animationStarted = true;
        }
    }

    // Configuração do Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.100 // Quando 50% da seção estiver visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target); // Para de observar após acionar
            }
        });
    }, observerOptions);

    // Observa a seção about
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Fallback para navegadores antigos
    if (!('IntersectionObserver' in window)) {
        startCounters(); // Executa imediatamente se não suportado
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.partners-grid');
    const cards = document.querySelectorAll('.partner-card');
    
    // Duplica os cards apenas se houver elementos
    if (cards.length > 0) {
        // Duplica todos os cards
        const clones = Array.from(cards).map(card => card.cloneNode(true));
        clones.forEach(clone => carousel.appendChild(clone));
        
        // Configura o observer para otimizar performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(carousel);
    }
});

document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
});

// Galeria de Cases
document.querySelectorAll('[href="#polimento-details"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('cases-modal').classList.add('active');
    });
});

// Fechar modal
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('cases-modal').classList.remove('active');
});

// Controles do carrossel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

document.querySelector('.carousel-next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Fechar ao clicar fora
document.getElementById('cases-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});
