import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-first-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './first-signal.component.html',
  styleUrls: ['./first-signal.component.css']
})
export class FirstSignalComponent {
  readonly count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }

  updateIncrement() {
    this.count.update(count => count + 1);
  }
}

