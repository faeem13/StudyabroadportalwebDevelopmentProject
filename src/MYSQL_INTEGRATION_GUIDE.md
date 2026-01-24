# MySQL Database Integration Guide

## Current Implementation

The application currently uses **localStorage** to simulate database operations. This allows you to test all authentication and save functionality without a backend server.

## How to Integrate with MySQL

To connect this application to your MySQL database, you'll need to:

### 1. Create a Backend Server

Create a Node.js/Express backend server to handle database operations:

```bash
mkdir server
cd server
npm init -y
npm install express mysql2 bcrypt jsonwebtoken cors dotenv
```

### 2. Database Schema

Create the following tables in your MySQL database:

```sql
-- Users table
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  date_of_birth DATE,
  education VARCHAR(100),
  target_degree VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Saved scholarships table
CREATE TABLE saved_scholarships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  scholarship_name VARCHAR(500) NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_save (user_id, scholarship_name)
);

-- Saved universities table
CREATE TABLE saved_universities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  university_name VARCHAR(500) NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_save (user_id, university_name)
);
```

### 3. Backend API Endpoints

Create the following API endpoints in your Express server:

#### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Authenticate user and return JWT token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile

#### User Profile
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

#### Saved Items
- `GET /api/users/:id/scholarships` - Get user's saved scholarships
- `POST /api/users/:id/scholarships` - Save a scholarship
- `DELETE /api/users/:id/scholarships/:scholarshipId` - Remove saved scholarship

- `GET /api/users/:id/universities` - Get user's saved universities
- `POST /api/users/:id/universities` - Save a university
- `DELETE /api/users/:id/universities/:universityId` - Remove saved university

### 4. Update Frontend Code

Replace the localStorage calls in `/contexts/AuthContext.tsx` with API calls:

```typescript
// Example: Replace login function
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    
    // Store JWT token
    localStorage.setItem('authToken', data.token);
    
    setUser(data.user);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};
```

### 5. Security Best Practices

When integrating with MySQL:

1. **Password Hashing**: Use bcrypt to hash passwords before storing
2. **JWT Tokens**: Use JSON Web Tokens for authentication
3. **Environment Variables**: Store database credentials in `.env` file
4. **Input Validation**: Validate and sanitize all user inputs
5. **SQL Injection Protection**: Use parameterized queries
6. **HTTPS**: Use HTTPS in production
7. **CORS**: Configure CORS properly for your frontend domain
8. **Rate Limiting**: Implement rate limiting on authentication endpoints

### 6. Example Backend Server Structure

```
server/
├── config/
│   └── database.js          # MySQL connection config
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User profile logic
│   └── savedItemsController.js  # Save/unsave logic
├── middleware/
│   ├── auth.js              # JWT verification middleware
│   └── validation.js        # Input validation
├── routes/
│   ├── auth.js              # Auth routes
│   ├── users.js             # User routes
│   └── savedItems.js        # Saved items routes
├── models/
│   ├── User.js              # User model
│   └── SavedItems.js        # Saved items model
├── .env                     # Environment variables
├── server.js                # Main server file
└── package.json
```

### 7. Environment Variables Example

```env
# Database
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=study_abroad_portal
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=3001
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 8. Testing the Integration

1. Start your MySQL database
2. Run your backend server: `node server.js`
3. Update the frontend API URLs to point to your backend
4. Test authentication flow
5. Test save/unsave functionality
6. Test profile updates

## Current localStorage Structure

For reference, here's how data is currently stored in localStorage:

```javascript
// Users array
localStorage.getItem('users')
// Example: [{ id, email, name, phone, country, ... }]

// Passwords (separate for security in real DB)
localStorage.getItem('passwords')
// Example: { "userId": "password" }

// Current logged-in user
localStorage.getItem('currentUserId')
// Example: "1704123456789"
```

## Migration Path

1. **Phase 1**: Keep using localStorage for development and testing
2. **Phase 2**: Set up MySQL database and create tables
3. **Phase 3**: Build backend API with Express
4. **Phase 4**: Replace localStorage calls with API calls one function at a time
5. **Phase 5**: Test thoroughly and deploy

## Questions?

If you need help with any specific part of the MySQL integration, please refer to:
- Express.js documentation: https://expressjs.com/
- MySQL2 for Node.js: https://github.com/sidorares/node-mysql2
- JWT authentication: https://jwt.io/
- Bcrypt: https://www.npmjs.com/package/bcrypt
