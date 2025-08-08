# WhatsApp Mobile App Clone

A pixel-perfect mobile-first WhatsApp clone built with React, TypeScript, and Tailwind CSS. This project replicates the iOS WhatsApp interface with responsive design and smooth navigation.

## ✨ Features

- **Updates Page**: Status feed with "My status", recent updates, and channels
- **Calls Page**: Call history with favorites and recent calls, call type indicators
- **Communities Page**: Community discovery with illustrations and call-to-action
- **Mobile-First Design**: Responsive layout optimized for mobile devices
- **Touch-Friendly**: Proper touch targets for mobile interaction
- **Smooth Navigation**: React Router-based SPA navigation
- **WhatsApp Styling**: Authentic WhatsApp green branding and UI patterns

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router 6
- **Build Tool**: Vite
- **Backend**: Express.js
- **Deployment**: Netlify Functions
- **Font**: SF Pro Text

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd whatsapp-mobile-clone
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Project Structure

```
├── client/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── StatusBar.tsx    # Mobile status bar
│   │   └── TabBar.tsx       # Bottom navigation
│   ├── pages/
│   │   ├── Updates.tsx      # Main updates/status page
│   │   ├── Calls.tsx        # Call history page
│   │   ├── Communities.tsx  # Communities discovery
│   │   ├── StatusDetail.tsx # Individual status view
│   │   └── StatusReaction.tsx # Status reaction interface
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── App.tsx             # Main app component with routing
│   └── global.css          # Global styles and CSS variables
├── server/                 # Express.js backend
├── netlify/functions/      # Serverless functions
└── shared/                 # Shared utilities
```

## 🎨 Design Features

- **Pixel-Perfect**: Carefully crafted to match WhatsApp's iOS design
- **Responsive**: Mobile-first approach with fluid responsive design
- **Accessibility**: Proper touch targets and semantic HTML
- **Performance**: Optimized components and efficient rendering
- **Modern CSS**: Uses CSS Grid, Flexbox, and modern layout techniques

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

## 📄 Pages

### Updates Page (`/`)

- My status section with profile picture
- Recent updates from contacts
- Channels section with explore option

### Calls Page (`/calls`)

- Favorites section for frequent contacts
- Recent calls with call type indicators
- End-to-end encryption notice

### Communities Page (`/communities`)

- Community discovery illustration
- Descriptive content about communities
- "See example communities" link
- "New Community" creation button

## 🎯 Key Components

- **StatusBar**: iOS-style status bar with time, signal, and battery
- **TabBar**: Bottom navigation with 5 tabs and active states
- **Mobile Container**: Responsive wrapper for mobile-first design

## 🚀 Deployment

The app is configured for deployment on Netlify with serverless functions. Simply connect your repository to Netlify for automatic deployments.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is for educational and demonstration purposes.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
