// ================================================================
// PROFILE MANAGER - DATABASE CONNECTED
// ================================================================
// Handles user profile management with MySQL database
// ================================================================

class ProfileManager {
    constructor() {
        this.currentUser = null;
        this.isEditing = false;
        this.apiBaseUrl = window.location.origin; // Use current server origin
        this.init();
    }

    async init() {
        console.log('🔄 Initializing profile page...');
        
        // Check if user is logged in
        await this.loadCurrentUser();
        
        if (!this.currentUser) {
            console.log('❌ No user found, showing login required');
            this.showLoginRequired();
            return;
        }

        console.log('✅ User loaded:', this.currentUser);
        
        this.setupEventListeners();
        this.loadProfileData();
        await this.loadSavedItems();
        this.updateNavigation();
        
        console.log('✅ Profile page initialized successfully');
    }

    // Load current user from database
    async loadCurrentUser() {
        const currentUserId = localStorage.getItem('currentUserId');
        
        console.log('📝 Loading user with ID:', currentUserId);
        
        if (!currentUserId) {
            console.log('❌ No user ID in localStorage');
            return;
        }

        try {
            console.log('🌐 Fetching user from API...');
            const response = await fetch(`${this.apiBaseUrl}/api/user/${currentUserId}`);
            const data = await response.json();

            console.log('📥 API Response:', data);

            if (response.ok && data.success) {
                this.currentUser = data.user;
                // Update localStorage cache
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                console.log('✅ User loaded from database');
            } else {
                // User not found in database, clear localStorage
                console.warn('⚠️ User not found in database');
                localStorage.removeItem('currentUserId');
                localStorage.removeItem('currentUser');
            }
        } catch (error) {
            console.error('❌ Error loading user from API:', error);
            // Try to use cached data if available
            const cachedUser = localStorage.getItem('currentUser');
            if (cachedUser) {
                console.log('📦 Using cached user data');
                this.currentUser = JSON.parse(cachedUser);
            } else {
                console.error('❌ No cached user data available');
            }
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
        document.getElementById('inputEducation').value = user.currentEducation || '';
        document.getElementById('inputTargetDegree').value = user.targetDegree || '';

        // Display values
        document.getElementById('displayName').textContent = user.name || '';
        document.getElementById('displayEmail').textContent = user.email || '';
        document.getElementById('displayPhone').textContent = user.phone || 'Not provided';
        document.getElementById('displayCountry').textContent = user.country || 'Not provided';
        document.getElementById('displayDOB').textContent = this.formatDate(user.dateOfBirth) || 'Not provided';
        document.getElementById('displayEducation').textContent = user.currentEducation || 'Not provided';
        document.getElementById('displayTargetDegree').textContent = user.targetDegree || 'Not provided';
    }

    // Load saved items from database
    async loadSavedItems() {
        const userId = this.currentUser.id;

        try {
            // Load saved scholarships
            const scholarshipsResponse = await fetch(`${this.apiBaseUrl}/api/user/${userId}/scholarships`);
            const scholarshipsData = await scholarshipsResponse.json();
            
            // Load saved universities
            const universitiesResponse = await fetch(`${this.apiBaseUrl}/api/user/${userId}/universities`);
            const universitiesData = await universitiesResponse.json();

            const scholarships = scholarshipsData.success ? scholarshipsData.scholarships : [];
            const universities = universitiesData.success ? universitiesData.universities : [];

            // Update counts
            document.getElementById('scholarshipCount').textContent = scholarships.length;
            document.getElementById('universityCount').textContent = universities.length;

            // Display saved scholarships
            if (scholarships.length > 0) {
                const scholarshipsList = document.getElementById('savedScholarshipsList');
                scholarshipsList.innerHTML = scholarships.map((scholarship, index) => `
                    <div class="saved-item scholarship" style="animation-delay: ${index * 0.1}s">
                        <div class="saved-item-header">
                            <h4>${scholarship.scholarship_name}</h4>
                            <button class="remove-btn" onclick="profileManager.removeScholarship(${scholarship.id})" title="Remove">
                                ×
                            </button>
                        </div>
                        <p class="saved-item-details">
                            <span>📍 ${scholarship.country}</span>
                            ${scholarship.amount ? `<span>💰 $${scholarship.amount.toLocaleString()}</span>` : ''}
                            ${scholarship.deadline ? `<span>📅 Deadline: ${this.formatDate(scholarship.deadline)}</span>` : ''}
                        </p>
                        ${scholarship.notes ? `<p class="saved-item-notes">${scholarship.notes}</p>` : ''}
                    </div>
                `).join('');
                document.getElementById('savedScholarshipsCard').style.display = 'block';
            } else {
                document.getElementById('savedScholarshipsCard').style.display = 'none';
            }

            // Display saved universities
            if (universities.length > 0) {
                const universitiesList = document.getElementById('savedUniversitiesList');
                universitiesList.innerHTML = universities.map((university, index) => `
                    <div class="saved-item university" style="animation-delay: ${index * 0.1}s">
                        <div class="saved-item-header">
                            <h4>${university.university_name}</h4>
                            <button class="remove-btn" onclick="profileManager.removeUniversity(${university.id})" title="Remove">
                                ×
                            </button>
                        </div>
                        <p class="saved-item-details">
                            <span>📍 ${university.country}</span>
                            ${university.ranking ? `<span>🏆 Rank #${university.ranking}</span>` : ''}
                            ${university.tuition_fee ? `<span>💰 $${university.tuition_fee.toLocaleString()}/year</span>` : ''}
                        </p>
                        ${university.program ? `<p class="saved-item-program">Program: ${university.program}</p>` : ''}
                        ${university.notes ? `<p class="saved-item-notes">${university.notes}</p>` : ''}
                    </div>
                `).join('');
                document.getElementById('savedUniversitiesCard').style.display = 'block';
            } else {
                document.getElementById('savedUniversitiesCard').style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading saved items:', error);
        }
    }

    // Remove scholarship
    async removeScholarship(scholarshipId) {
        if (!confirm('Are you sure you want to remove this scholarship?')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/api/user/${this.currentUser.id}/scholarships/${scholarshipId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (response.ok && data.success) {
                this.showNotification('Scholarship removed successfully!', 'success');
                await this.loadSavedItems();
            } else {
                this.showNotification('Failed to remove scholarship', 'error');
            }
        } catch (error) {
            console.error('Error removing scholarship:', error);
            this.showNotification('Connection error', 'error');
        }
    }

    // Remove university
    async removeUniversity(universityId) {
        if (!confirm('Are you sure you want to remove this university?')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/api/user/${this.currentUser.id}/universities/${universityId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (response.ok && data.success) {
                this.showNotification('University removed successfully!', 'success');
                await this.loadSavedItems();
            } else {
                this.showNotification('Failed to remove university', 'error');
            }
        } catch (error) {
            console.error('Error removing university:', error);
            this.showNotification('Connection error', 'error');
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

    // Save profile changes to database
    async saveProfile() {
        const saveBtn = document.getElementById('saveBtn');
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';

        // Get updated values
        const updatedData = {
            name: document.getElementById('inputName').value,
            phone: document.getElementById('inputPhone').value,
            country: document.getElementById('inputCountry').value,
            dateOfBirth: document.getElementById('inputDOB').value,
            currentEducation: document.getElementById('inputEducation').value,
            targetDegree: document.getElementById('inputTargetDegree').value,
        };

        try {
            const response = await fetch(`${this.apiBaseUrl}/api/user/${this.currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Update local user data
                this.currentUser = {
                    ...this.currentUser,
                    ...updatedData
                };

                // Update localStorage cache
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

                // Exit edit mode
                this.cancelEdit();

                // Reload data
                this.loadProfileData();
                this.updateNavigation();

                // Show success message
                this.showNotification('Profile updated successfully!', 'success');
            } else {
                this.showNotification('Failed to update profile', 'error');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            this.showNotification('Connection error. Please check if the server is running.', 'error');
        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save Changes';
        }
    }

    // Logout user
    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('currentUserId');
            localStorage.removeItem('currentUser');
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
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            max-width: 350px;
        `;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize profile manager when DOM is loaded
let profileManager;
document.addEventListener('DOMContentLoaded', () => {
    profileManager = new ProfileManager();

    // Console message
    console.log('%c🎓 Study Abroad Portal - Profile Page', 'color: #667eea; font-size: 24px; font-weight: bold;');
    console.log('%c✨ Connected to MySQL Database', 'color: #16a34a; font-size: 16px; font-weight: bold;');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .saved-item {
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 15px;
        animation: slideUp 0.5s ease-out;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .saved-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .saved-item-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 10px;
    }

    .saved-item-header h4 {
        color: #1e293b;
        font-size: 16px;
        margin: 0;
        flex: 1;
    }

    .remove-btn {
        background: #ef4444;
        color: white;
        border: none;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        line-height: 1;
        transition: background 0.2s;
        flex-shrink: 0;
        margin-left: 10px;
    }

    .remove-btn:hover {
        background: #dc2626;
    }

    .saved-item-details {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        font-size: 14px;
        color: #64748b;
        margin-bottom: 8px;
    }

    .saved-item-program,
    .saved-item-notes {
        font-size: 14px;
        color: #475569;
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid #e2e8f0;
    }

    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);