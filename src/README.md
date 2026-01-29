# 🌍 Study Abroad Portal - Complete Guide with MySQL Database

A comprehensive web application for students planning to study abroad, featuring authentication, user profiles, test preparation resources, university matching, scholarship finder, visa guidance, and job prospects information - all backed by a MySQL database.

---

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MySQL Server** (v5.7 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
3. **npm** (comes with Node.js)

---

## 📦 Installation Steps

### Step 1: Install Node.js Dependencies

```bash
# Navigate to project directory
cd study-abroad-portal

# Install all required packages
npm install
```

This will install:
- `express` - Web server framework
- `mysql2` - MySQL database driver
- `bcrypt` - Password hashing
- `cors` - Cross-origin resource sharing
- `body-parser` - Request body parsing
- `dotenv` - Environment variables

---

### Step 2: Setup MySQL Database

#### 2.1 Start MySQL Server

Make sure your MySQL server is running. You can check this by running:

```bash
# Windows (in Command Prompt as Administrator)
net start MySQL80

# macOS/Linux
sudo service mysql start
# OR
sudo systemctl start mysql
```

#### 2.2 Create Database and Tables

**Option A: Using MySQL Workbench (Recommended for Beginners)**

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open the `database.sql` file from the project
4. Click "Execute" (lightning bolt icon) to run all SQL commands
5. Verify tables were created in the left sidebar

**Option B: Using Command Line**

```bash
# Login to MySQL
mysql -u root -p

# You'll be prompted for your MySQL password
# Then run:
source /path/to/project/database.sql

# OR copy-paste the contents of database.sql

# Verify database creation:
SHOW DATABASES;
USE study_abroad_portal;
SHOW TABLES;
```

**Option C: Using phpMyAdmin**

1. Open phpMyAdmin in your browser
2. Click "Import" tab
3. Choose the `database.sql` file
4. Click "Go"

#### 2.3 Verify Database Setup

After running the SQL script, you should have:

- ✅ Database: `study_abroad_portal`
- ✅ Table: `users` - Stores user accounts
- ✅ Table: `saved_universities` - Stores saved universities
- ✅ Table: `saved_scholarships` - Stores saved scholarships
- ✅ Table: `user_sessions` - Manages user sessions
- ✅ Table: `user_activity_log` - Tracks user activities

---

### Step 3: Configure Database Connection

#### 3.1 Create Environment File

Copy the example environment file:

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

#### 3.2 Update Database Credentials

Open the `.env` file and update with your MySQL credentials:

```env
# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=study_abroad_portal

# Session Secret
SESSION_SECRET=change_this_to_random_string_in_production
```

**⚠️ IMPORTANT:** Replace `your_mysql_password_here` with your actual MySQL root password!

#### 3.3 Alternative: Edit db-config.js Directly

If you don't want to use `.env` file, you can directly edit `db-config.js`:

```javascript
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'YOUR_MYSQL_PASSWORD',  // ⬅️ Change this
    database: 'study_abroad_portal',
    port: 3306
};
```

---

### Step 4: Start the Server

```bash
# Start the Express server
npm start
```

You should see output like:

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║        🌍 Study Abroad Portal Server (MySQL Enabled)      ║
║                                                            ║
╚════════════��═══════════════════════════════════════════════╝

  ✅ Server is running successfully!
  ✅ Database connected successfully!

  🌐 Local:    http://localhost:3000

╔════════════════════════════════════════════════════════════╗
║  Available Pages:                                          ║
╠════════════════════════════════════════════════════════════╣
║  • Home:             http://localhost:3000/home            ║
║  • Login:            http://localhost:3000/login           ║
║  • Profile:          http://localhost:3000/profile         ║
╚════════════════════════════════════════════════════════════╝
```

---

### Step 5: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

---

## 🔐 User Authentication & Database Integration

### How It Works

1. **Registration**: Users create an account with name, email, and password
2. **Password Security**: Passwords are hashed using bcrypt before storing
3. **Login**: Users authenticate with email and password
4. **Profile Management**: Users can update their profile information
5. **Data Persistence**: All user data is stored in MySQL database

### Database Tables

#### `users` Table
Stores all user account information:
- `id` - Unique user identifier
- `name` - Full name
- `email` - Email address (unique)
- `password_hash` - Encrypted password
- `phone` - Phone number
- `country` - User's country
- `date_of_birth` - Date of birth
- `current_education` - Current education level
- `target_degree` - Desired degree
- `profile_image_url` - Profile picture URL
- `created_at` - Account creation timestamp
- `last_login` - Last login timestamp

#### `saved_universities` Table
Stores universities saved by users:
- Links to `users` table via `user_id`
- University details (name, country, ranking, tuition, etc.)

#### `saved_scholarships` Table
Stores scholarships saved by users:
- Links to `users` table via `user_id`
- Scholarship details (name, amount, deadline, etc.)

---

## 🔌 API Endpoints

### Authentication

**Register New User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### User Profile

**Get User Profile**
```http
GET /api/user/:userId
```

**Update User Profile**
```http
PUT /api/user/:userId
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+1234567890",
  "country": "United States",
  "dateOfBirth": "2000-01-15",
  "currentEducation": "Bachelor of Science",
  "targetDegree": "Master of Science"
}
```

### Saved Items

**Save University**
```http
POST /api/user/:userId/universities
Content-Type: application/json

