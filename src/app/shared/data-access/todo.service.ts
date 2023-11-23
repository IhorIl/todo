import { Injectable, signal } from '@angular/core';
import { CreateTodo, Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // We only want this class to be able to
  // update the signal (# makes it private)
  #todos = signal<Todo[]>([
    {
      id: '1',
      title: 'First task',
      description: 'Add way to complete/delete todos',
      completed: false,
    },
    {
      id: '2',
      title: 'Second task',
      description: 'Add way to edit todos',
      completed: false,
    },
    {
      id: '3',
      title: 'Third task',
      description: 'Something that I do not know yet',
      completed: false,
    },
  ]);

  // This can be read publicly
  todos = this.#todos.asReadonly();

  addTodo(todo: CreateTodo) {
    this.#todos.update((todos) => [
      ...todos,
      { ...todo, id: Date.now().toString(), completed: false },
    ]);
  }

  deleteTodo(id: string) {
    this.#todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  completeTodo(id: string) {
    this.#todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  }

  startTodo(id: string) {
    this.#todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: false } : todo
      )
    );
  }

  editTodo(id: string, todo: Todo) {
    this.#todos.update((todos) =>
      todos.map((t) => (t.id === id ? { ...todo, id } : t))
    );
  }
}
