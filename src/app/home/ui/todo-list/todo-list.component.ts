import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Todo } from '../../../shared/interfaces/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <ul>
      @for (todo of todos; track todo.id) {
      <a routerLink="/detail/{{ todo.id }}">{{ todo.title }} ></a>
      } @empty {
      <li style="list-style: none;">Nothing to do!</li>
      }
    </ul>
  `,
  styles: `      
    ul {
      margin: 0;
      padding: 1rem;
    }
    
    a {
      display: block;
      padding: 0.5rem 0;
      text-decoration: none;
      color: #333;  
    }

    a:hover {
      color: #000;
    }
    `,
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
}