{
  "universityName": "Harvard University",
  "country": "United States",
  "ranking": 1,
  "tuitionFee": 51904
}
```

**Get Saved Universities**
```http
GET /api/user/:userId/universities
```

**Save Scholarship**
```http
POST /api/user/:userId/scholarships
Content-Type: application/json

{
  "scholarshipName": "Fulbright Scholarship",
  "country": "United States",
  "amount": 50000,
  "deadline": "2026-10-15"
}
```

**Get Saved Scholarships**
```http
GET /api/user/:userId/scholarships
```

---

## 🛠️ Troubleshooting

### Database Connection Issues

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:3306`
- ✅ Make sure MySQL server is running
- ✅ Check if port 3306 is correct (it might be different on your system)
- ✅ Verify MySQL credentials in `.env` or `db-config.js`

**Problem:** `Error: Access denied for user 'root'@'localhost'`
- ✅ Check your MySQL password is correct
- ✅ Verify MySQL user has proper permissions

**Problem:** `Error: Unknown database 'study_abroad_portal'`
- ✅ Run the `database.sql` script to create the database
- ✅ Check database name spelling in configuration

### MySQL Server Not Starting

**Windows:**
```bash
# Start MySQL service
net start MySQL80

# Check if running
sc query MySQL80
```

**macOS/Linux:**
```bash
# Start MySQL
sudo service mysql start

# Check status
sudo service mysql status
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

Solution: Change port in `.env` file:
```env
PORT=3001
```

Or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill
```

---

## 📊 Database Management

### View All Users

```sql
SELECT id, name, email, created_at, last_login 
FROM users 
ORDER BY created_at DESC;
```

### View User Activity

```sql
SELECT u.name, u.email, 
       COUNT(DISTINCT su.id) as saved_universities,
       COUNT(DISTINCT ss.id) as saved_scholarships
FROM users u
LEFT JOIN saved_universities su ON u.id = su.user_id
LEFT JOIN saved_scholarships ss ON u.id = ss.user_id
GROUP BY u.id;
```

### Clean Up Old Sessions

```sql
DELETE FROM user_sessions 
WHERE expires_at < NOW() OR is_active = FALSE;
```

### Backup Database

```bash
# Create backup
mysqldump -u root -p study_abroad_portal > backup_$(date +%Y%m%d).sql

# Restore from backup
mysql -u root -p study_abroad_portal < backup_20260129.sql
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore` for a reason
2. **Change default passwords** - Use strong, unique passwords
3. **Use HTTPS in production** - Never send passwords over HTTP
4. **Regular backups** - Backup database regularly
5. **Update dependencies** - Keep packages up to date

---

## 📁 Project Structure

```
study-abroad-portal/
├── server.js              # Express server with MySQL integration
├── db-config.js           # Database configuration
├── database.sql           # Database schema and setup
├── .env                   # Environment variables (create from .env.example)
├── .env.example           # Environment template
├── package.json           # Node.js dependencies
│
├── HTML Pages
│   ├── home.html          # Home page
│   ├── login.html         # Login/Register page
│   ├── profile.html       # User profile page
│   ├── universities.html  # University finder
│   └── scholarships.html  # Scholarship finder
│
├── JavaScript Files
│   ├── login-script.js    # Login/register logic
│   ├── profile-script.js  # Profile management
│   └── navigation-helper.js # Navigation utilities
│
└── CSS Files
    ├── login-styles.css
    ├── profile-styles.css
    └── (other style files)
```

---

## 🆘 Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Verify MySQL server is running
3. Check database credentials in `.env` file
4. Review the troubleshooting section above
5. Check server logs for detailed error information

---

## 🧪 Testing the Database Integration

### Step 1: Verify Server and Database Connection

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Check the console output:**
   - You should see "✅ Server is running successfully!"
   - You should see "✅ Database connected successfully!"

