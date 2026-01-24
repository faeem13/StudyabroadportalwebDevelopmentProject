# Authentication System - HTML Version

## Overview
This is a complete authentication and user profile system for the Study Abroad Portal HTML version. It uses localStorage to simulate database operations and can be easily integrated with a MySQL backend later.

## Files Created

### 1. Login Page
- **login.html** - Login and signup forms
- **login.css** - Styling for authentication pages
- **login.js** - Authentication logic

### 2. Profile Page
- **profile.html** - User profile and dashboard
- **profile.css** - Profile page styling
- **profile.js** - Profile management logic

## Features

### Authentication (login.html)
✅ **User Login**
- Email and password authentication
- Form validation
- Error handling
- Loading states

✅ **User Signup**
- Create new account
- Email uniqueness validation
- Password strength requirement (min 6 characters)
- Auto-login after signup

✅ **User Experience**
- Animated form transitions
- Beautiful gradient branding section
- Responsive design
- Demo account included for testing

### User Profile (profile.html)
✅ **Profile Management**
- View and edit personal information
- Editable fields: Name, Phone, Country, Date of Birth, Education, Target Degree
- Edit mode with save/cancel functionality
- Success notifications

✅ **Dashboard**
- Activity stats (saved scholarships and universities count)
- List of saved scholarships
- List of saved universities
- Beautiful card-based layout

✅ **Navigation**
- User dropdown menu
- Logout functionality
- Login required protection
- Responsive mobile menu

## How to Use

### For Users

1. **First Time Visit**
   ```
   - Go to login.html
   - Click "Sign Up"
   - Fill in your details
   - Click "Sign Up"
   - You'll be redirected to your profile
   ```

2. **Returning Users**
   ```
   - Go to login.html
   - Enter your email and password
   - Click "Sign In"
   - Access your profile and saved items
   ```

3. **Demo Account** (for testing)
   ```
   Email: demo@example.com
   Password: demo123
   ```

### For Developers

#### Data Structure (localStorage)

```javascript
// Users array
localStorage.getItem('users')
[
  {
    id: "1704123456789",
    email: "user@example.com",
    name: "John Doe",
    phone: "+1 234-567-8900",
    country: "United States",
    dateOfBirth: "2000-01-15",
    education: "Bachelor's",
    targetDegree: "Master's",
    savedScholarships: ["Fulbright...", "Chevening..."],
    savedUniversities: ["MIT", "Stanford"],
    createdAt: "2024-01-01T00:00:00.000Z"
  }
]

// Passwords object (separate for security)
localStorage.getItem('passwords')
{
  "1704123456789": "password123"
}

// Current logged-in user
localStorage.getItem('currentUserId')
"1704123456789"
```

#### Key Functions

**login.js**
```javascript
// Check if user is logged in
checkIfAlreadyLoggedIn()

// Handle login
handleLogin() 

// Handle signup
handleSignup()

// Show/hide forms
showLogin()
showSignup()
```

**profile.js**
```javascript
// Load user data
loadCurrentUser()
loadProfileData()
loadSavedItems()

// Edit profile
enableEdit()
saveProfile()
cancelEdit()

// Logout
logout()
```

## Integration with Other Pages

### Add Login Button to Navigation

Update your existing HTML pages (index.html, scholarships.html, etc.) to include login/profile functionality:

```html
<!-- In your navigation -->
<div class="nav-links">
  <a href="index.html">Home</a>
  <!-- ... other links ... -->
  
  <!-- Add this user menu section -->
  <div class="user-menu" id="userMenu">
    <!-- If logged in -->
    <div class="user-logged-in" id="userLoggedIn" style="display: none;">
      <button class="user-btn" onclick="window.location.href='profile.html'">
        <span id="navUserName">User</span>
      </button>
    </div>
    
    <!-- If not logged in -->
    <div class="user-logged-out" id="userLoggedOut">
      <a href="login.html" class="btn-login">Login</a>
    </div>
  </div>
</div>
```

### Add this script to check login status:
```javascript
// Check if user is logged in
const currentUserId = localStorage.getItem('currentUserId');
if (currentUserId) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.id === currentUserId);
  
  if (user) {
    document.getElementById('userLoggedOut').style.display = 'none';
    document.getElementById('userLoggedIn').style.display = 'block';
    document.getElementById('navUserName').textContent = user.name;
  }
}
```

