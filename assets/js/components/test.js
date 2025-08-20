// ===== CONTROLE DOS EFEITOS DE SCROLL =====
        let isScrolling = false;

        function updateHeroEffects() {
            const scrollPosition = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            const heroBg = document.querySelector('.hero-bg');
            const heroContent = document.querySelector('.hero-content');
            
            // Altura da seção hero
            const heroHeight = heroSection.offsetHeight;
            
            // Progresso do scroll (0 a 1)
            const scrollProgress = Math.min(scrollPosition / heroHeight, 1);
            
            // Efeito de zoom na imagem (1 a 1.3)
            const scale = 1 + (scrollProgress * 0.3);
            
            // Efeito de desfoque (0 a 8px)
            const blur = scrollProgress * 8;
            
            // Aplica os efeitos
            heroBg.style.transform = `translate(-50%, -50%) scale(${scale})`;
            heroBg.style.filter = `blur(${blur}px) brightness(0.6)`;
            
            // Fade do conteúdo
            const opacity = 1 - (scrollProgress * 1.2);
            heroContent.style.opacity = Math.max(opacity, 0);
            heroContent.style.transform = `translateY(${scrollProgress * 30}px)`;
            
            isScrolling = false;
        }

        function handleScroll() {
            if (!isScrolling) {
                requestAnimationFrame(updateHeroEffects);
                isScrolling = true;
            }
        }

        // ===== ANIMAÇÕES DOS ELEMENTOS =====
        function setupScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observa elementos da jornada
            document.querySelectorAll('.journey-item').forEach(item => {
                observer.observe(item);
            });

            // Observa elementos da galeria
            document.querySelectorAll('.gallery-item').forEach(item => {
                observer.observe(item);
            });

            // Observa cards dos barbeiros
            document.querySelectorAll('.barber-card').forEach(card => {
                observer.observe(card);
            });
        }

        // ===== SCROLL SUAVE PARA O INDICADOR =====
        function setupSmoothScroll() {
            const scrollDown = document.querySelector('.scroll-down');
            scrollDown.addEventListener('click', () => {
                document.querySelector('.journey-section').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }

        // ===== INICIALIZAÇÃO =====
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        document.addEventListener('DOMContentLoaded', () => {
            setupScrollAnimations();
            setupSmoothScroll();
            updateHeroEffects(); // Inicializa os efeitos
        });