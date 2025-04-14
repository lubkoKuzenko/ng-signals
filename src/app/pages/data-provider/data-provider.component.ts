import { Component, DestroyRef, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterModule } from '@angular/router';
import { TodosService } from './services/todos.service';
import { Todo } from './models/todo.model';
import { AbstractComponent } from '../../abstractions';
import { catchError, defer, EMPTY, first, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-data-provider',
  imports: [RouterLink],
  providers: [UsersService, TodosService],
  templateUrl: './data-provider.component.html',
  styleUrl: './data-provider.component.scss',
})
export class DataProviderComponent extends AbstractComponent implements OnInit, OnDestroy {
  #usersService = inject(UsersService);
  #todosService = inject(TodosService);
  #destroyRef = inject(DestroyRef);

  routeSub: Subscription | undefined;

  users = signal<User[]>([]);
  todos = signal<Todo[]>([]);

  public ngOnInit() {
    // GET all users
    this.#usersService
      .getEntries()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((users: User[]) => this.users.set(users));

    // GET single user
    this.#usersService
      .getEntryById('3')
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((user: User) => console.log(user));

    this.routeSub = this.activatedRoute.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      if (userIdParam) {
        const userId = parseInt(userIdParam, 10);
        this.loadTodos(userId);
      } else {
        this.todos.set([]);
        this.router.navigate(['/data-provider/1']);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  public isActive(id: number) {
    return this.activatedRoute.snapshot.paramMap.get('userId') === String(id);
  }

  public loadTodos(userId: number) {
    this.#todosService.setUserId(userId);
    this.#todosService.getEntries().subscribe(todos => {
      this.todos.set(todos);
    });
  }

  public deleteTodo(id: number) {
    this.#todosService.deleteEntry(id.toString()).subscribe({
      next: () => {
        const userId = this.activatedRoute.snapshot.paramMap.get('userId');
        if (userId !== null) {
          this.loadTodos(Number(userId));
        }
      },
      error: error => {
        console.error('Error deleting todo:', error);
      },
    });
  }
}