## Save Functionality Integration

### Update scholarships.html and universities.html

Add this function to save items to user profile:

```javascript
function saveItem(itemName, type) {
  // Check if user is logged in
  const currentUserId = localStorage.getItem('currentUserId');
  
  if (!currentUserId) {
    alert('Please log in to save items');
    window.location.href = 'login.html';
    return;
  }
  
  // Get users
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex(u => u.id === currentUserId);
  
  if (userIndex === -1) return;
  
  // Add to saved items
  const arrayKey = type === 'scholarship' ? 'savedScholarships' : 'savedUniversities';
  
  if (!users[userIndex][arrayKey].includes(itemName)) {
    users[userIndex][arrayKey].push(itemName);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Item saved successfully!');
  } else {
    alert('Item already saved!');
  }
}

// Usage in your HTML
<button onclick="saveItem('Fulbright Program', 'scholarship')">
  Save Scholarship
</button>
```

## Security Notes

⚠️ **Important**: This implementation uses localStorage which is NOT secure for production use with real user data.

### For Production (MySQL Integration):

1. **Never store passwords in plain text**
   - Use bcrypt or similar hashing algorithm
   - Hash passwords on the server side

2. **Use HTTPS**
   - All authentication must happen over HTTPS

3. **Implement JWT or Session Tokens**
   - Don't store user ID in localStorage
   - Use secure, httpOnly cookies or JWT tokens

4. **Server-side validation**
   - Always validate on the server
   - Never trust client-side data

5. **Rate limiting**
   - Prevent brute force attacks
   - Limit login attempts

### Migration to MySQL

See `/MYSQL_INTEGRATION_GUIDE.md` for complete instructions on connecting to a MySQL database.

## Customization

### Change Color Scheme
Edit the CSS variables in `login.css` and `profile.css`:

```css
/* Primary gradient */
background: linear-gradient(135deg, #3b82f6, #8b5cf6);

/* Change to your colors */
background: linear-gradient(135deg, #yourColor1, #yourColor2);
```

### Add More Profile Fields
1. Add input in `profile.html`
2. Add to user object in `login.js` signup
3. Add save/load logic in `profile.js`

### Change Password Requirements
In `login.js`:
```javascript
if (password.length < 6) {  // Change minimum length
  this.showError(errorEl, 'Password must be at least 6 characters');
  return;
}
```

## Browser Compatibility

✅ Chrome, Firefox, Safari, Edge (latest versions)
✅ Mobile browsers (iOS Safari, Chrome Mobile)
✅ Responsive design for all screen sizes

## Testing

### Test Login Flow
1. Open `login.html`
2. Try demo account: demo@example.com / demo123
3. Verify redirect to profile
4. Check if data persists on refresh

### Test Signup Flow
1. Open `login.html`
2. Click "Sign Up"
3. Create new account
4. Verify auto-login and redirect
5. Check localStorage for new user

### Test Profile Editing
1. Log in to profile
2. Click "Edit Profile"
3. Change some fields
4. Click "Save"
5. Refresh page and verify changes persist

### Test Logout
1. From profile page, click "Logout"
2. Confirm logout
3. Verify redirect to login
4. Verify can't access profile without login

## Troubleshooting

### "Please log in to view your profile"
- You're not logged in
- Clear localStorage and try again
- Check if `currentUserId` exists in localStorage

### Profile data not saving
- Check browser console for errors
- Verify localStorage is enabled
- Try clearing localStorage and creating new account

### Can't login with existing account
- Verify email is correct (case-insensitive)
- Check if user exists in localStorage 'users' array
- Verify password matches in 'passwords' object

## Next Steps

1. ✅ Test the authentication flow
2. ✅ Customize colors and branding
3. ⬜ Integrate save buttons in scholarships.html
4. ⬜ Integrate save buttons in universities.html
5. ⬜ Add navigation user menu to all pages
6. ⬜ Set up MySQL database (when ready)
7. ⬜ Create backend API (when ready)
8. ⬜ Replace localStorage with API calls

## Support

For questions or issues:
- Check browser console for errors
- Verify localStorage permissions
- Test with demo account first
- Review code comments for guidance

---

**Version**: 1.0  
**Last Updated**: January 2026  
**Compatible with**: All modern browsers
