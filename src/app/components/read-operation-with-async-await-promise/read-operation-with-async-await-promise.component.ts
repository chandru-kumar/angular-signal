import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-read-operation-with-async-await-promise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-operation-with-async-await-promise.component.html',
  styleUrls: ['./read-operation-with-async-await-promise.component.css']
})
export class ReadOperationWithAsyncAwaitPromiseComponent {
  private itemsService = inject(ItemsService);

  items = signal<Item[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() { void this.load(); }

  async load() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.itemsService.list();
      this.items.set(data);
    } catch (err: unknown) {
      this.error.set((err as Error)?.message ?? String(err));
    } finally {
      this.loading.set(false);
    }
  }
}

