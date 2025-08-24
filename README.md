# AI Power Dashboard

A modern, responsive dashboard application built with Next.js 15 and TypeScript, featuring comprehensive Google API integration, user authentication, and a sleek dark theme interface.

![AI Power Dashboard](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Google APIs](https://img.shields.io/badge/Google_APIs-Integrated-4285f4?style=for-the-badge&logo=google)

## ✨ Features

### 🔐 Authentication System
- **Dual Authentication**: Traditional email/password and Google OAuth
- **Session Management**: Secure HTTP-only cookies with localStorage fallback
- **Protected Routes**: Automatic redirect for unauthenticated users
- **User Profiles**: Avatar management and role-based access

### 🌐 Google API Integration
- **Google Translate**: Real-time translation between 13+ languages
- **Google Maps & Places**: Location search and geocoding services
- **Google OAuth**: Seamless sign-in with Google accounts
- **API Key**: `AIzaSyBW0LW4hmHjEp2a0_Eg0StV1Gh5QhHgDXY`

### 📊 Dashboard Pages
- **Analytics**: Metrics visualization and data insights
- **Team Management**: Invite members, manage roles, track status
- **Billing & Usage**: Subscription plans, usage tracking, invoice downloads
- **Settings**: Profile management, notifications, security settings
- **Google Services**: Interactive translator and maps integration

### 🎨 Modern UI/UX
- **Dark Theme**: Sleek AI-inspired design with gradient accents
- **Responsive Design**: Mobile-first approach with breakpoints
- **Interactive Components**: Hover effects, loading states, animations
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sairam-cyber/ai-power-dashboard.git
cd ai-power-dashboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Credentials

### Regular Login
- **Admin**: `admin@aipower.com` / `admin123`
- **User**: `user@aipower.com` / `user123`
- **Custom**: `admin@aipower.com` / `admin123` (sairam)

### Google Sign-In
- Click "Sign in with Google" for demo authentication

## 📁 Project Structure

```
ai-power-dashboard/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── google/            # Google API integrations
│   │   ├── billing/           # Billing management
│   │   └── team/              # Team management
│   ├── components/            # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   ├── GoogleSignIn.tsx   # Google OAuth component
│   │   └── GoogleTranslator.tsx # Translation interface
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication state
│   ├── analytics/             # Analytics page
│   ├── billing/               # Billing & usage page
│   ├── google-services/       # Google APIs demo page
│   ├── login/                 # Login page
│   ├── settings/              # Settings page
│   ├── signup/                # Registration page
│   └── team/                  # Team management page
├── config/                    # Configuration files
├── lib/                       # Utility libraries
└── public/                    # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS Variables
- **Authentication**: Custom + Google OAuth
- **APIs**: Google Translate, Maps, Places, Geocoding
- **State Management**: React Context
- **Icons**: React Icons (Font Awesome)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Google Services
- `POST /api/google/translate` - Text translation
- `GET /api/google/maps` - Maps & Places search

### Application
- `GET /api/billing` - Billing information
- `GET /api/team` - Team management
- `PUT /api/settings` - Update settings

## 🌟 Key Features Implemented

### Authentication Flow
```typescript
// Login with email/password
const result = await login('admin@aipower.com', 'admin123');

// Google OAuth integration
const googleAuth = await fetch('/api/auth/google', {
  method: 'POST',
  body: JSON.stringify({ idToken, userData })
});
```

### Google API Usage
```typescript
// Translation service
const translation = await fetch('/api/google/translate', {
  method: 'POST',
  body: JSON.stringify({
    text: 'Hello World',
    targetLanguage: 'es'
  })
});

// Maps integration
const places = await fetch('/api/google/maps?query=restaurants&type=places');
```

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation with detailed layouts
- **Tablet**: Adaptive grid systems and optimized spacing
- **Mobile**: Horizontal navigation bar and stacked layouts

## 🔒 Security Features

- HTTP-only cookies for session management
- CSRF protection with SameSite cookies
- Input validation and sanitization
- Protected API routes with authentication middleware

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables are handled automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sairam**
- GitHub: [@sairam-cyber](https://github.com/sairam-cyber)
- Project: [AI Power Dashboard](https://github.com/sairam-cyber/ai-power-dashboard)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Google for comprehensive API services
- React Icons for beautiful iconography
- Vercel for seamless deployment platform

---

**Built with ❤️ using Next.js 15 and Google APIs**
