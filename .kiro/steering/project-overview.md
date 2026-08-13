---
inclusion: always
---

# Personal Dashboard Project - CodingCamp

## Project Information
- **Project Name**: Personal Dashboard Web Application
- **Author**: Alfin Oris Tri Ashari
- **Date**: August 26, 2026
- **Course**: CodingCamp-10

## Project Description
A fully functional personal dashboard web application built with vanilla HTML, CSS, and JavaScript. This project demonstrates modern web development practices without using any frameworks or libraries.

## Technical Stack
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with custom variables, animations, and responsive design
- **Vanilla JavaScript**: All functionality without frameworks
- **LocalStorage API**: Client-side data persistence
- **Google Fonts**: Orbitron font for digital displays

## Key Features

### 1. Time & Greeting System
- Real-time clock with digital font (updates every second)
- Current date display
- Time-based greeting (Good Morning/Afternoon/Evening)
- Custom name personalization with LocalStorage

### 2. Focus Timer (Pomodoro)
- Customizable duration (1-60 minutes)
- Start, Stop, and Reset controls
- Visual countdown with digital font
- Settings panel integrated in timer box
- LocalStorage persistence for timer preferences

### 3. Task Management
- Add new tasks with duplicate prevention
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- Task timestamps showing exact date/time
- Three sorting options:
  - Sort by Date (newest first)
  - Sort by Name (alphabetical)
  - Sort by Status (incomplete first)
- LocalStorage persistence

### 4. Quick Links Manager
- Add favorite website links
- Rounded button design with gradient
- Delete links with confirmation
- Opens in new tab with security (noopener noreferrer)
- LocalStorage persistence

### 5. Theme System
- Light/Dark mode toggle
- Pill-style toggle button design
- CSS variables for easy theme switching
- Smooth transitions between themes
- LocalStorage persistence for theme preference

### 6. Animations
- Page load animations (staggered entrance)
- Section slide-up effects
- New item animations (tasks slide in, links bounce in)
- Delete animations (smooth exit)
- Hover effects on interactive elements

## Project Structure
```
CodingCamp-10August26-Alfin_Oris_Tri_Ashari/
├── .git/                    # Git repository
├── .kiro/                   # Kiro IDE configuration
│   ├── hooks/              # Automated hooks
│   └── steering/           # Project guidelines
├── css/
│   └── style.css           # Single CSS file (all styles)
├── js/
│   └── app.js              # Single JavaScript file (all logic)
└── index.html              # Main HTML file
```

## Design Principles
1. **Simplicity**: Clean, minimal interface
2. **Usability**: Intuitive interactions
3. **Performance**: Fast load time, no lag
4. **Accessibility**: Clear visual hierarchy, readable typography
5. **Responsiveness**: Works on desktop and mobile devices

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Data Storage
All data is stored client-side using Browser LocalStorage:
- User name
- Pomodoro timer duration
- Theme preference (light/dark)
- Tasks list with timestamps
- Quick links list

## Constraints Met
✅ HTML for structure
✅ CSS for styling (single file)
✅ Vanilla JavaScript (no frameworks)
✅ LocalStorage API for data persistence
✅ No backend server required
✅ Client-side only
✅ Browser compatible
✅ Clean code organization
✅ No test setup required

## Future Enhancements (Optional)
- Task categories/tags
- Export/import data
- Sync across devices
- More timer presets
- Task priorities
- Statistics/analytics
- Sound notifications
- Keyboard shortcuts

## Learning Outcomes
This project demonstrates proficiency in:
- DOM manipulation with vanilla JavaScript
- Event handling and user interactions
- LocalStorage API usage
- CSS animations and transitions
- Responsive web design
- Modern ES6+ JavaScript features
- Code organization and best practices
- Git version control
