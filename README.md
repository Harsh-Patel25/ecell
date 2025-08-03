# E-Cell | Entrepreneurship Club

**Dream, Create and Inspire...**

A modern web application for the E-Cell Entrepreneurship Club, built with React and featuring a clean, responsive design with interactive components.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and modern hooks
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Interactive Components**: Toast notifications, dialogs, and dynamic content
- **Clean Separation**: HTML, CSS, and JavaScript properly separated
- **Analytics Integration**: Plausible analytics for tracking
- **Manus Platform Integration**: Original Manus space editor functionality preserved

## 📁 Project Structure

```
ecell-entrepreneurship-club/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   └── main.jsx
├── components/
│   ├── App.jsx          # Main React application
│   ├── Toast.jsx        # Toast notification component
│   └── Dialog.jsx       # Modal dialog component
├── utils/
│   └── EventEmitter.js  # Event management utility
├── styles.css           # Complete CSS styles
├── app.js              # Vanilla JS version
├── index.html          # Standalone HTML version
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser to:**
   ```
   http://localhost:3000
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Serve production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Usage Options

This project provides **three different ways** to use the E-Cell application:

### 1. React Version (Recommended)
- **File**: `src/main.jsx` + `components/`
- **Usage**: Full React application with modern hooks and components
- **Run**: `npm run dev`

### 2. Vanilla JavaScript Version
- **File**: `app.js` + `index.html`
- **Usage**: Pure JavaScript with custom elements and event management
- **Run**: Open `index.html` in browser or serve with any static server

### 3. Static HTML Version
- **File**: `index.html` + `styles.css`
- **Usage**: Static HTML with CSS styling
- **Run**: Open `index.html` directly in browser

## 🔧 Components

### Toast Notifications
```jsx
import Toast from './components/Toast';

<Toast 
  title="Welcome message" 
  variant="success" 
  onClose={() => {}} 
/>
```

### Dialog Modals
```jsx
import Dialog from './components/Dialog';

<Dialog 
  isOpen={true}
  title="Dialog Title"
  onClose={() => {}}
  closable={true}
  width="400px"
>
  <p>Dialog content</p>
</Dialog>
```

### Event System
```javascript
import EventEmitter from './utils/EventEmitter';

const events = new EventEmitter();
events.on('custom-event', (data) => {
  console.log('Event received:', data);
});
events.emit('custom-event', { message: 'Hello' });
```

## 🎯 Key Features

### Original Functionality Preserved
- **Manus Space Editor Integration**: All original editor functionality maintained
- **Analytics Tracking**: Plausible analytics integration
- **Toast Notifications**: Success and error notifications
- **Modal Dialogs**: Customizable dialog components
- **Responsive Design**: Mobile-first responsive layout

### Modern Enhancements
- **React Components**: Converted to modern React with hooks
- **TypeScript Ready**: Easy to add TypeScript support
- **Vite Build System**: Fast development and optimized builds
- **ESLint + Prettier**: Code quality and formatting
- **Modern CSS**: CSS custom properties and modern layout techniques

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Support

The application is fully responsive and works on:
- iOS Safari
- Android Chrome
- Mobile browsers

## 🔗 Original Source

This application was extracted and separated from the original Manus Space:
- **Original URL**: `https://radrbtaa.manus.space/?code=LA56euPLmW649xWLQLNfmU`
- **Platform**: Manus.im
- **Space ID**: `radrbtaa`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original design and functionality from Manus.im platform
- E-Cell team for the content and vision
- React team for the amazing framework
- Vite team for the build system

---

**Built with ❤️ for the E-Cell Entrepreneurship Community**