3. **Test the health endpoint:**
   - Open your browser
   - Go to: `http://localhost:3000/api/health`
   - You should see: `{"status":"OK","database":"Connected",...}`

### Step 2: Create a New User Account

1. **Go to the login page:**
   ```
   http://localhost:3000/login
   ```

2. **Click "Create Account"**

3. **Fill in the registration form:**
   - Name: Your Name
   - Email: your.email@example.com
   - Password: password123 (minimum 6 characters)

4. **Click "Sign Up"**

5. **Verify in database:**
   ```sql
   USE study_abroad_portal;
   SELECT id, name, email, created_at FROM users;
   ```
   You should see your newly created user!

### Step 3: Test Profile Updates

1. **After logging in, you'll be redirected to the profile page**

2. **Click "Edit Profile"**

3. **Update your information:**
   - Phone: +1234567890
   - Country: United States
   - Date of Birth: 2000-01-15
   - Current Education: Bachelor of Science
   - Target Degree: Master of Science

4. **Click "Save Changes"**

5. **Verify in database:**
   ```sql
   SELECT * FROM users WHERE email = 'your.email@example.com';
   ```
   All fields should be updated!

### Step 4: Test Saving Universities

1. **Go to Universities page:**
   ```
   http://localhost:3000/universities
   ```

2. **Click the "Save" button on any university**

3. **You should see:** "University saved successfully!" notification

4. **Verify in database:**
   ```sql
   SELECT * FROM saved_universities WHERE user_id = YOUR_USER_ID;
   ```

5. **Check your profile page:**
   ```
   http://localhost:3000/profile
   ```
   The saved university should appear under "Saved Universities"

### Step 5: Test Saving Scholarships

1. **Go to Scholarships page:**
   ```
   http://localhost:3000/scholarships
   ```

2. **Click the "Save" button on any scholarship**

3. **You should see:** "Scholarship saved successfully!" notification

4. **Verify in database:**
   ```sql
   SELECT * FROM saved_scholarships WHERE user_id = YOUR_USER_ID;
   ```

5. **Check your profile page - should show saved scholarship!**

### Step 6: Test Logout and Re-login

1. **Click "Logout" button**

2. **Login again with the same credentials**

3. **All your data should still be there!**
   - Profile information intact
   - Saved universities visible
   - Saved scholarships visible

### Common Test Queries

```sql
-- View all users
SELECT id, name, email, created_at, last_login FROM users;

-- View user with saved items count
SELECT 
    u.id, 
    u.name, 
    u.email,
    COUNT(DISTINCT su.id) as saved_universities_count,
    COUNT(DISTINCT ss.id) as saved_scholarships_count
FROM users u
LEFT JOIN saved_universities su ON u.id = su.user_id
LEFT JOIN saved_scholarships ss ON u.id = ss.user_id
GROUP BY u.id;

-- View all saved universities
SELECT u.name as user_name, su.university_name, su.country, su.saved_at
FROM saved_universities su
JOIN users u ON su.user_id = u.id
ORDER BY su.saved_at DESC;

-- View all saved scholarships
SELECT u.name as user_name, ss.scholarship_name, ss.amount, ss.deadline
FROM saved_scholarships ss
JOIN users u ON ss.user_id = u.id
ORDER BY ss.saved_at DESC;

-- View user activity
SELECT u.name, ual.activity_type, ual.activity_description, ual.created_at
FROM user_activity_log ual
JOIN users u ON ual.user_id = u.id
ORDER BY ual.created_at DESC
LIMIT 20;
```

---

## 🆘 Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Verify MySQL server is running
3. Check database credentials in `.env` file
4. Review the troubleshooting section above
5. Check server logs for detailed error information

---

## 🎯 Next Steps

After successful setup:

1. ✅ Create a test account at `/login`
2. ✅ Update your profile at `/profile`
3. ✅ Explore universities at `/universities`
4. ✅ Search scholarships at `/scholarships`
5. ✅ Save your favorite options

---

## 📝 Development Notes

- Server runs on port 3000 by default
- Hot reload: Restart server after code changes
- Database changes: Update `database.sql` and re-run
- API testing: Use Postman or similar tools

---

## 🌟 Features

- ✨ User authentication with MySQL
- 🔐 Secure password hashing (bcrypt)
- 👤 User profile management
- 🎓 University search and save
- 💰 Scholarship finder
- 📊 User activity tracking
- 🔄 Session management
- 💾 Persistent data storage

---

## 📜 License

MIT License - Feel free to use this project for learning and development.

---

## 🤝 Support

For database-specific issues, check `database.sql` comments for detailed table structures and query examples.

**Happy Studying Abroad! 🌍✈️📚**