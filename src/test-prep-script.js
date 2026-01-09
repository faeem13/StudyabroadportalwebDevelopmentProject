// Test Prep Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const testCards = document.querySelectorAll('.test-card');
    
    // Expand first test by default
    if (testCards.length > 0) {
        testCards[0].classList.add('expanded');
    }
    
    testCards.forEach((card, index) => {
        const header = card.querySelector('.test-header');
        
        header.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            
            // Close all cards
            testCards.forEach(c => c.classList.remove('expanded'));
            
            // Toggle current card
            if (!isExpanded) {
                card.classList.add('expanded');
            }
        });
    });
});
