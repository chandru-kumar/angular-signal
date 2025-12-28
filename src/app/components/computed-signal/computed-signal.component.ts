import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-computed-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './computed-signal.component.html',
  styleUrls: ['./computed-signal.component.css']
})
export class ComputedSignalComponent {
  count = signal(1);

  double = computed(() => this.count() * 2);
  triple = computed(() => this.count() * 3);
  isEven = computed(() => this.count() % 2 === 0);

  increment() { this.count.update(n => n + 1); }
  decrement() { this.count.update(n => n - 1); }
  reset() { this.count.set(1); }
}

