let isScrolling = false; // Flag para controlar se já há um scroll sendo processado

function updateHeroEffects() {
    const scrollPosition = window.pageYOffset; // Pega a posição atual do scroll
    const heroSection = document.querySelector('.hero-section'); // Seleciona a seção hero
    const heroBg = document.querySelector('.hero-bg'); // Seleciona o background da hero
    const heroContent = document.querySelector('.hero-content'); // Seleciona o conteúdo da hero
    
    const heroHeight = heroSection.offsetHeight; // Altura total da seção hero
    const scrollProgress = Math.min(scrollPosition / heroHeight, 1); // Progresso do scroll entre 0 e 1
    
    const scale = 1 + (scrollProgress * 0.3); // Calcula zoom da imagem (1 a 1.3)
    const blur = scrollProgress * 8; // Calcula desfoque da imagem (0 a 8px)
    
    heroBg.style.transform = `translate(-50%, -50%) scale(${scale})`; // Aplica zoom
    heroBg.style.filter = `blur(${blur}px) brightness(0.6)`; // Aplica desfoque e brilho
    
    const opacity = 1 - (scrollProgress * 1.2); // Calcula opacidade do conteúdo (fade out)
    heroContent.style.opacity = Math.max(opacity, 0); // Limita opacidade mínima a 0
    heroContent.style.transform = `translateY(${scrollProgress * 30}px)`; // Move o conteúdo para baixo conforme scroll
    
    isScrolling = false; // Reseta flag de scroll
}

function handleScroll() {
    if (!isScrolling) { // Verifica se não está processando scroll
        requestAnimationFrame(updateHeroEffects); // Atualiza efeitos na próxima animação
        isScrolling = true; // Seta flag para evitar múltiplas chamadas
    }
}

// ===== ANIMAÇÕES DE ELEMENTOS =====
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Verifica se o elemento entrou na tela
                entry.target.classList.add('visible'); // Adiciona classe para animar
            }
        });
    }, {
        threshold: 0.1, // Quando 10% do elemento estiver visível
        rootMargin: '0px 0px -50px 0px' // Margem para ativar animação antes de sair da tela
    });

    document.querySelectorAll('.journey-item').forEach(item => {
        observer.observe(item); // Observa cada item da jornada
    });

    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item); // Observa cada item da galeria
    });

    document.querySelectorAll('.barber-card').forEach(card => {
        observer.observe(card); // Observa cada card de barbeiro
    });
}

// ===== SCROLL SUAVE PARA INDICADOR =====
function setupSmoothScroll() {
    const scrollDown = document.querySelector('.scroll-down'); // Seleciona o botão de scroll
    scrollDown.addEventListener('click', () => {
        document.querySelector('.journey-section').scrollIntoView({
            behavior: 'smooth' // Scroll suave até a seção
        });
    });
}

// ===== INICIALIZAÇÃO =====
window.addEventListener('scroll', handleScroll, { passive: true }); // Evento scroll para atualizar hero

document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimations(); // Configura animações de elementos
    setupSmoothScroll(); // Configura scroll suave
    updateHeroEffects(); // Inicializa efeitos da hero na carga da página
});
