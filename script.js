// BetaStore - Modern JavaScript for Enhanced UX

class BetaStoreApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.initModals();
        this.initScrollEffects();
        this.initSearchFunctionality();
        this.initProductCards();
        this.initCarousel();
        this.initDiscoveridesPage();
        this.initAboutPage();
    }

    setupEventListeners() {
        // Modal triggers
        document.getElementById('loginBtn')?.addEventListener('click', () => this.showModal('signupModal'));
        document.getElementById('registerBtn')?.addEventListener('click', () => this.showModal('loginModal'));
        document.getElementById('register1Btn')?.addEventListener('click', () => {
            this.closeModal('signupModal');
            this.showModal('loginModal');
        });
        document.getElementById('login1Btn')?.addEventListener('click', () => {
            this.closeModal('loginModal');
            this.showModal('signupModal');
        });

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Search functionality
        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSearch();
            });
        }

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart, .btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleAddToCart(btn);
            });
        });
    }

    initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.card, .step, .fade-in, .product-card').forEach(el => {
            observer.observe(el);
        });
    }

    initModals() {
        // Enhanced modal functionality
        document.querySelectorAll('.modal').forEach(modal => {
            // Add backdrop blur effect
            modal.addEventListener('show.bs.modal', () => {
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = '15px';
            });

            modal.addEventListener('hidden.bs.modal', () => {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            });
        });
    }

    initScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector("header");
        const returnBtn = document.getElementById('return');

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Header hide/show effect
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                header.style.top = "-90px";
            } else {
                header.style.top = "0";
            }

            // Return to top button
            if (returnBtn) {
                if (currentScroll > 300) {
                    returnBtn.style.opacity = '1';
                    returnBtn.style.visibility = 'visible';
                } else {
                    returnBtn.style.opacity = '0';
                    returnBtn.style.visibility = 'hidden';
                }
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });

        // Return to top functionality
        if (returnBtn) {
            returnBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    initSearchFunctionality() {
        const searchInput = document.getElementById('search');
        if (searchInput) {
            let searchTimeout;

            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });

            // Add search suggestions
            searchInput.addEventListener('focus', () => {
                this.showSearchSuggestions();
            });
        }
    }

    initProductCards() {
        // Enhanced product card interactions
        document.querySelectorAll('.product-card, .card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });

            // Add to cart animation
            const addToCartBtn = card.querySelector('.add-to-cart, .btn-primary');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.animateAddToCart(addToCartBtn);
                });
            }
        });

        // Category cards interactions
        this.initCategoryCards();
    }

    initCategoryCards() {
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                this.handleCategoryClick(category, card);
            });

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });

            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    initDiscoveridesPage() {
        // Gestion des filtres des catégories
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('[data-category]');

        // Vérifier que les éléments existent
        if (!filterButtons.length || !productCards.length) {
            console.log('Elements de filtrage non trouvés');
            return;
        }

        // S'assurer que tous les boutons restent visibles
        filterButtons.forEach(btn => {
            btn.style.display = 'flex';
            btn.style.visibility = 'visible';
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const category = button.getAttribute('data-category');

                // S'assurer que tous les boutons restent visibles après chaque clic
                filterButtons.forEach(btn => {
                    btn.style.display = 'flex';
                    btn.style.visibility = 'visible';
                });

                // Gestion spéciale pour "Tous les produits"
                if (category === 'all') {
                    // Si on clique sur "Tous les produits", désactiver tous les autres filtres
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Retirer la classe active de tous les boutons
                    filterButtons.forEach(btn => btn.classList.remove('active'));

                    // Ajouter la classe active au bouton cliqué
                    this.classList.add('active');

                    // Afficher tous les produits
                    productCards.forEach(card => {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.4s ease-out';
                    });
                } else {
                    // Retirer la classe active du bouton "Tous les produits"
                    const allButton = document.querySelector('[data-category="all"]');
                    if (allButton) {
                        allButton.classList.remove('active');
                    }

                    // Toggle la catégorie sélectionnée
                    this.classList.toggle('active');

                    // Vérifier quelles catégories sont actives
                    const activeButtons = document.querySelectorAll('.filter-btn.active:not([data-category="all"])');

                    // Si aucune catégorie n'est sélectionnée, réactiver "Tous les produits"
                    if (activeButtons.length === 0) {
                        if (allButton) {
                            allButton.classList.add('active');
                        }
                        productCards.forEach(card => {
                            card.style.display = 'block';
                            card.style.animation = 'fadeInUp 0.4s ease-out';
                        });
                    } else {
                        // Collecter toutes les catégories actives
                        const activeCategories = Array.from(activeButtons).map(btn =>
                            btn.getAttribute('data-category')
                        );

                        // Filtrer les produits
                        productCards.forEach(card => {
                            const cardCategory = card.getAttribute('data-category');
                            const shouldShow = activeCategories.includes(cardCategory);

                            if (shouldShow) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }

                    // Filtrer les produits selon la catégorie sélectionnée
                    productCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');

                        if (cardCategory === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }

                // Notification de filtrage
                const activeButtons = document.querySelectorAll('.filter-btn.active');
                const categoryNames = Array.from(activeButtons).map(btn => {
                    const cat = btn.getAttribute('data-category');
                    return cat === 'all' ? 'Tous les produits' : cat;
                }).join(', ');

                this.showNotification(`Filtrage par catégorie: ${categoryNames}`, 'info');
                const categoryName = category === 'all' ? 'Tous les produits' : category;
                this.showNotification(`Affichage des produits: ${categoryName}`, 'info');
            });
        });

        // Animation des cartes produits au scroll
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

        productCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            observer.observe(card);
        });

        // Gestion des boutons d'action sur les produits
        document.querySelectorAll('.add-to-cart, .btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleAddToCart(btn);
            });
        });

        // Gestion des boutons de favoris
        document.querySelectorAll('.btn-outline-light').forEach(btn => {
            if (btn.querySelector('.bx-heart')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleAddToFavorites(btn);
                });
            }
        });

        // Gestion des boutons de la section hero
        const viewAllBtn = document.getElementById('viewAllProducts');
        const popularBtn = document.getElementById('popularProducts');

        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                // Afficher tous les produits
                filterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-category="all"]').classList.add('active');

                productCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                });
            });
        }

        if (popularBtn) {
            popularBtn.addEventListener('click', () => {
                // Filtrer les produits populaires (avec badge)
                productCards.forEach(card => {
                    const hasBadge = card.querySelector('.product-badge');
                    if (hasBadge) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.6s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });

                this.showNotification('Affichage des produits populaires', 'info');
            });
        }
    }

    handleCategoryClick(category, card) {
        // Add click animation
        card.style.transform = 'translateY(-8px) scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'translateY(-8px) scale(1)';
        }, 150);

        // Show loading state
        this.showNotification(`Chargement de la catégorie ${category}...`, 'info');

        // Simulate navigation to category page
        setTimeout(() => {
            // Navigate to category page (you can customize this)
            window.location.href = `discoverides.html?category=${category}`;
        }, 1000);
    }

    initCarousel() {
        // Enhanced carousel functionality
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            // Auto-play with pause on hover
            carousel.addEventListener('mouseenter', () => {
                const bsCarousel = new bootstrap.Carousel(carousel, {
                    interval: 5000,
                    pause: 'hover'
                });
            });
        });

        // Modern products carousel
        this.initProductsCarousel();
    }

    initProductsCarousel() {
        const carousel = document.getElementById('productsCarousel');
        const prevBtn = document.getElementById('prevProducts');
        const nextBtn = document.getElementById('nextProducts');
        const viewAllBtn = document.getElementById('viewAllProducts');

        if (!carousel || !nextBtn || !prevBtn) return;

        let currentIndex = 0;
        const cardWidth = 280 + 24; // card width + gap
        const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
        const totalCards = carousel.children.length;
        const maxIndex = Math.max(0, totalCards - visibleCards);

        // Function to update carousel position
        const updateCarousel = () => {
            const translateX = -currentIndex * cardWidth;
            carousel.style.transform = `translateX(${translateX}px)`;

            // Update button states
            prevBtn.disabled = currentIndex <= 0;
            nextBtn.disabled = currentIndex >= maxIndex;

            // Visual feedback for disabled state
            prevBtn.style.opacity = currentIndex <= 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        };

        // Previous button click handler
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();

                // Add smooth animation
                carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

                // Reset transition after animation
                setTimeout(() => {
                    carousel.style.transition = '';
                }, 500);
            }
        });

        // Next button click handler
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();

                // Add smooth animation
                carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

                // Reset transition after animation
                setTimeout(() => {
                    carousel.style.transition = '';
                }, 500);
            }
        });

        // View all products button
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                // Navigate to products page
                window.location.href = 'discoverides.html';
            });
        }

        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            const translateX = -currentIndex * cardWidth + diff;
            carousel.style.transform = `translateX(${translateX}px)`;
        });

        carousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = currentX - startX;
            const threshold = cardWidth / 3;

            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentIndex > 0) {
                    currentIndex--;
                } else if (diff < 0 && currentIndex < maxIndex) {
                    currentIndex++;
                }
            }

            updateCarousel();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Initialize carousel
        updateCarousel();

        // Handle window resize
        window.addEventListener('resize', () => {
            const newVisibleCards = Math.floor(carousel.offsetWidth / cardWidth);
            const newMaxIndex = Math.max(0, totalCards - newVisibleCards);

            if (currentIndex > newMaxIndex) {
                currentIndex = newMaxIndex;
            }

            updateCarousel();
        });
    }

    

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    handleSearch() {
        const searchInput = document.getElementById('search');
        const query = searchInput?.value.trim();

        if (query) {
            // Show loading state
            this.showLoadingState();

            // Simulate search (replace with actual search logic)
            setTimeout(() => {
                this.hideLoadingState();
                this.showSearchResults(query);
            }, 1000);
        }
    }

    performSearch(query) {
        // Implement actual search logic here
        console.log('Searching for:', query);
    }

    showSearchSuggestions() {
        // Implement search suggestions
        const suggestions = ['Termos', 'Console de jeux', 'Meuble', 'Moulinexe'];
        // Create and show suggestions dropdown
    }

    handleAddToCart(button) {
        // Animate button
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        // Show success message
        this.showNotification('Produit ajouté au panier !', 'success');

        // Update cart count
        this.updateCartCount();
    }

    animateAddToCart(button) {
        // Create flying animation
        const rect = button.getBoundingClientRect();
        const cartIcon = document.querySelector('.bxs-cart');

        if (cartIcon) {
            const flyingElement = document.createElement('div');
            flyingElement.innerHTML = '🛒';
            flyingElement.style.cssText = `
                position: fixed;
                top: ${rect.top}px;
                left: ${rect.left}px;
                z-index: 9999;
                font-size: 20px;
                pointer-events: none;
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            `;

            document.body.appendChild(flyingElement);

            setTimeout(() => {
                const cartRect = cartIcon.getBoundingClientRect();
                flyingElement.style.top = `${cartRect.top}px`;
                flyingElement.style.left = `${cartRect.left}px`;
                flyingElement.style.transform = 'scale(0.5)';
                flyingElement.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                document.body.removeChild(flyingElement);
                this.updateCartCount();
            }, 800);
        }
    }

    updateCartCount() {
        const cartBadge = document.querySelector('.badge');
        if (cartBadge) {
            const currentCount = parseInt(cartBadge.textContent) || 0;
            cartBadge.textContent = currentCount + 1;
            cartBadge.style.animation = 'pulse 0.5s ease-in-out';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-info-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showLoadingState() {
        // Implement loading state
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.disabled = true;
            searchInput.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3E%3Cpath fill=\'%23999\' d=\'M10 3.5a6.5 6.5 0 0 1 6.5 6.5h-2a4.5 4.5 0 0 0-4.5-4.5V3.5z\'/%3E%3C/svg%3E")';
            searchInput.style.backgroundRepeat = 'no-repeat';
            searchInput.style.backgroundPosition = 'right 10px center';
        }
    }

    hideLoadingState() {
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.disabled = false;
            searchInput.style.backgroundImage = '';
        }
    }

    showSearchResults(query) {
        // Implement search results display
        console.log('Showing results for:', query);
    }

    handleAddToFavorites(button) {
        const icon = button.querySelector('.bx-heart');
        if (icon) {
            if (icon.classList.contains('bxs-heart')) {
                icon.classList.remove('bxs-heart');
                icon.classList.add('bx-heart');
                this.showNotification('Retiré des favoris', 'info');
            } else {
                icon.classList.remove('bx-heart');
                icon.classList.add('bxs-heart');
                this.showNotification('Ajouté aux favoris', 'success');
            }
        }
    }

    initAboutPage() {
        // Animation des statistiques
        const statNumbers = document.querySelectorAll('.stat-number');

        if (statNumbers.length > 0) {
            const animateStats = () => {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const increment = target / 100;
                    let current = 0;

                    const updateStat = () => {
                        if (current < target) {
                            current += increment;
                            stat.textContent = Math.ceil(current);
                            requestAnimationFrame(updateStat);
                        } else {
                            stat.textContent = target;
                        }
                    };

                    updateStat();
                });
            };

            // Observer pour déclencher l'animation au scroll
            const statsSection = document.querySelector('.stats-section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            });

            if (statsSection) {
                observer.observe(statsSection);
            }
        }

        // Animation des cartes au scroll
        const cards = document.querySelectorAll('.value-card, .team-card, .commitment-card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            cardObserver.observe(card);
        });

        // Animation de la timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            timelineObserver.observe(item);
        });

        // Gestion des liens de navigation
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BetaStoreApp();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal.show {
        animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .card, .product-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn {
        transition: all 0.2s ease;
    }
    
    .btn:active {
        transform: scale(0.95);
    }
    
    .filters-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        align-items: center;
    }
    
    .filter-btn {
        min-width: 140px;
        height: 48px;
        padding: 12px 24px;
        font-size: 0.9rem;
        font-weight: 600;
        border-radius: 25px;
        border: 2px solid transparent;
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .filter-btn:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }
    
    .filter-btn.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .filter-btn.active::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: inherit;
        z-index: -1;
        opacity: 0.3;
    }
`;
document.head.appendChild(style); 