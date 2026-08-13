---
inclusion: auto
fileMatchPattern: "**/*.{js,html,css}"
---

# Coding Standards & Best Practices

## General Guidelines

### Code Organization
- Keep related functionality together
- Use clear, descriptive function names
- Add comments for complex logic
- Maintain consistent indentation (2 spaces)

### Naming Conventions
- **Variables**: camelCase (e.g., `userName`, `todoList`)
- **Functions**: camelCase with verb prefix (e.g., `addTodo`, `saveTodos`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_TIMER_MINUTES`)
- **CSS Classes**: kebab-case (e.g., `todo-item`, `btn-primary`)
- **IDs**: camelCase (e.g., `todoInput`, `addTodoBtn`)

## HTML Standards

### Structure
```html
<!-- Use semantic HTML5 elements -->
<section>, <article>, <nav>, <header>, <footer>

<!-- Proper nesting and indentation -->
<div class="parent">
  <div class="child">
    <span>Content</span>
  </div>
</div>

<!-- Self-documenting IDs -->
<button id="addTodoBtn">Add</button>
<input id="todoInput" />
```

### Accessibility
- Use descriptive `title` attributes for buttons
- Use `alt` attributes for images
- Use proper form labels
- Maintain logical tab order

## CSS Standards

### Organization
1. CSS Variables (theme colors)
2. Global styles (*, body)
3. Layout styles (sections, grids)
4. Component styles (buttons, inputs)
5. Animations and transitions
6. Media queries (responsive)

### CSS Variables
```css
:root {
  --text-primary: #333333;
  --text-accent: #667eea;
  --card-bg: #ffffff;
}

body.dark-mode {
  --text-primary: #e0e0e0;
  --text-accent: #8b9aed;
  --card-bg: #2a2a3e;
}
```

### Best Practices
- Use CSS variables for colors and spacing
- Keep specificity low (avoid deep nesting)
- Use flexbox and grid for layouts
- Add transitions for smooth interactions
- Mobile-first responsive design

## JavaScript Standards

### Code Structure
```javascript
// 1. Global variables and state
let todos = [];
let isDarkMode = false;

// 2. DOM element references
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// 3. Helper functions
function formatTimeAgo(timestamp) { }

// 4. Core functionality
function addTodo() { }
function renderTodos() { }

// 5. Event listeners
todoInput.addEventListener('click', addTodo);

// 6. Initialization
loadTodos();
```

### Best Practices
- Use `const` for variables that don't change
- Use `let` for variables that change
- Avoid global variables when possible
- Use arrow functions for callbacks
- Add error handling (try-catch where appropriate)
- Use template literals for strings
- Destructure when appropriate

### LocalStorage Usage
```javascript
// Always parse JSON when reading
const data = JSON.parse(localStorage.getItem('key'));

// Always stringify when writing
localStorage.setItem('key', JSON.stringify(data));

// Always check for null
const data = localStorage.getItem('key');
if (data) {
  // Use data
}
```

### Event Handling
```javascript
// Use event delegation for dynamic content
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    deleteTodo(index);
  }
});

// Prevent default when needed
form.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit();
});
```

### Animation Classes
```javascript
// Add animation class
element.classList.add('new-item');

// Remove after animation
setTimeout(() => {
  element.classList.remove('new-item');
}, 500);
```

## File Organization

### Single File Rule
- ✅ Only 1 CSS file in `css/` directory
- ✅ Only 1 JavaScript file in `js/` directory
- ✅ Keep code clean and organized within these files

### Comments
```javascript
// ========================================
// SECTION TITLE
// ========================================

// Function description
function myFunction() {
  // Step-by-step comments for complex logic
}
```

## Performance Best Practices

### DOM Manipulation
- Minimize DOM queries (cache element references)
- Use `DocumentFragment` for multiple inserts
- Batch DOM updates when possible

### Event Listeners
- Remove event listeners when elements are destroyed
- Use event delegation for dynamic lists
- Debounce/throttle intensive operations

### LocalStorage
- Only store what's necessary
- Compress large data if needed
- Handle storage quota errors

## Security Best Practices

### XSS Prevention
```javascript
// Use textContent instead of innerHTML for user input
element.textContent = userInput;

// Validate and sanitize URLs
if (!url.startsWith('http://') && !url.startsWith('https://')) {
  url = 'https://' + url;
}
```

### External Links
```html
<!-- Always use rel="noopener noreferrer" for external links -->
<a href="url" target="_blank" rel="noopener noreferrer">
```

## Testing Guidelines

### Manual Testing Checklist
- ✅ Test all features in different browsers
- ✅ Test responsive design on mobile devices
- ✅ Test LocalStorage persistence
- ✅ Test with empty state
- ✅ Test with maximum data
- ✅ Test edge cases (empty inputs, special characters)

### Code Review Checklist
- ✅ No console.log statements in production
- ✅ No unused variables or functions
- ✅ Consistent naming conventions
- ✅ Proper error handling
- ✅ Comments for complex logic
- ✅ Code is readable and maintainable

## Version Control

### Commit Messages
```
feat: Add dark mode toggle
fix: Fix task sorting by date
style: Update button hover effects
docs: Add project documentation
refactor: Improve code organization
```

### Git Best Practices
- Commit frequently with clear messages
- Don't commit sensitive data
- Keep commits focused (one feature/fix per commit)
- Review changes before committing
