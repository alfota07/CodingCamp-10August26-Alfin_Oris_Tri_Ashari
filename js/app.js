// ========================================
// THEME TOGGLE (LIGHT/DARK MODE) - New Design
// ========================================

const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.querySelector('.theme-label');
const themeIconCircle = document.querySelector('.theme-icon-circle');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function applyTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeLabel.textContent = 'Night Mode';
        themeIconCircle.textContent = '🌙';
    } else {
        document.body.classList.remove('dark-mode');
        themeLabel.textContent = 'Day Mode';
        themeIconCircle.textContent = '☀️';
    }
}

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    applyTheme();
});

// Apply theme on load
applyTheme();

// ========================================
// GREETING SETTINGS (In Greeting Box)
// ========================================

const greetingSettingsBtn = document.getElementById('greetingSettingsBtn');
const greetingSettingsPanel = document.getElementById('greetingSettings');

greetingSettingsBtn.addEventListener('click', () => {
    greetingSettingsPanel.classList.toggle('active');
    // Load current name
    const savedName = localStorage.getItem('userName') || '';
    document.getElementById('userName').value = savedName;
});

// Save custom name
document.getElementById('saveNameBtn').addEventListener('click', () => {
    const name = document.getElementById('userName').value.trim();
    localStorage.setItem('userName', name);
    updateDateTime(); // Refresh greeting
    greetingSettingsPanel.classList.remove('active');
    alert('Name saved successfully!');
});

// ========================================
// TIMER SETTINGS (In Timer Box)
// ========================================

const timerSettingsBtn = document.getElementById('timerSettingsBtn');
const timerSettingsPanel = document.getElementById('timerSettings');

timerSettingsBtn.addEventListener('click', () => {
    timerSettingsPanel.classList.toggle('active');
    // Load current time setting
    const savedTime = localStorage.getItem('pomodoroMinutes') || '25';
    document.getElementById('pomodoroTime').value = savedTime;
});

// Save pomodoro time
document.getElementById('saveTimeBtn').addEventListener('click', () => {
    const time = parseInt(document.getElementById('pomodoroTime').value);
    if (time < 1 || time > 60) {
        alert('Please enter a time between 1 and 60 minutes!');
        return;
    }
    localStorage.setItem('pomodoroMinutes', time);
    totalSeconds = time * 60;
    remainingSeconds = totalSeconds;
    updateTimerDisplay();
    timerSettingsPanel.classList.remove('active');
    alert('Timer duration saved successfully!');
});

// ========================================
// GREETING & DATE/TIME FUNCTIONALITY
// ========================================

function updateDateTime() {
    const now = new Date();
    
    // Update time (HH:MM:SS)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
    
    // Update greeting based on time of day with custom name
    const hour = now.getHours();
    let greeting = '';
    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }
    
    // Add custom name if set
    const userName = localStorage.getItem('userName');
    if (userName && userName.trim() !== '') {
        greeting += `, ${userName}`;
    }
    
    document.getElementById('greeting').textContent = greeting;
}

// Update every second
updateDateTime();
setInterval(updateDateTime, 1000);

// ========================================
// FOCUS TIMER FUNCTIONALITY (Customizable)
// ========================================

let timerInterval = null;
let pomodoroMinutes = parseInt(localStorage.getItem('pomodoroMinutes')) || 25;
let totalSeconds = pomodoroMinutes * 60;
let remainingSeconds = totalSeconds;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

function updateTimerDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return; // Already running
    
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerDisplay();
        } else {
            stopTimer();
            alert('Focus session complete! Great job!');
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    // Get current pomodoro time setting
    pomodoroMinutes = parseInt(localStorage.getItem('pomodoroMinutes')) || 25;
    totalSeconds = pomodoroMinutes * 60;
    remainingSeconds = totalSeconds;
    updateTimerDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize timer display
updateTimerDisplay();

// ========================================
// TO-DO LIST FUNCTIONALITY
// ========================================

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const sortSelect = document.getElementById('sortTasks');

let todos = [];
let currentSort = 'date';

// Load todos from localStorage
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Sort todos
function sortTodos() {
    switch (currentSort) {
        case 'name':
            todos.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
            break;
        case 'status':
            todos.sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1;
            });
            break;
        case 'date':
        default:
            // Keep original order (by creation date)
            break;
    }
}

