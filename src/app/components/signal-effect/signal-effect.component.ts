import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signal-effect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal-effect.component.html',
  styleUrls: ['./signal-effect.component.css']
})
export class SignalEffectComponent {
  count = signal(0);
  lastMessage = signal<string | null>(null);
  effectRuns = signal(0);

  constructor() {
    effect(() => {
      const value = this.count();
      this.effectRuns.update(n => n + 1);
      this.lastMessage.set(`Effect observed count = ${value}`);
    });
  }

  increment() { this.count.update(n => n + 1); }
  decrement() { this.count.update(n => n - 1); }
  reset() { this.count.set(0); }
}

