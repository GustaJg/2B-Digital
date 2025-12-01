document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    // 1. Efeito na Navbar ao rolar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);

    // 2. Smooth Scroll para links da página
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Ignora links vazios ou links do rodapé
            if (href === '#' || this.closest('.footer-links')) return;

            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Rola compensando a navbar
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Lógica dos Modais (Termos e Privacidade)
    const policyLinks = document.querySelectorAll('.footer-links a');
    const closeButtons = document.querySelectorAll('.modal-close');

    // ABRIR
    policyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);

            if (targetModal) {
                targetModal.classList.remove('hidden'); // Garante que display: none saia
                // Pequeno delay para permitir a transição de opacidade
                setTimeout(() => {
                    targetModal.classList.add('active');
                }, 10);
                
                body.style.overflow = 'hidden'; // Trava a rolagem
            }
        });
    });

    // FECHAR
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = this.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                // Espera a transição de opacidade terminar antes de dar display: none
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 300);
                
                body.style.overflow = 'auto'; // Destrava a rolagem
            }
        });
    });
});