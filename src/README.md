# Study Abroad Portal

A comprehensive web application for students planning to study abroad, featuring test preparation guidance, university matching, scholarship finder, visa information, and job prospects by country.

## 🚀 Features

- **Landing Page (Home)**: Engaging hero section with feature highlights and statistics
- **Preparation Tips**: Complete guide for skill and research preparation before applying
- **Test Preparation**: Comprehensive guides for IELTS, GRE, TOEFL, and other standardized tests
- **University Matcher**: Interactive tool to find universities matching your profile
- **Scholarship Finder**: Database of scholarships with filtering and saving functionality
- **Visa Guide**: Step-by-step visa application guidance for different countries
- **Job Prospects**: Country-wise employment opportunities and salary information
- **User Authentication**: Login/Signup system with user profiles
- **User Profiles**: Personalized dashboards with saved scholarships and universities

## 🛠️ Tech Stack

### React Version
- **React 18** with TypeScript
- **Motion** (Framer Motion) for animations
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **Recharts** for data visualization
- **React Slick** for carousels
- **Context API** for state management

## 📁 Project Structure

```
/
├── index.html              # React app entry point
├── main.tsx               # React app bootstrap
├── App.tsx                # Main application component
│
├── components/            # React components
│   ├── Hero.tsx          # Landing page/home section
│   ├── Navigation.tsx    # Navigation bar with user menu
│   ├── PreparationTips.tsx
│   ├── TestPreparation.tsx
│   ├── UniversityMatcher.tsx
│   ├── ScholarshipFinder.tsx
│   ├── VisaGuide.tsx
│   ├── JobProspects.tsx
│   ├── AuthModal.tsx     # Login/Signup modal
│   ├── UserProfile.tsx   # User profile page
│   ├── Footer.tsx        # Footer component
│   └── ui/               # Reusable UI components
│
├── contexts/
│   └── AuthContext.tsx   # Authentication context
│
├── styles/
│   └── globals.css       # Global styles and Tailwind config
│
└── html-version/         # Standalone HTML/CSS/JS version
    ├── login.html        # Redesigned login page with animations
    ├── login.css         # Beautiful login page styles
    ├── login.js          # Login page functionality
    ├── profile.html      # User profile page
    └── ...
```

## 🚦 Getting Started

### React Version

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **The application will start at:**
   ```
   http://localhost:5173
   ```

3. **Navigate through the app:**
   - The home page (landing page) loads by default
   - Use the navigation bar to access different sections:
     - Home → Landing page with feature highlights
     - Preparation Tips → Study abroad preparation guidance
     - Test Prep → IELTS/GRE/TOEFL guides
     - Universities → University search and matching tool
     - Scholarships → Scholarship database with filters
     - Visa Guide → Country-wise visa information
     - Job Prospects → Employment opportunities by country
   - Click "Login" to access authentication
   - After logging in, access your profile from the user menu

### Standalone HTML Version

The standalone HTML/CSS/JavaScript version is available in the `/html-version/` directory. You can open any HTML file directly in a browser:

- `login.html` - Beautiful redesigned login page
- `profile.html` - User profile page
- Other pages available in root directory (for the vanilla version)

## 🔐 Authentication System

### Current Implementation (localStorage)
- User data is stored in browser's localStorage
- Passwords are stored separately (in production, use proper encryption)
- User sessions persist across page reloads
- Features include:
  - Login/Signup functionality
  - User profiles with editable information
  - Save/unsave scholarships and universities
  - Profile picture upload (base64 encoding)

### MySQL Integration (Coming Soon)
See `MYSQL_INTEGRATION_GUIDE.md` for instructions on connecting to MySQL database.

## 🎨 Design Features

### React Version
- **Smooth Animations**: Motion-powered transitions and interactions
- **Responsive Design**: Mobile-first approach, works on all devices
- **Modern UI**: Clean, professional interface with gradient accents
- **Interactive Elements**: Hover effects, loading states, progress indicators
- **Glass Morphism**: Modern backdrop blur effects on navigation
- **Accessibility**: ARIA labels and keyboard navigation support

### Standalone HTML Login Page
- **Split-Screen Layout**: Branded left panel with login form on right
- **Floating Gradient Shapes**: Animated background elements
- **Glass Morphism Effects**: Modern semi-transparent design
- **Password Visibility Toggle**: Eye icon to show/hide passwords
- **Smooth Transitions**: Seamless switching between login and signup forms
- **Form Validation**: Real-time input validation with error messages
- **Responsive Design**: Adapts beautifully to all screen sizes

## 📊 Key Components

### Landing Page (Hero Component)
- Eye-catching hero section with call-to-action
- Feature cards with hover animations
- Animated statistics counter
- Quick navigation to main sections

### University Matcher
- Advanced filtering system
- GPA calculator
- Country and program selection
- Save functionality for logged-in users

### Scholarship Finder
- Comprehensive scholarship database
- Filter by country, degree, deadline, and amount
- Countdown timers for deadlines
- Save/bookmark scholarships

### Test Preparation
- Study plans for different tests
- Resource recommendations
- Score calculators
- Practice test links

### Visa Guide
- Country-specific visa requirements
- Step-by-step application process
- Document checklists
- Processing time estimates

### Job Prospects
- Country-wise employment data
- Average salary information
- In-demand skills
- Work permit requirements

## 🔄 Navigation Flow

```
Home (Landing Page)
  ├── Get Started → Preparation Tips
  ├── Explore Test Prep → Test Preparation
  ├── Find Universities → University Matcher
  ├── Discover Scholarships → Scholarship Finder
  ├── Visa Information → Visa Guide
  └── Job Prospects → Job Prospects

Navigation Bar
  ├── Home
  ├── Preparation Tips
  ├── Test Prep
  ├── Universities
  ├── Scholarships
  ├── Visa Guide
  ├── Job Prospects
  └── User Menu (when logged in)
      ├── Profile
      ├── Saved Items
      ├── Settings
      └── Logout
```

## ���� Data Storage

### Current (localStorage)
All user data, profiles, saved items, and authentication information is stored in the browser's localStorage.

### Production (MySQL - Planned)
- User accounts and authentication
- User profiles and preferences
- Saved scholarships and universities
- Application tracking
- Document uploads

## 🎯 Future Enhancements

- [ ] Connect to MySQL database
- [ ] Implement proper password hashing (bcrypt)
- [ ] Add email verification
- [ ] Implement forgot password functionality
- [ ] Add application tracking system
- [ ] Create admin dashboard
- [ ] Add blog/resources section
- [ ] Implement real-time notifications
- [ ] Add chat/messaging support
- [ ] Integrate payment gateway for premium features

## 📝 Environment Variables

For production deployment, create a `.env` file with:

```env
VITE_API_URL=your_backend_api_url
VITE_DB_HOST=your_mysql_host
VITE_DB_USER=your_mysql_user
VITE_DB_PASSWORD=your_mysql_password
VITE_DB_NAME=your_database_name
```

## 🤝 Contributing

This is a personal project for study abroad guidance. Contributions, issues, and feature requests are welcome!

## 📄 License

This project is created for educational purposes.

## 📧 Contact

For questions or feedback about studying abroad, please visit our contact section in the application.

---

**Built with ❤️ for students pursuing international education**
