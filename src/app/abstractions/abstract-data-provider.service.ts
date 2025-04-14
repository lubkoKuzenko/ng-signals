import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IDataProviderService<T> {
  getEntries: () => Observable<T[]>;
  getEntryById: (id: string) => Observable<T>;
  createEntry: (entry: T) => Observable<void>;
  updateEntry: (id: string, entry: T) => Observable<void>;
  deleteEntry: (id: string) => Observable<void>;
}

interface IDataProviderServiceUrls {
  getEntries: () => string;
  getEntryById: (id: string) => string;
  createEntry: () => string;
  updateEntry: (id: string) => string;
  deleteEntry: (id: string) => string;
}

@Injectable()
export abstract class AbstractDataProviderService<T> implements IDataProviderService<T> {
  readonly #httpClient: HttpClient = inject(HttpClient);
  protected get httpClient(): HttpClient {
    return this.#httpClient;
  }

  protected abstract readonly urls: IDataProviderServiceUrls;

  protected readonly getUrls = (baseApiPath: string): IDataProviderServiceUrls => ({
    getEntries: (): string => baseApiPath,
    getEntryById: (id: string): string => `${baseApiPath}/${id.toString()}`,
    createEntry: (): string => baseApiPath,
    updateEntry: (id: string): string => `${baseApiPath}/${id.toString()}`,
    deleteEntry: (id: string): string => `${baseApiPath}/${id.toString()}`,
  });

  public readonly getEntries = (): Observable<T[]> => {
    const url = this.urls.getEntries();
    return this.#httpClient.get<T[]>(url);
  };

  public readonly getEntryById = (id: string): Observable<T> => {
    const url = this.urls.getEntryById(id);
    return this.#httpClient.get<T>(url);
  };

  public readonly createEntry = (entry: T): Observable<void> => {
    const url = this.urls.createEntry();
    return this.#httpClient.post<void>(url, entry);
  };

  public readonly updateEntry = (id: string, entry: T): Observable<void> => {
    const url = this.urls.updateEntry(id);
    return this.#httpClient.patch<void>(url, entry);
  };

  public readonly deleteEntry = (id: string): Observable<void> => {
    const url = this.urls.deleteEntry(id);
    return this.#httpClient.delete<void>(url);
  };
}
