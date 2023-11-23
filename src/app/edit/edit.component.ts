import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../shared/data-access/todo.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submitForm()">
      <label for="title">Title</label>
      <input id="title" type="text" formControlName="title" />

      <label for="description">Description</label>
      <textarea id="description" formControlName="description"></textarea>

      <button type="submit">Save</button>
      <button type="button">Cancel</button>
    </form>
  `,
  styles: ``,
})
export default class EditComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);

  private paramMap = toSignal(this.route.paramMap);

  todo = computed(() =>
    this.todoService
      .todos()
      .find((todo) => todo.id === this.paramMap()?.get('id'))
  );

  form = this.fb.nonNullable.group(this.todo()!);

  submitForm() {
    this.todoService.editTodo(this.todo()?.id!, this.form.getRawValue());
    this.router.navigate(['/']);
  }
}
