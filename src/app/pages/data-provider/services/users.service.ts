import { Injectable } from '@angular/core';
import { AbstractDataProviderService } from '../../../abstractions';
import { User } from '../models/user.model';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

@Injectable()
export class UsersService extends AbstractDataProviderService<User> {
  protected readonly urls = this.getUrls(`${BASE_URL}/users`);
}
