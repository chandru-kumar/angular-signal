import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-only-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-only-signal.component.html',
  styleUrls: ['./read-only-signal.component.css'],
})
export class ReadOnlySignalComponent {
  private _count = signal(0);
  readonly count = this._count.asReadonly();

  increment() {
    this._count.update(c => c + 1);
  }

  reset() {
    this._count.set(0);
  }
}

