import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-object-array-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './object-array-signal.component.html',
  styleUrls: ['./object-array-signal.component.css'],
})
export class ObjectArraySignalComponent {
  private idSeq = 1;

  items = signal<Item[]>([
    { id: this.idSeq++, name: 'Apples', qty: 3 },
    { id: this.idSeq++, name: 'Bananas', qty: 5 }
  ]);

  addItem() {
    const newItem: Item = { id: this.idSeq++, name: `Item ${this.idSeq}`, qty: 1 };
    this.items.update(current => [...current, newItem]);
  }

  incrementQty(id: number) {
    this.items.update(current =>
      current.map(it => it.id === id ? { ...it, qty: it.qty + 1 } : it)
    );
  }

  appendStarToName(id: number) {
    this.items.update(current =>
      current.map(it => it.id === id ? { ...it, name: it.name + ' ✨' } : it)
    );
  }

  removeItem(id: number) {
    this.items.update(current => current.filter(it => it.id !== id));
  }

  replaceAll() {
    const replaced: Item[] = [{ id: this.idSeq++, name: 'Replaced', qty: 10 }];
    this.items.set(replaced);
  }

  clearAll() {
    this.items.set([]);
  }
}
