import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  async list(): Promise<Item[]> {
    const url = `${this.base}/items`;
    return firstValueFrom(this.http.get<Item[]>(url));
  }

  async get(id: number): Promise<Item> {
    const url = `${this.base}/items/${id}`;
    return firstValueFrom(this.http.get<Item>(url));
  }

  async create(item: Partial<Item>): Promise<Item> {
    const url = `${this.base}/items`;
    return firstValueFrom(this.http.post<Item>(url, item));
  }

  async update(id: number, item: Partial<Item>): Promise<Item> {
    const url = `${this.base}/items/${id}`;
    return firstValueFrom(this.http.patch<Item>(url, item));
  }

  async delete(id: number): Promise<Item> {
    const url = `${this.base}/items/${id}`;
    return firstValueFrom(this.http.delete<Item>(url));
  }
}