// Render todos to the page
function renderTodos() {
    todoList.innerHTML = '';
    
    sortTodos();
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        // Add animation class for new items
        if (todo.isNew) {
            li.classList.add('new-item');
            // Remove the isNew flag after animation
            setTimeout(() => {
                delete todo.isNew;
            }, 500);
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        span.id = `todo-text-${index}`;
        
        const actions = document.createElement('div');
        actions.className = 'todo-actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-btn delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(index));
        
        actions.appendChild(deleteBtn);
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);
        
        todoList.appendChild(li);
    });
}

// Add new todo with duplicate prevention
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Check for duplicates
    const isDuplicate = todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
    if (isDuplicate) {
        alert('This task already exists!');
        return;
    }
    
    todos.push({
        text: text,
        completed: false,
        createdAt: Date.now(),
        isNew: true  // Flag for animation
    });
    
    todoInput.value = '';
    saveTodos();
    renderTodos();
}

// Toggle todo completion
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Delete todo with animation
function deleteTodo(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        // Add removing animation
        const todoItem = todoList.children[index];
        todoItem.classList.add('removing');
        
        // Wait for animation to complete before removing
        setTimeout(() => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }, 400);
    }
}

// Sort change handler
sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderTodos();
});

// Event listeners
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// ========================================
// QUICK LINKS FUNCTIONALITY
// ========================================

const linkNameInput = document.getElementById('linkName');
const linkUrlInput = document.getElementById('linkUrl');
const addLinkBtn = document.getElementById('addLinkBtn');
const linksContainer = document.getElementById('linksList');

let links = [];

// Load links from localStorage
function loadLinks() {
    const savedLinks = localStorage.getItem('quickLinks');
    if (savedLinks) {
        links = JSON.parse(savedLinks);
    }
    renderLinks();
}

// Save links to localStorage
function saveLinks() {
    localStorage.setItem('quickLinks', JSON.stringify(links));
}

// Render links to the page
function renderLinks() {
    linksContainer.innerHTML = '';
    
    links.forEach((link, index) => {
        const linkItem = document.createElement('a');
        linkItem.className = 'link-item';
        linkItem.href = link.url;
        linkItem.target = '_blank';
        linkItem.rel = 'noopener noreferrer';
        
        // Add animation class for new links
        if (link.isNew) {
            linkItem.classList.add('new-link');
            // Remove the isNew flag after animation
            setTimeout(() => {
                delete link.isNew;
            }, 600);
        }
        
        const span = document.createElement('span');
        span.textContent = link.name;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-link-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            deleteLink(index);
        });
        
        linkItem.appendChild(deleteBtn);
        linkItem.appendChild(span);
        linksContainer.appendChild(linkItem);
    });
}

// Add new link
function addLink() {
    const name = linkNameInput.value.trim();
    const url = linkUrlInput.value.trim();
    
    if (name === '' || url === '') {
        alert('Please enter both name and URL!');
        return;
    }
    
    // Basic URL validation
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        validUrl = 'https://' + url;
    }
    
    links.push({
        name: name,
        url: validUrl,
        isNew: true  // Flag for animation
    });
    
    linkNameInput.value = '';
    linkUrlInput.value = '';
    saveLinks();
    renderLinks();
}

// Delete link with animation
function deleteLink(index) {
    if (confirm('Are you sure you want to delete this link?')) {
        // Add removing animation
        const linkItem = linksContainer.children[index];
        linkItem.classList.add('removing');
        
        // Wait for animation to complete before removing
        setTimeout(() => {
            links.splice(index, 1);
            saveLinks();
            renderLinks();
        }, 400);
    }
}

// Event listeners
addLinkBtn.addEventListener('click', addLink);
linkNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addLink();
    }
});
linkUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addLink();
    }
});

// ========================================
// INITIALIZE APP
// ========================================

// Load all data on page load
loadTodos();
loadLinks();
