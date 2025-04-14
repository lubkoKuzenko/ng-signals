import { Injectable, signal } from '@angular/core';
import { AbstractDataProviderService } from '../../../abstractions';
import { Todo } from '../models/todo.model';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

@Injectable()
export class TodosService extends AbstractDataProviderService<Todo> {
  private userId = signal<number | null>(null);

  setUserId(userId: number) {
    this.userId.set(userId);
  }

  protected get urls() {
    const userId = this.userId();
    const url = userId ? `${BASE_URL}/users/${userId}/todos` : `${BASE_URL}/todos`;
    return this.getUrls(url);
  }
}
