import { Component, input, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-input-signal-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-signal-child.component.html',
  styleUrls: ['./input-signal-child.component.css']
})
export class InputSignalChildComponent {
  // require a non-null signal instance (input.required) so the child always receives a WritableSignal<Employee>
  readonly employee = input.required<WritableSignal<Employee>>();

  // simple computed values that call the passed signal directly
  readonly fullName = computed(() => {
    const sig = this.employee(); // this returns the WritableSignal<Employee> passed by parent
    const e = sig(); // call the signal to get Employee
    return `${e.firstName} ${e.lastName}`;
  });

  readonly role = computed(() => {
    const sig = this.employee();
    return sig().role ?? '—';
  });
}
