# My Task — Todo App (React + TypeScript + Vite)

## Overview

My Task is a responsive task management application built with React, TypeScript, and Vite. It provides a clean UI for creating, managing, filtering, and persisting tasks with full support for dark mode and local storage persistence.

The project is designed as a production-ready frontend example demonstrating component architecture, state management, performance optimizations, and UI/UX considerations.

---

## Features

- Create and delete tasks
- Mark tasks as completed / active
- Filter tasks by status:
  - All
  - Active
  - Completed
- Persistent storage via `localStorage`
- Dark / light theme toggle
- Real-time task counter (active tasks)
- Bulk action: clear completed tasks
- Keyboard support (Enter to add task)
- Responsive UI (mobile-first approach)
- Smooth UI transitions and hover states

---

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- Local Storage API

---

## Project Structure

```
src/
├── components/
│   └── ToggleTheme.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## Core Logic

### State Management

The application uses React hooks:

- `useState` — input, todos, and filters
- `useEffect` — syncing state with localStorage
- `useMemo` — optimized derived computations (filtered tasks, active count)

---

### Data Model

```ts
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
```

---

## Persistence

Tasks are automatically saved and restored from `localStorage`, ensuring data persists across page reloads and browser sessions.

```ts
const [todos, setTodos] = useState<Todo[]>(() => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

---

## Filtering Logic

```ts
const filteredTodos = useMemo(() => {
  return todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });
}, [todos, filter]);
```

---

## Performance Optimizations

- useMemo prevents unnecessary recalculations
- Functional state updates improve reliability
- Separation of derived and source state

---

## UI / UX

- Clean card-based layout
- Clear hover and active states
- Dark mode support
- Empty state handling
- Responsive design for mobile and desktop

---

## Keyboard Shortcuts

| Action   | Key   |
| -------- | ----- |
| Add task | Enter |

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## Future Improvements

- Drag & drop task sorting
- Edit existing tasks
- Categories and tags
- Backend integration (REST / Firebase)
- Authentication system
- Task analytics

---

## Author

Dmytro

Frontend Developer (React / TypeScript)

---

## Notes

This project focuses on frontend architecture, state management patterns, and building a clean and scalable UI using modern React practices.
