# EcoX - Smart Rainwater Harvesting System

A comprehensive web application for smart rainwater harvesting and purification system management.

## Project Structure

This project consists of three main components:

### 1. Welcome Page (`Welcome page/`)
- **File**: `index.html`
- **Description**: Landing page with project overview and features
- **Technology**: HTML5, CSS3, JavaScript
- **Features**: 
  - Responsive design
  - Interactive feature cards
  - Navigation to login and dashboard

### 2. Login Page (`Login Page/`)
- **Files**: `Login.html`, `Login.css`, `Login.js`
- **Description**: Authentication system with sign-up and sign-in functionality
- **Technology**: HTML5, CSS3, JavaScript
- **Features**:
  - Dual form (sign-up/sign-in)
  - Form validation
  - Local storage for user data
  - Navigation to dashboard after authentication

### 3. Main Dashboard (`Main page/`)
- **Description**: Next.js dashboard application
- **Technology**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Features**:
  - Real-time water tank monitoring
  - Water quality metrics
  - Usage analytics
  - AI insights
  - Alert system
  - User authentication

## How to Run

### Option 1: Simple HTML Pages (Welcome & Login)
1. Open `index.html` in your web browser
2. Navigate through the pages using the provided links
3. No server setup required

### Option 2: Full Dashboard (Next.js)
1. Navigate to the dashboard directory:
   ```bash
   cd "Main page"
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **IMPORTANT**: Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **CRITICAL**: Open [http://localhost:3000](http://localhost:3000) in your browser
   - **DO NOT** try to access the dashboard by opening the folder directly
   - **DO NOT** use file:// URLs
   - **MUST** use http://localhost:3000

## User Flow

1. **Start**: Open `index.html` - automatically redirects to Welcome page
2. **Welcome Page**: View project overview and features
3. **Login**: Click "Sign Up / Sign In" to access the login page
4. **Authentication**: Create account or sign in
5. **Dashboard**: Access the main monitoring dashboard
6. **Logout**: Use the logout button in the dashboard header

## Features

### Authentication System
- User registration and login
- Form validation
- Session management using localStorage
- Automatic redirect to dashboard after login

### Dashboard Features
- Real-time water tank status monitoring
- Water quality parameters (pH, turbidity, TDS)
- Usage analytics and savings tracking
- AI-powered insights
- Alert and notification system
- Weather forecast integration

### Navigation
- Seamless navigation between all pages
- Authentication protection for dashboard
- Responsive design for all screen sizes

## Technical Details

### Frontend Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript**: Interactive functionality
- **React**: Component-based UI
- **Next.js**: Full-stack framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling

### Authentication
- Client-side authentication using localStorage
- Form validation and error handling
- Session management
- Protected routes

### Data Management
- Local storage for user data
- Simulated real-time data for dashboard
- Responsive data visualization

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

- The application uses client-side authentication for demo purposes
- Dashboard data is simulated for demonstration
- All file paths are relative for portability
- The Next.js app includes comprehensive UI components

## Troubleshooting

### Common Issues

1. **Dashboard not loading**: Ensure you're logged in first
2. **Navigation errors**: Check that all files are in the correct directory structure
3. **Next.js build errors**: Run `npm install` to ensure all dependencies are installed

### File Structure
```
EcoX/
├── index.html (main entry point)
├── Login Page/
│   ├── Login.html
│   ├── Login.css
│   └── Login.js
├── Welcome page/
│   └── Welcome page/
│       └── index.html
└── Main page/
    └── Main page/
        ├── app/
        ├── components/
        ├── package.json
        └── ...
```

## License

This project is part of the EcoX Smart Rainwater Harvesting System.

