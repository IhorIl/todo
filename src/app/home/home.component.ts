import { Component, inject } from '@angular/core';

import { CreateTodo } from '../shared/interfaces/todo';
import { TodoService } from '../shared/data-access/todo.service';
import { TodoFormComponent } from './ui/todo-form/todo-form.component';
import { TodoListComponent } from './ui/todo-list/todo-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <h2>Todo</h2>
    <app-todo-form (todoSubmitted)="createTodo($event)" />
    <app-todo-list [todos]="todoService.todos()" />
  `,
  styles: `
    :host {
      font: 24px 'Georgia', Helvetica, Arial, sans-serif;
    }

    img {
      width: 100%;
      height: 100%;
    }`,
  imports: [TodoFormComponent, TodoListComponent],
})
export default class HomeComponent {
  todoService = inject(TodoService);

  createTodo(value: CreateTodo) {
    this.todoService.addTodo(value);
    console.log(value);
  }
}
