// Authentication and Profile Management
class ProfileManager {
    constructor() {
        this.currentUser = null;
        this.isEditing = false;
        this.init();
    }

    init() {
        // Check if user is logged in
        this.loadCurrentUser();
        
        if (!this.currentUser) {
            this.showLoginRequired();
            return;
        }

        this.setupEventListeners();
        this.loadProfileData();
        this.loadSavedItems();
        this.updateNavigation();
    }

    // Load current user from localStorage
    loadCurrentUser() {
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            this.currentUser = users.find(u => u.id === currentUserId);
        }
    }

    // Show login required message
    showLoginRequired() {
        document.getElementById('loginRequired').style.display = 'flex';
        document.getElementById('profileContent').style.display = 'none';
        
        // Hide user menu in navigation
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.style.display = 'none';
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Edit button
        document.getElementById('editBtn').addEventListener('click', () => this.enableEdit());
        
        // Save button
        document.getElementById('saveBtn').addEventListener('click', () => this.saveProfile());
        
        // Cancel button
        document.getElementById('cancelBtn').addEventListener('click', () => this.cancelEdit());
        
        // Logout buttons
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        document.getElementById('headerLogoutBtn').addEventListener('click', () => this.logout());
        
        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });
        }

        // User dropdown
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');
        if (userMenuBtn) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
                userMenuBtn.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                userDropdown.classList.remove('show');
                userMenuBtn.classList.remove('active');
            });

            userDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    // Update navigation with user info
    updateNavigation() {
        const userName = this.currentUser.name || 'User';
        const userEmail = this.currentUser.email || '';
        const initial = userName.charAt(0).toUpperCase();

        // Update user button
        document.getElementById('userName').textContent = userName;
        document.getElementById('userInitial').textContent = initial;

        // Update dropdown
        document.getElementById('dropdownName').textContent = userName;
        document.getElementById('dropdownEmail').textContent = userEmail;
    }

    // Load profile data into form
    loadProfileData() {
        const user = this.currentUser;

        // Header
        document.getElementById('profileHeaderName').textContent = user.name || 'User Name';
        document.getElementById('profileHeaderEmail').textContent = user.email || '';
        document.getElementById('profileInitial').textContent = (user.name || 'U').charAt(0).toUpperCase();

        // Form inputs
        document.getElementById('inputName').value = user.name || '';
        document.getElementById('inputPhone').value = user.phone || '';
        document.getElementById('inputCountry').value = user.country || '';
        document.getElementById('inputDOB').value = user.dateOfBirth || '';
        document.getElementById('inputEducation').value = user.education || '';
        document.getElementById('inputTargetDegree').value = user.targetDegree || '';

        // Display values
        document.getElementById('displayName').textContent = user.name || '';
        document.getElementById('displayEmail').textContent = user.email || '';
        document.getElementById('displayPhone').textContent = user.phone || '';
        document.getElementById('displayCountry').textContent = user.country || '';
        document.getElementById('displayDOB').textContent = this.formatDate(user.dateOfBirth) || '';
        document.getElementById('displayEducation').textContent = user.education || '';
        document.getElementById('displayTargetDegree').textContent = user.targetDegree || '';
    }

    // Load saved items
    loadSavedItems() {
        const scholarships = this.currentUser.savedScholarships || [];
        const universities = this.currentUser.savedUniversities || [];

        // Update counts
        document.getElementById('scholarshipCount').textContent = scholarships.length;
        document.getElementById('universityCount').textContent = universities.length;

        // Display saved scholarships
        if (scholarships.length > 0) {
            const scholarshipsList = document.getElementById('savedScholarshipsList');
            scholarshipsList.innerHTML = scholarships.map((scholarship, index) => `
                <div class="saved-item scholarship" style="animation-delay: ${index * 0.1}s">
                    ${scholarship}
                </div>
            `).join('');
            document.getElementById('savedScholarshipsCard').style.display = 'block';
        }

        // Display saved universities
        if (universities.length > 0) {
            const universitiesList = document.getElementById('savedUniversitiesList');
            universitiesList.innerHTML = universities.map((university, index) => `
                <div class="saved-item university" style="animation-delay: ${index * 0.1}s">
                    ${university}
                </div>
            `).join('');
            document.getElementById('savedUniversitiesCard').style.display = 'block';
        }
    }

    // Enable edit mode
    enableEdit() {
        this.isEditing = true;
        const form = document.getElementById('profileForm');
        form.classList.add('editing');

        // Show/hide buttons
        document.getElementById('editBtn').style.display = 'none';
        document.getElementById('editControls').style.display = 'flex';

        // Enable inputs
        document.getElementById('inputName').disabled = false;
        document.getElementById('inputPhone').disabled = false;
        document.getElementById('inputCountry').disabled = false;
        document.getElementById('inputDOB').disabled = false;
        document.getElementById('inputEducation').disabled = false;
        document.getElementById('inputTargetDegree').disabled = false;
    }

    // Cancel edit mode
    cancelEdit() {
        this.isEditing = false;
        const form = document.getElementById('profileForm');
        form.classList.remove('editing');

        // Show/hide buttons
        document.getElementById('editBtn').style.display = 'inline-flex';
        document.getElementById('editControls').style.display = 'none';

        // Disable inputs
        document.getElementById('inputName').disabled = true;
        document.getElementById('inputPhone').disabled = true;
        document.getElementById('inputCountry').disabled = true;
        document.getElementById('inputDOB').disabled = true;
        document.getElementById('inputEducation').disabled = true;
        document.getElementById('inputTargetDegree').disabled = true;

        // Reload original data
        this.loadProfileData();
    }

    // Save profile changes
    saveProfile() {
        // Get updated values
        const updatedUser = {
            ...this.currentUser,
            name: document.getElementById('inputName').value,
            phone: document.getElementById('inputPhone').value,
            country: document.getElementById('inputCountry').value,
            dateOfBirth: document.getElementById('inputDOB').value,
            education: document.getElementById('inputEducation').value,
            targetDegree: document.getElementById('inputTargetDegree').value,
        };

        // Update in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
            this.currentUser = updatedUser;
        }

        // Exit edit mode
        this.cancelEdit();

        // Reload data
        this.loadProfileData();
        this.updateNavigation();

        // Show success message
        this.showNotification('Profile updated successfully!', 'success');
    }

    // Logout user
    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('currentUserId');
            window.location.href = 'login.html';
        }
    }

    // Format date for display
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Initialize profile manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
});
