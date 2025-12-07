# BookMart Frontend

A modern, production-ready e-commerce frontend for the BookMart online bookstore, built with React, TypeScript, Vite, and TailwindCSS.

## 🎨 Design & Color Scheme

The application features a modern, accessible color palette:

- **Primary (Deep Purple)**: `#8b5cf6` - Brand color, CTAs, links
- **Secondary (Vibrant Orange)**: `#f97316` - Accents, badges, highlights
- **Neutral (Slate)**: Clean backgrounds, text, and borders

## 🚀 Features

### Public Features
- ✅ Browse books with search and category filtering
- ✅ View detailed book information
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Modern UI with smooth animations

### User Features (Authenticated)
- ✅ User registration and login with JWT authentication
- ✅ Shopping cart with quantity management
- ✅ Secure checkout process
- ✅ Order history tracking
- ✅ User profile management

### Admin Features
- ✅ Admin dashboard with statistics
- ✅ Complete book management (CRUD operations)
- ✅ Order status management
- ✅ User role management

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Custom components inspired by shadcn/ui
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router DOM v6
- **Icons**: Lucide React

## 📦 Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd bookmart-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:3000`

## 🏗️ Project Structure

```
bookmart-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (Button, Input, Card, etc.)
│   │   ├── BookCard.tsx    # Product card component
│   │   ├── ProtectedRoute.tsx
│   │   └── AdminRoute.tsx
│   ├── layouts/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── BooksPage.tsx
│   │   ├── BookDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── admin/          # Admin pages
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminBooks.tsx
│   │       ├── AdminOrders.tsx
│   │       └── AdminUsers.tsx
│   ├── services/           # API service layer
│   │   ├── authService.ts
│   │   ├── bookService.ts
│   │   ├── orderService.ts
│   │   └── userService.ts
│   ├── store/              # Zustand state management
│   │   └── index.ts        # Auth and Cart stores
│   ├── lib/                # Utilities and configurations
│   │   ├── axios.ts        # Axios instance with interceptors
│   │   └── utils.ts        # Helper functions
│   ├── config/             # App configuration
│   │   └── api.ts          # API endpoints and constants
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
└── README.md               # This file
```

## 🔌 API Integration

The frontend connects to the BookMart backend API:

- **Production URL**: `https://bookmart-backend-0rax.onrender.com`
- **API Documentation**: See `frontend_api_guide.md.resolved` in the parent directory

### Authentication
- JWT-based authentication
- Tokens stored in localStorage
- Automatic token refresh and logout on expiration

### API Services
All API calls are handled through service modules:
- `authService`: Login, register, logout
- `bookService`: CRUD operations for books
- `orderService`: Order placement and management
- `userService`: User profile and admin operations

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 User Roles

### Regular User
- Browse and search books
- Add items to cart
- Place orders
- View order history
- Manage profile

### Admin User
- All user features
- Manage books (add, edit, delete)
- Manage orders (update status)
- Manage users (change roles, delete)

## 🌟 Key Features

### Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Intuitive navigation
- Accessible color contrasts (WCAG compliant)

### Performance
- Fast page loads with Vite
- Optimized bundle size
- Lazy loading for images
- Efficient state management

### Security
- JWT token authentication
- Protected routes
- Role-based access control
- Secure API communication

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📝 Environment Variables

No environment variables are required as the API URL is configured in `src/config/api.ts`.

To change the API URL, edit:
```typescript
// src/config/api.ts
export const API_BASE_URL = 'your-api-url-here'
```

## 🤝 Contributing

This is a complete, production-ready frontend. To extend or modify:

1. Follow the existing code structure
2. Maintain TypeScript type safety
3. Keep components modular and reusable
4. Follow the established design system

## 📄 License

This project is part of the BookMart e-commerce application.

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**
