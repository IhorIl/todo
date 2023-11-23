import { Component } from '@angular/core';
import { TodoFormComponent } from './ui/todo-form/todo-form.component';
import { Todo } from '../shared/interfaces/todo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoFormComponent],
  template: `
    <h2>Todo</h2>
    <app-todo-form (todoSubmitted)="createTodo($event)" />
  `,
  styles: ``,
})
export default class HomeComponent {
  createTodo(value: Todo) {
    console.log(value);
  }
}
