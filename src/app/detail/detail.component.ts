import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TodoService } from '../shared/data-access/todo.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgClass, RouterLink],
  template: `
    <h2>Detail</h2>

    @if (todo(); as todo){
    <div class="header">
      <h2>{{ todo.title }}</h2>

      <div class="action-buttons">
        @if (todo.completed) {
        <button (click)="startTodo(todo.id)" style="background-color: blue;">
          start
        </button>
        } @else {
        <button
          (click)="completeTodo(todo.id)"
          style="background-color: greenyellow; color: black"
        >
          complete
        </button>
        }
        <button
          style="background-color: yellow; color: black"
          routerLink="../../edit/{{ todo.id }}"
        >
          edit
        </button>
        <button
          (click)="deleteTodo(todo.id)"
          style="background-color: red; color: black"
        >
          delete
        </button>
      </div>
    </div>

    <p [ngClass]="todo.completed ? 'completed' : ''">{{ todo.description }}</p>

    @if(todo.completed) {
    <span>Completed!</span>
    } } @else {
    <p>Could not find todo...</p>
    }
  `,
  styles: `
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
    }

    .completed {
      text-decoration: line-through;
    }
  `,
})
export default class DetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private todoService = inject(TodoService);

  private paramMap = toSignal(this.route.paramMap);

  todo = computed(() =>
    this.todoService
      .todos()
      .find((todo) => todo.id === this.paramMap()?.get('id'))
  );

  completeTodo = (id: string) => {
    this.todoService.completeTodo(id);
  };

  startTodo = (id: string) => {
    this.todoService.startTodo(id);
  };

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
    this.router.navigate(['/']);
  }
}
